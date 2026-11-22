// Payple 결제 승인 서버 함수 (현재 테스트 결제 화면 전용 — 운영 주소에서는 화면이 열리지 않는다)
// 실결제 오픈(P2) 전 보강 사항: 서버 주문 저장 + 금액 대조, V2 고정 승인 주소, 결과 재조회·취소.

// 승인 요청을 보내도 되는 Payple 주소만 허용한다 (브라우저가 보낸 임의 주소로 요청하지 않게)
const ALLOWED_APPROVAL_HOSTS = new Set([
  'democpay.payple.kr',
  'cpay.payple.kr',
  'demo-api-v2.payple.kr',
  'api-v2.payple.kr',
]);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { PCD_CST_ID, PCD_CUST_KEY, PCD_AUTH_KEY, PCD_PAY_REQKEY, PCD_PAY_COFURL } = req.body ?? {};

  let approvalUrl: URL;
  try {
    approvalUrl = new URL(String(PCD_PAY_COFURL || ''));
  } catch {
    return res.status(400).json({ success: false, message: '승인 주소가 올바르지 않습니다.' });
  }
  if (approvalUrl.protocol !== 'https:' || !ALLOWED_APPROVAL_HOSTS.has(approvalUrl.hostname)) {
    return res.status(400).json({ success: false, message: '허용되지 않은 승인 주소입니다.' });
  }

  // 상점 키는 서버 환경변수를 우선한다. 운영(데모가 아닌) 주소는 환경변수가 없으면 거절한다.
  const isDemo = approvalUrl.hostname.startsWith('demo');
  const cstId = process.env.PAYPLE_CST_ID || (isDemo ? PCD_CST_ID : undefined);
  const custKey = process.env.PAYPLE_CUST_KEY || (isDemo ? PCD_CUST_KEY : undefined);
  if (!cstId || !custKey || !PCD_AUTH_KEY || !PCD_PAY_REQKEY) {
    return res.status(400).json({ success: false, message: '결제 승인 정보가 부족합니다.' });
  }

  try {
    const response = await fetch(approvalUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
      body: JSON.stringify({
        PCD_CST_ID: cstId,
        PCD_CUST_KEY: custKey,
        PCD_AUTH_KEY,
        PCD_PAY_REQKEY,
      }),
    });

    const result = await response.json();

    if (result.PCD_PAY_RST === 'success') {
      // 브라우저에는 꼭 필요한 값만 돌려준다
      return res.status(200).json({
        success: true,
        data: { oid: result.PCD_PAY_OID, total: result.PCD_PAY_TOTAL },
      });
    }
    return res.status(400).json({ success: false, message: result.PCD_PAY_MSG || '결제 승인 실패' });
  } catch (error) {
    console.error('Payple API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

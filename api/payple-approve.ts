export default async function handler(req: any, res: any) {
  // CORS 처리 (필요시)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const {
    PCD_CST_ID,
    PCD_CUST_KEY,
    PCD_AUTH_KEY,
    PCD_PAY_REQKEY,
    PCD_PAY_COFURL
  } = req.body;

  if (!PCD_PAY_COFURL) {
    return res.status(400).json({ success: false, message: 'PCD_PAY_COFURL is required' });
  }

  try {
    // 1. 요청 파라미터 구성
    // (테스트 시 클라이언트가 전달한 키를 그대로 사용. 실 운영 시엔 process.env.PAYPLE_CUST_KEY 등 서버 환경변수로 덮어쓰는 것이 안전합니다.)
    const approveData = {
      PCD_CST_ID: PCD_CST_ID,
      PCD_CUST_KEY: PCD_CUST_KEY, // 실 운영시: process.env.PAYPLE_CUST_KEY || PCD_CUST_KEY
      PCD_AUTH_KEY: PCD_AUTH_KEY,
      PCD_PAY_REQKEY: PCD_PAY_REQKEY
    };

    // 2. 페이플 승인 서버(PCD_PAY_COFURL)로 승인 요청 전송
    const response = await fetch(PCD_PAY_COFURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(approveData)
    });

    const result = await response.json();

    // 3. 결제 성공 여부 확인
    if (result.PCD_PAY_RST === 'success') {
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: result.PCD_PAY_MSG || '결제 승인 실패',
        data: result 
      });
    }

  } catch (error) {
    console.error('Payple API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

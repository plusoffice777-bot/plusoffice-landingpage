// 문의 접수 서버 함수 (Vercel Serverless Function)
// 에어테이블 토큰은 서버 환경변수(AIRTABLE_PAT)에만 두고, 브라우저에는 절대 내려보내지 않는다.

const ALLOWED_SOURCES: Record<string, string> = {
  homepage: '홈페이지',
  homepage_test_payment: '홈페이지(테스트결제)',
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, AIRTABLE_PAT } = process.env;
  if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME || !AIRTABLE_PAT) {
    console.error('submit-lead: Airtable env vars missing');
    return res.status(500).json({ success: false, message: '서버 설정 오류' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body ?? {};

  // 1) 입력 검증 (브라우저 검증과 같은 규칙 + 길이 제한)
  const name = str(body.name, 50);
  const contact = str(body.contact, 20);
  const cleanContact = contact.replace(/-/g, '');
  if (!name) return res.status(400).json({ success: false, message: '성함을 입력해 주세요.' });
  if (!/^010\d{8}$/.test(cleanContact)) {
    return res.status(400).json({ success: false, message: '정확한 연락처를 입력해 주세요.' });
  }
  if (body.agreement !== true) {
    return res.status(400).json({ success: false, message: '개인정보 수집 및 이용에 동의해 주세요.' });
  }

  const source = ALLOWED_SOURCES[str(body.source, 40)] ?? ALLOWED_SOURCES.homepage;

  const utm: Record<string, string> = {};
  const rawUtm = body.utm && typeof body.utm === 'object' ? body.utm : {};
  for (const key of UTM_KEYS) utm[key] = str(rawUtm[key], 200);

  // 2) 에어테이블에 쓸 칸은 서버가 정한다 (브라우저가 임의 칸을 못 넣게)
  const payload = {
    fields: {
      '⛔유입경로': source,
      '⛔성함': name,
      '⛔연락처': contact,
      '⛔지점': str(body.region, 50),
      '⛔계약기간': str(body.duration, 50),
      '⛔우편물개봉동의': str(body.mailConsent, 50),
      '⛔관심 베네핏': str(body.benefit, 100),
      '⛔문의내용(비고)': str(body.message, 2000),
      '⛔개인정보수집동의': '동의',
      '⛔마케팅수신동의': body.marketing === true ? '동의' : '미동의',
      ...utm,
      landing_url: str(body.landingUrl, 300),
    },
    typecast: true,
  };

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_PAT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const errorData = await response.json().catch(() => ({}));
    const errorMsg: string = errorData?.error?.message || 'Airtable Error';
    console.error('submit-lead: Airtable error', response.status, errorMsg);
    // 내부 오류 내용(베이스 ID 등)은 브라우저에 그대로 보내지 않는다
    const message = errorMsg.includes('select option')
      ? '항목 불일치: 에어테이블의 필드 설정을 확인해 주세요.'
      : '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    return res.status(502).json({ success: false, message });
  } catch (error) {
    console.error('submit-lead: network error', error);
    return res.status(500).json({ success: false, message: '신청 중 오류가 발생했습니다.' });
  }
}

function safeParse(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

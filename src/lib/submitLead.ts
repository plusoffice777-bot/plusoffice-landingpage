// 문의 폼 → 서버 함수(/api/submit-lead) 전송
// 에어테이블 토큰은 브라우저에 없다. 서버가 대신 기록한다.

export type LeadSource = 'homepage' | 'homepage_test_payment';

export interface LeadForm {
  name: string;
  contact: string;
  region: string;
  duration: string;
  benefit: string;
  mailConsent: string;
  message: string;
  agreement: boolean;
  marketing: boolean;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export async function submitLead(form: LeadForm, source: LeadSource): Promise<void> {
  const utm: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const val = sessionStorage.getItem(key);
    if (val) utm[key] = val;
  });

  const response = await fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...form,
      source,
      utm,
      landingUrl: window.location.href.split('?')[0],
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || '신청 중 오류가 발생했습니다.');
  }
}

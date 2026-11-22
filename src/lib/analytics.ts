// 방문 통계(GA4) 이벤트 전송.
// GA4 코드는 index.html에서 운영 주소(www.plusoffice.co.kr)일 때만 불러온다.
// 고객 이름·전화번호·문의 내용 같은 개인정보는 절대 보내지 않는다.

type EventParams = Record<string, string | number | undefined>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export const isProductionHost = (): boolean =>
    typeof window !== 'undefined' && window.location.hostname === 'www.plusoffice.co.kr';

export function track(event: string, params: EventParams = {}): void {
    try {
        window.gtag?.('event', event, params);
    } catch {
        // 측정 실패가 화면 동작을 막지 않게 한다
    }
}

// "12개월" → 12
export const toMonths = (label: string): number | undefined => {
    const n = parseInt(label, 10);
    return Number.isFinite(n) ? n : undefined;
};

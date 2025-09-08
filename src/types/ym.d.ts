export {};

declare global {
  interface Window {
    ym: (...args: any[]) => void;
    __formSubmitPushed?: boolean;
    dataLayer?: Record<string, any>[];
  }
}
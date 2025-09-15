/* eslint-disable @typescript-eslint/no-unused-vars */
export const TRUSTED_DOMAINS = [
  'spotify.com',
  'apple.com',
  'youtube.com',
  'deezer.com',
  'amazon.com',
];

export const SecurityUtils = {
  sanitizeUrl: (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const safeParams = [
        'si',
        'referral',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'tag',
      ];
      safeParams.forEach(param => parsedUrl.searchParams.delete(param));
      return parsedUrl.toString();
    } catch (error) {
      console.error('Invalid URL:', url);
      return '#';
    }
  },

  isTrustedDomain: (url: string, trustedDomains: string[]) => {
    try {
      const parsedUrl = new URL(url);
      return trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
    } catch (error) {
      return false;
    }
  },
};

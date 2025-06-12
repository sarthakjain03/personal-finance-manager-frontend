const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  login: {
    path: "/login",
    getHref: () => "/login",
  },
  dashboard: {
    path: "/dashboard",
    getHref: () => "/dashboard",
  },
  'terms-of-service': {
    path: '/terms-of-service',
    getHref: () => '/terms-of-service',
  },
  'privacy-policy': {
    path: '/privacy-policy',
    getHref: () => '/privacy-policy',
  }
} as const;

export default paths;

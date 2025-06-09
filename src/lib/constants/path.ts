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
} as const;

export default paths;

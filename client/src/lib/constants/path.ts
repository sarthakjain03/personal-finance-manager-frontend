const paths = {
  home: {
    path: "/",
    getHref: () => "/",
    dashboard: {
      path: "/dashboard",
      getHref: () => "/dashboard",
    },
  },
  login: {
    path: "/login",
    getHref: (redirectTo?: string) =>
      `/login${redirectTo ? `?redirectTo=${redirectTo}` : ""}`,
  },
} as const;

export default paths;

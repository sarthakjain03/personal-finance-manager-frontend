const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  login: {
    path: "/login",
    getHref: (redirectTo?: string) =>
      `/login${redirectTo ? `?redirectTo=${redirectTo}` : ""}`,
  },
} as const;

export default paths;

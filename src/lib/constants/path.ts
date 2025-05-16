const paths = {
  home: {
    path: "/",
    getHref: (redirectTo?: string) =>
      `${redirectTo ? `?redirectTo=${redirectTo}` : ""}`,
    dashboard: {
      path: "/dashboard",
      getHref: () => "/dashboard",
    },
  },
} as const;

export default paths;

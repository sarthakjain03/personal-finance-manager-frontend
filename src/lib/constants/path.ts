const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  dashboard: {
    path: "/dashboard",
    getHref: () => "/dashboard",
  },
} as const;

export default paths;

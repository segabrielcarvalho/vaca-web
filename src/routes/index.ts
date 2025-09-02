export type Params = Record<string | number, string | number>;

export function buildPath(base: string, params?: Params): string {
  if (!params) return base;
  const q = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  return `${base}?${q}`;
}

export const normalizePath = (p: string) =>
  p.split("?")[0].replace(/\/+$/, "") || "/";

export const isPathActive = (pathname: string, href: string) => {
  const a = normalizePath(pathname);
  const b = normalizePath(href);
  if (b === "/") return a === "/";
  return a === b || a.startsWith(`${b}/`);
};

export const pickActiveHref = (pathname: string, hrefs: string[]) => {
  const a = normalizePath(pathname);
  const list = hrefs.map(normalizePath).sort((x, y) => y.length - x.length);
  return list.find((b) => a === b || a.startsWith(`${b}/`)) || "";
};

const getRoutes = () => ({
  home: {
    name: "Home",
    path: (params?: Params) => buildPath("/home", params),
  },

  users: {
    name: "Usuários",
    path: (params?: Params) => buildPath("/users", params),
    show: {
      path: (id: string, params?: Params) => buildPath(`/users/${id}`, params),
      plans: {
        path: (id: string, params?: Params) =>
          buildPath(`/users/${id}/plans`, params),
      },
    },
  },

});

export default getRoutes;

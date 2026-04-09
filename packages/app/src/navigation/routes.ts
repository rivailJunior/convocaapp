export const ROUTES = {
  HOME: '/home',
  SETTINGS: '/settings',
  EVENT_CREATE_RECURRENT: '/event/create-recurrent-event',
  GROUP: '/group',
} as const;

export const createRoutes = {
  GROUPS_DETAIL: (id: string): `/groups/${string}` => `/groups/${id}`,
} as const;

export type RouteParams = {
  GROUPS_DETAIL: { id: string };
};

export type NavigationRoutes = keyof typeof ROUTES;

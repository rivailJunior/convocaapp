export const ROUTES = {
  HOME: '/home',
  SETTINGS: '/settings',
  EVENT_CREATE_RECURRENT: '/event/create-recurrent-event',
  GROUP: '/group',
} as const;

export const createRoutes = {
  GROUPS_DETAIL: (id: string): `/groups/${string}` => `/groups/${id}`,
  SHARE_TEAMS: (eventId: string): `/events/${string}/teams/share` =>
    `/events/${eventId}/teams/share`,
} as const;

export type RouteParams = {
  GROUPS_DETAIL: { id: string };
  SHARE_TEAMS: { eventId: string };
};

export type NavigationRoutes = keyof typeof ROUTES;

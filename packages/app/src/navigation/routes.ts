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
  GENERATE_TEAMS: (eventId: string): `/generate-teams/${string}` => `/generate-teams/${eventId}`,
  ATTENDANCE_LIST: (eventId: string): `/events/${string}/attendance` =>
    `/events/${eventId}/attendance`,
} as const;

export type RouteParams = {
  GROUPS_DETAIL: { id: string };
  SHARE_TEAMS: { eventId: string };
  GENERATE_TEAMS: { eventId: string };
  ATTENDANCE_LIST: { eventId: string };
};

export type NavigationRoutes = keyof typeof ROUTES;

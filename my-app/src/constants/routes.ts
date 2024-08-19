const routes = {
  HOME: '/',
  MOVIES: '/movie',
  MOVIE_DETAIL: '/movie/:id',
  TVS: '/tv',
  TV_DETAIL: '/tv/:id',
  SEARCH: '/search',
  COLLECTION: '/collection/:id',
  SEASONS: '/season/:id',
  ACTOR: '/actor/:id',
  SEASON: '/seasons/:id/:season',
} as const;

export default routes;

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'en-US',
  },
});

export const movieApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  topRated: () => api.get('movie/top_rated'),
  search: (term: string) =>
    api.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  getDetail: (id: number) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
  getCast: (id: string) => api.get(`/movie/${id}/credits`),
  getCollection: (id: number) => api.get(`/collection/${id}`),
};

export const tvApi = {
  airingToday: () => api.get('tv/airing_today'),
  popular: () => api.get('tv/popular'),
  topRated: () => api.get('tv/top_rated'),
  onTheAir: () => api.get('tv/on_the_air'),
  search: (term: string) =>
    api.get('search/tv', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  getDetail: (id: number) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
  getCast: (id: string) => api.get(`/tv/${id}/credits`),
  getExternalId: (id: number) => api.get(`/tv/${id}/external_ids`),
  getSeason: (id: number, seasonNumber: number) =>
    api.get(`/tv/${id}/season/${seasonNumber}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
};

export const commonApi = {
  getActor: (id: number) =>
    api.get(`/person/${id}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
};

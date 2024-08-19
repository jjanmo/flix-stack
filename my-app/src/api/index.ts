import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: 'en-US',
  },
});

export const movieApi = {
  nowPlaying: () => api.get('movie/now_playing'),
  upcoming: () => api.get('movie/upcoming'),
  popular: () => api.get('movie/popular'),
  topRated: () => api.get('movie/top_rated'),
  search: term =>
    api.get('search/movie', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  getDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
  getCast: id => api.get(`/movie/${id}/credits`),
  getCollection: id => api.get(`/collection/${id}`),
};

export const tvApi = {
  airingToday: () => api.get('tv/airing_today'),
  popular: () => api.get('tv/popular'),
  topRated: () => api.get('tv/top_rated'),
  onTheAir: () => api.get('tv/on_the_air'),
  search: term =>
    api.get('search/tv', {
      params: {
        query: encodeURIComponent(term),
      },
    }),
  getDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
  getCast: id => api.get(`/tv/${id}/credits`),
  getExternalId: id => api.get(`/tv/${id}/external_ids`),
  getSeason: (id, seasonNumber) =>
    api.get(`/tv/${id}/season/${seasonNumber}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
};

export const commonApi = {
  getActor: id =>
    api.get(`/person/${id}`, {
      params: {
        append_to_response: 'videos,images',
      },
    }),
};

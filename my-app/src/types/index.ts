export interface Actor {
  id: number;
  name: string;
  profile_path: string;
}
export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  air_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  still_path: string;
  season_number: number;
}
export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: string;
  title: string;
  original_title: string;
  belongs_to_collection: {
    id: number;
    name: string;
  };
  genres: Genre[];
  adult: boolean;
  runtime: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  imdb_id: string;
  overview: string;
  poster_path: string;
  videos: {
    results: Video[];
  };
}
export interface Video {
  id: string;
  key: string;
  name: string;
}
export interface TV {
  id: string;
  name: string;
  original_name: string;
  seasons: Season[];
  first_air_date: string;
  last_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  overview: string;
  videos: {
    results: Video[];
  };
  poster_path: string;
  genres: Genre[];
}
export interface Season {
  air_date: string;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

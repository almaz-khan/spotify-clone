export interface Playlist {
  collaborative: boolean;
  description: string;
  folowers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: TrackObject[];
}

export interface TrackObject {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    followers: {
      href: null;
      total: number;
    };
  };
  is_local: boolean;
  track: Track;
}

export interface TopItems {
  items: TopItem[];
  total: number;
  limit: number;
  offset: number;
  previous: string;
  href: string;
  next: string;
}

type TopItem = Track | Artist;

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  expicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  name: string;
  popularity: number;
  track_number: number;
  is_local: boolean;
  type: "track";
}

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  genres: string[];
}

interface Artist {
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
  genres: string[];
  images: SpotifyImage[];
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface Owner {
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

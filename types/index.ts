export type SafetyRating = 'safe' | 'caution' | 'risky';
export type ScriptStatus = 'verified' | 'updated' | 'beta' | 'deprecated';
export type KeyStatus = 'keyless' | 'verified';

export interface Game {
  id: string;
  name: string;
  slug: string;
  accent_color: string;
  created_at: string;
}

export interface Script {
  id: string;
  title: string;
  slug: string;
  game_id: string;
  author_name: string;
  summary: string;
  description: string | null;
  code: string;
  language: string;
  safety_rating: SafetyRating;
  status: ScriptStatus;
  game_version: string | null;
  requirements: string[] | null;
  copy_count: number;
  upvote_count: number;
  is_published: boolean;
  thumbnail_url: string | null;
  key_status: KeyStatus;
  last_tested_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScriptWithGame extends Script {
  game: Pick<Game, 'id' | 'name' | 'slug' | 'accent_color'> | null;
}

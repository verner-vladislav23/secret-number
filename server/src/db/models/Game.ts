

export interface Game {
  id: number;
  user_id: number;
  secret_number: string;
  level: number;
  finish_at: Date;
  created_at: Date;
  updated_at: Date;
}

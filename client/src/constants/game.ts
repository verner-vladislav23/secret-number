import { GameLevel } from '../types/Game';

export const GAME_LEVEL_LABELS: Record<number | string, string> = {
  [GameLevel.Easy]: `Легко`,
  [GameLevel.Normal]: 'Нормально',
  [GameLevel.Hard]: 'Сложно',
};

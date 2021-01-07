import HttpService from './HttpService';

class GameService extends HttpService {
  public static startGame () {
    return this.postAuth('/game/start');
  };

  public static move (gameId: number | null, payload: any) {
    return this.postAuth(`/game/${gameId}/move`, payload);
  };
}

export default GameService;

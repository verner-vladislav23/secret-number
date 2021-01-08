import HttpService from './HttpService';

class GameService extends HttpService {
  public static startGame (payload: any) {
    return this.postAuth('/game/start', payload);
  };

  public static move (gameId: number | null, payload: any) {
    return this.postAuth(`/game/${gameId}/move`, payload);
  };

  public static getList () {
    return this.get('/game/all')
  }
}

export default GameService;

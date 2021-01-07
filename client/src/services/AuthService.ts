import HttpService from './HttpService'

class AuthService extends HttpService {
  private static storageTokenKey:string = '@user_t';

  public static get token (): string | null {
    return localStorage.getItem(this.storageTokenKey);
  }

  public static setToken (token: string): void {
    localStorage.setItem(this.storageTokenKey, token);
  }

  static get isAuth (): boolean {
    return Boolean(localStorage.getItem(this.storageTokenKey))
  }

  public static async registration (payload: any) {
    return await this.post('/auth/registration', payload);
  }

  public static async login (payload: any) {
    return await this.post('/auth/login', payload);
  }
}

export default AuthService;

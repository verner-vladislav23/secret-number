
const URL: string = "http://localhost:3001/api/v1";

class AuthService {
  static async parseResponse (response: any): Promise<any> {
    return await response.json();
  }

  static async registration (payload: any) {
    const response = await fetch(`${URL}/auth/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "access-control-allow-origin" : "*",
      },
      body: JSON.stringify(payload)
    });

    return this.parseResponse(response);
  }

  static login () {

  }
}

export default AuthService;

import AuthService from './AuthService';

class ApiError extends Error {
  public status: number;
  public name: string;

  constructor(message: string, status?: number) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}


class HttpService {
  protected static URL: string | undefined = process.env.REACT_APP_API_URL;

  private static async parseResponse (response: any): Promise<any> {
    return await response.json();
  }

  public static async post (endPointUrl: string, payload?: any) {
    const response = await fetch(`${this.URL}${endPointUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const { status } = response;
      const { errorMessage } = await this.parseResponse(response);
      throw new ApiError(errorMessage, status);
    }

    return this.parseResponse(response);
  }

  // TODO: Передалть
  public static async postAuth (endPointUrl: string, payload?: any) {
    const response = await fetch(`${this.URL}${endPointUrl}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AuthService.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return this.parseResponse(response);
  }
}

export default HttpService;



class HttpService {
  protected static URL: string | undefined = process.env.REACT_APP_API_URL;

  private static async parseResponse (response: any): Promise<any> {
    return await response.json();
  }

  public static async post (endPointUrl: string, payload: any) {
    const response = await fetch(`${this.URL}${endPointUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return this.parseResponse(response);
  }
}

export default HttpService;

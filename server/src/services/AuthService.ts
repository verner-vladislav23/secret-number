import * as jwt from 'jsonwebtoken';

const SECRET: string = 'SECRET_NUMBER_APP';
class AuthService {
  public static generateAccessToken (user): string {
    const payload = {
      userId: user.id,
    };

    const options = {
      expiresIn: '180d',
    };

    const token = jwt.sign(payload, SECRET, options);

    return token;
  }
}

export default AuthService;

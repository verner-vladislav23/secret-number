// require('dotenv').config()
// const models = require('../../api/models')
// const JWT = require('jsonwebtoken')
// const _ = require('lodash')
//
// module.exports = async function authenticate (req, res, next) {
//   if (!req.cookies['session']) {
//     return res.redirect('/shoper/login')
//   }
//
//   JWT.verify(req.cookies['session'], process.env.JWT_SECRET, async (error, decode) => {
//     if (error) {
//       return res.redirect('/shoper/login')
//     }
//
//     const shoperId = decode.id
//     const shoperLogin = decode.login
//     const shoper = await models.UserShoper.findOne({ where: { id: shoperId }})
//
//     if (shoper !== null && shoper.login === shoperLogin && shoper.enabled) {
//       req.shoper = _.pick(shoper, ['id', 'role', 'name', 'login', 'roles'])
//       next()
//     } else {
//       req.shoper = { roles: 'blocked' }
//       return res.redirect('/shoper/login')
//     }
//   })
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE2MDk2OTQ3MjAsImV4cCI6MTYyNTI0NjcyMH0.E7fyx9nwSmoJAoNAGhpbrqDI887SyV3_Hbe4ZntE4oI
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import * as jwt from 'jsonwebtoken';
import { HttpStatus } from '../helpers/HttpStatus';

const parseBearerToken = (req: Request) => {
  const token = req.headers ? req.headers.authorization : undefined;
  if (!Boolean(token)) {
    return undefined;
  }

  return token
    .replace(/Bearer/g, '')
    .trim();
};

interface ModifiedRequest extends Request {
  user?: any;
}

const authenticate = async (req: ModifiedRequest, res: Response, next: NextFunction) => {

  try {
    const token = parseBearerToken(req);
    const decoded = jwt.verify(token, 'SECRET_NUMBER_APP');

    const user = UserService.getUserById(decoded.id);
    const isExistUser = Boolean(user);
    if (isExistUser) {
      req.user = user;
      return next();
    }

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: 'Not Authorized' });
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: 'Not Authorized' });
  }
};

export default authenticate;

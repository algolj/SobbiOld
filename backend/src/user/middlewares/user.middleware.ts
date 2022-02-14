import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

@Injectable()
export class getUserMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req, res, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      req.user = await verify(token, this.configService.get('JWT_SECRET'));
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}

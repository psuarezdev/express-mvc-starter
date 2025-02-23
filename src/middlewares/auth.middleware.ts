import { NextFunction, Request, Response } from 'express';

const excludedPaths = ['/login', '/register'];

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (excludedPaths.some(path => req.originalUrl.startsWith(path))) {
    return next();
  }

  return !req.session?.user ? res.redirect('/login') : next();
};

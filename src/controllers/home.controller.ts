import { GET, route } from 'awilix-express';
import type { Request, Response } from 'express';

export class HomeController {
  @route('/')
  @GET()
  home(req: Request, res: Response) {
    return res.render('index', { auth: req.session.user });
  }
}

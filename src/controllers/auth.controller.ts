import type { Request, Response } from 'express';
import { GET, POST, route } from 'awilix-express';
import { AuthService } from '@/services/auth.service';
import { UtilsService } from '@/services/utils.service';
import { LoginRequest } from '@/requests/auth/login.request';
import { RegisterRequest } from '@/requests/auth/register.request';

export class AuthController {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly authService: AuthService
  ) { }

  @route('/login')
  @GET()
  login(_: Request, res: Response) {
    return res.render('auth/login', {
      error: null,
      fieldErrors: null,
      oldData: null
    });
  }

  @route('/login')
  @POST()
  async loginForm(req: Request, res: Response) {
    const data = await this.utilsService.mapToDto(req.body, LoginRequest);

    if (Object.keys(data.errors).length > 0) {
      return res.render('auth/login', {
        error: null,
        fieldErrors: data.errors,
        oldData: req.body
      });
    }

    const user = await this.authService.login(data.dto);

    if(!user) {
      return res.render('auth/login', {
        error: 'Wrong credentials',
        fieldErrors: null,
        oldData: req.body
      });
    }

    req.session.user = user;
    req.session.save();
    return res.redirect('/');
  }

  @route('/register')
  @GET()
  register(_: Request, res: Response) {
    return res.render('auth/register', {
      error: null,
      fieldErrors: null,
      oldData: null
    });
  }

  @route('/register')
  @POST()
  async registerForm(req: Request, res: Response) {
    const data = await this.utilsService.mapToDto(req.body, RegisterRequest);

    if (Object.keys(data.errors).length > 0) {
      return res.render('auth/register', {
        error: null,
        fieldErrors: data.errors,
        oldData: req.body
      });
    }

    const user = await this.authService.register(data.dto);

    if(!user) {
      return res.render('auth/register', {
        error: 'Wrong credentials',
        fieldErrors: null,
        oldData: req.body
      });
    }

    req.session.user = user;
    req.session.save();
    return res.redirect('/');
  }

  @route('/logout')
  @GET()
  async logOut(req: Request, res: Response) {
    req.session.destroy((err) => {
      if(err) return;
      res.clearCookie('connect.sid');
    });

    res.redirect('/');
  }
}

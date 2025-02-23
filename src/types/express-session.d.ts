import 'express-session';
import { type UserDTO } from '@/models/dto/user.dto';

declare module 'express-session' {
  interface SessionData {
    user?: UserDTO;
  }
}

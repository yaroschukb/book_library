import { AuthGuard } from '@nestjs/passport';

export class RtGuard extends AuthGuard('rt-jwt') {
  constructor() {
    super();
  }
}

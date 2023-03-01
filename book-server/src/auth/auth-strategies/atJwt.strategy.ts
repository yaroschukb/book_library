import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class AtJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: Repository<Users>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.AT_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { sub, email } = payload;
    return { id: sub, email };
    // const user = await this.userRepository.findOneBy({ email });
  }
}

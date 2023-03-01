import { AtJwtStrategy } from './auth-strategies/atJwt.strategy';
import { RtJwtStrategy } from './auth-strategies/rtJwt.strategy';
import { UserModule } from './../user/user.module';
import { Users } from './../entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Users]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Repository, AtJwtStrategy, RtJwtStrategy],
  exports: [
    AuthService,
    AtJwtStrategy,
    RtJwtStrategy,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {}

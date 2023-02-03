import { UserModule } from './../user/user.module';
import { Users } from './../entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { RtGuard } from './../common/guards/rt.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credenrials.dto';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { Tokens } from 'src/common/types/tokens.type';
import { Public } from 'src/common/decorators';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  async singUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Tokens> {
    return await this.authService.signUp(authCredentialsDto);
    // if (user) {
    //   // delete user.password;
    //   // delete user.salt;
    //   return user;
    // }
  }
  @Public()
  @Post('/local/signin')
  async singIn(
    @Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto,
  ): Promise<Tokens> {
    return this.authService.signIn(signInCredentialsDto);
  }

  @Post('/logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['id']);
  }
  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  async refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(user['id'], user['refreshToken']);
  }
}
// delete password and salt!!!!

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credenrials.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Users } from 'src/entities/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async singUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Users> {
    const user = await this.authService.signUp(authCredentialsDto);
    if (user) {
      // delete user.password;
      // delete user.salt;
      return user;
    }
  }

  @Post('/signin')
  async singIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Users> {
    return this.authService.signIn(authCredentialsDto);
  }
}
// delete password and salt!!!!

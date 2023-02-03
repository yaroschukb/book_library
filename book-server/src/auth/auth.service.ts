import { AuthCredentialsDto } from './dto/auth-credenrials.dto';
import { Users } from './../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Users> {
    const salt = crypto.randomBytes(16);
    const hash = await this.hashingPassword(authCredentialsDto.password, salt);
    const user = this.userRepository.create({
      ...authCredentialsDto,
      password: hash,
      salt: salt.toString(),
    });
    return this.userRepository.save(user).catch((err) => {
      if (err.code === '23505')
        throw new ConflictException('Username already exist!');
      throw new InternalServerErrorException();
    });
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Users> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const saltToBuffer = Buffer.from(user.salt, 'utf-8');
      const isUserCredentials = await argon.verify(user.password, password, {
        salt: saltToBuffer,
      });

      if (isUserCredentials) {
        return user;
      }
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }

  async hashingPassword(password: string, salt: Buffer): Promise<string> {
    return argon.hash(password, { salt });
  }
}

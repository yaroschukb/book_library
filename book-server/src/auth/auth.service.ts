import { AuthCredentialsDto } from './dto/auth-credenrials.dto';
import { Users } from './../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import * as crypto from 'crypto';
import { Tokens } from 'src/common/types/tokens.type';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Tokens> {
    const salt = crypto.randomBytes(16);
    const hash = await this.hashingPassword(authCredentialsDto.password, salt);
    const user = this.userRepository.create({
      ...authCredentialsDto,
      password: hash,
      salt: salt.toString(),
    });
    await this.userRepository.save(user).catch((err) => {
      if (err.code === '23505')
        throw new ConflictException('Username already exist!');
      throw new InternalServerErrorException();
    });
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<Tokens> {
    const { email, password } = signInCredentialsDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const saltToBuffer = Buffer.from(user.salt, 'utf-8');
      const isUserCredentials = await argon.verify(user.password, password, {
        salt: saltToBuffer,
      });

      if (isUserCredentials) {
        const tokens = await this.getTokens(user);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
      }
      throw new ForbiddenException('Access Denied');
    }
    throw new UnauthorizedException();
  }

  async logout(id: number) {
    return this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set({ hashedRt: null })
      .where('hashedRt is NOT NULL')
      .andWhere({ id })
      .execute();
  }

  async refresh(id: number, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    const { hashedRt } = user;
    if (!user || !hashedRt) throw new ForbiddenException('Access Denied');
    const rtMatch = await argon.verify(hashedRt, refreshToken);
    if (!rtMatch) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async hashingPassword(password: string, salt: Buffer): Promise<string> {
    return argon.hash(password, { salt });
  }

  async hashToken(token: string): Promise<string> {
    return argon.hash(token);
  }

  async getTokens(payload: any): Promise<Tokens> {
    const { id, email } = payload;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email },
        { secret: process.env.AT_JWT_SECRET, expiresIn: 60 * 15 },
      ),
      this.jwtService.signAsync(
        { sub: id, email },
        { secret: process.env.RT_JWT_SECRET, expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = await this.hashToken(refreshToken);
    return this.userRepository
      .createQueryBuilder()
      .update(Users)
      .set({ hashedRt: hash })
      .where('id = :id', { id: userId })
      .execute();
  }
}

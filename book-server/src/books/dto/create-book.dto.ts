import { Genres } from './../../entities/genres.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateBooksDto {
  @IsString()
  readonly author: string;
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly rate: number;
  @IsString()
  readonly description: string;
  @IsString({ each: true })
  readonly genre: Genres[];
}

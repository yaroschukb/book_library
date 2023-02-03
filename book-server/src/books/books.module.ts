import { Genres } from './../entities/genres.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Module } from '@nestjs/common';
import { Books } from '../entities/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books, Genres])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}

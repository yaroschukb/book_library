import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Genres } from '.././entities/genres.entity';
import { Books } from '../entities/books.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBooksDto } from './dto/create-book.dto';
import { UpdateBooksDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly bookRepository: Repository<Books>,
    @InjectRepository(Genres)
    private readonly genresRepository: Repository<Genres>,
  ) {}
  async create(createBookDto: CreateBooksDto) {
    const genres = await Promise.all(
      createBookDto.genre.map((name) => this.preloadGenresByName(`${name}`)),
    );

    const book = this.bookRepository.create({
      ...createBookDto,
      genres,
    });
    return this.bookRepository.save(book);
  }

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    return this.bookRepository.find({
      relations: ['genres'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      relations: ['genres'],
      where: {
        id,
      },
    });
    if (!book) throw new NotFoundException(`Book with ${id} not found!`);
    return book;
  }

  async update(id: number, updateBooksDto: UpdateBooksDto) {
    const genres =
      updateBooksDto.genre &&
      (await Promise.all(
        updateBooksDto.genre.map((name) => this.preloadGenresByName(`${name}`)),
      ));
    const book = await this.bookRepository.preload({
      id,
      ...updateBooksDto,
      genres,
    });
    if (!book) throw new NotFoundException(`Book with ${id} not found!`);
    return book;
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException(`Book with ${id} not found!`);
    return this.bookRepository.remove(book);
  }

  private async preloadGenresByName(genre: string): Promise<Genres> {
    const existingGenre = await this.genresRepository.findOne({
      where: { genre },
    });
    if (existingGenre) {
      return existingGenre;
    }
    return this.genresRepository.create({
      genre,
    });
  }
}

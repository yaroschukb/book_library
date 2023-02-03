import { Books } from './books.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre: string;

  @ManyToMany(() => Books, (book) => book.author)
  author: Books[];
}

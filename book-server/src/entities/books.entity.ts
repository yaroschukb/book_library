import { Genres } from './genres.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column()
  title: string;
  @Column()
  rate: number;
  @Column()
  description: string;
  @JoinTable()
  @ManyToMany(() => Genres, (genres) => genres.genre, { cascade: true })
  genres: Genres[];
}

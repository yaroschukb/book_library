import { Books } from './books.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  hashedRt: string;

  @OneToMany(() => Books, (books) => books.id)
  books: Books[];

  // async validatePassword(password: string): Promise<boolean> {
  //   const hash = await bcrypt.hash(password, this.salt);
  //   return hash === this.password;
  // }
  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}

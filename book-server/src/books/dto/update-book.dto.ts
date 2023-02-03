import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksDto } from './create-book.dto';

export class UpdateBooksDto extends PartialType(CreateBooksDto) {}

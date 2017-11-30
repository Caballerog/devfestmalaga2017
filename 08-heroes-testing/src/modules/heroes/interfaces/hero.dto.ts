
import { IsString, MinLength, MaxLength } from 'class-validator';
export class HeroDto {
  @MinLength(2)
  @MaxLength(16)
  @IsString()
  readonly name: string;
}
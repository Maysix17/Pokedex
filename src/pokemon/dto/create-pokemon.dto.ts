

import { IsInt, IsPositive, Min, IsString, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString({ message: 'Debe ser un texto' })
  @MinLength(2)
  name: string;

  @IsString()
  height: string;

  @IsString()
  weight: string;

  @IsString()
  gender: string;

  @IsString()
  category: string;

  @IsString()
  ability: string;


  @IsString()
  image?: string;
}

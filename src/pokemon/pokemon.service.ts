import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
  const pokemon = new this.pokemonModel(createPokemonDto);
return pokemon.save();
}
/*
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `El Pokémon ya existe en la base de datos: ${JSON.stringify(error.keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(
        `No se pudo crear el Pokémon - ${error}`,
      );
    }
  }
*/
  findAll(paginationDto: PaginationDto) {
    const { limit = 650, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(id: string): Promise<Pokemon> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`ID inválido: ${id}`);
    }

    const pokemon = await this.pokemonModel.findById(id);
    if (!pokemon) {
      throw new NotFoundException(`No se encontró el Pokémon con ID: ${id}`);
    }

    return pokemon;
  }

  async findByName(name: string): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findOne({ name });
    if (!pokemon) {
      throw new NotFoundException(`No se encontró el Pokémon con nombre "${name}"`);
    }
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID inválido: ${id}`);
    }

    const pokemon = await this.pokemonModel.findByIdAndUpdate(
      id,
      updatePokemonDto,
      { new: true },
    );

    if (!pokemon) {
      throw new NotFoundException(`No se encontró el Pokémon con ID: ${id}`);
    }

    return pokemon;
  }

  async remove(id: string): Promise<Pokemon> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`ID inválido: ${id}`);
    }

    const pokemon = await this.pokemonModel.findByIdAndDelete(id);

    if (!pokemon) {
      throw new NotFoundException(`No se encontró el Pokémon con ID: ${id}`);
    }

    return pokemon;
  }
}

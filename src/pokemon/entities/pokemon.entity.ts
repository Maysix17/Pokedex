import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;

  @Prop()
  height: string; // Altura

  @Prop()
  weight: string; // Peso

  @Prop()
  gender: string; // Género (male/female/unknown según la pokéapi)

  @Prop()
  category: string; // Categoría (como "Seed Pokémon")

  @Prop()
  ability: string; // Habilidad principal

  @Prop()
image: string;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

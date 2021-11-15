import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Perfiles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Perfiles>) {
    super(data);
  }
}

export interface PerfilesRelations {
  // describe navigational properties here
}

export type PerfilesWithRelations = Perfiles & PerfilesRelations;

import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {UsuariosPorGrupo} from './usuarios-por-grupo.model';
import {Perfiles} from './perfiles.model';

@model()
export class Usuario extends Entity {
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
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElectronico: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  idPerfil: string;

  @property({
    type: 'string',
    required: true,
  })
  IdProgramaAcademico: string;

  @hasMany(() => Grupo, {through: {model: () => UsuariosPorGrupo}})
  grupos: Grupo[];

  @belongsTo(() => Perfiles)
  perfilesId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;

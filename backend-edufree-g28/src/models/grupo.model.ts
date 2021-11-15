import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {UsuariosPorGrupo} from './usuarios-por-grupo.model';
import {Asignatura} from './asignatura.model';

@model()
export class Grupo extends Entity {
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
  horario: string;

  @hasMany(() => Usuario, {through: {model: () => UsuariosPorGrupo}})
  usuarios: Usuario[];

  @belongsTo(() => Asignatura)
  asignaturaId: string;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;

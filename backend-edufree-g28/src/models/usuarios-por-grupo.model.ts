import {Entity, model, property} from '@loopback/repository';

@model()
export class UsuariosPorGrupo extends Entity {
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
  IdGrupo: string;

  @property({
    type: 'string',
    required: true,
  })
  IdUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  IdProgramaAcademico: string;

  @property({
    type: 'object',
    required: true,
  })
  calificacion: object;

  @property({
    type: 'string',
  })
  grupoId?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  constructor(data?: Partial<UsuariosPorGrupo>) {
    super(data);
  }
}

export interface UsuariosPorGrupoRelations {
  // describe navigational properties here
}

export type UsuariosPorGrupoWithRelations = UsuariosPorGrupo & UsuariosPorGrupoRelations;

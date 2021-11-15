import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Perfiles,
  Usuario,
} from '../models';
import {PerfilesRepository} from '../repositories';

export class PerfilesUsuarioController {
  constructor(
    @repository(PerfilesRepository) protected perfilesRepository: PerfilesRepository,
  ) { }

  @get('/perfiles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Perfiles has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.perfilesRepository.usuarios(id).find(filter);
  }

  @post('/perfiles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Perfiles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfiles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInPerfiles',
            exclude: ['id'],
            optional: ['perfilesId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.perfilesRepository.usuarios(id).create(usuario);
  }

  @patch('/perfiles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Perfiles.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.perfilesRepository.usuarios(id).patch(usuario, where);
  }

  @del('/perfiles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Perfiles.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.perfilesRepository.usuarios(id).delete(where);
  }
}

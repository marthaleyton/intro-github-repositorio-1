import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Perfiles,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPerfilesController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/perfiles', {
    responses: {
      '200': {
        description: 'Perfiles belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfiles)},
          },
        },
      },
    },
  })
  async getPerfiles(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Perfiles> {
    return this.usuarioRepository.perfiles(id);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Usuario, UsuariosPorGrupo, Asignatura} from '../models';
import {UsuariosPorGrupoRepository} from './usuarios-por-grupo.repository';
import {UsuarioRepository} from './usuario.repository';
import {AsignaturaRepository} from './asignatura.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuariosPorGrupo,
          typeof Grupo.prototype.id
        >;

  public readonly asignatura: BelongsToAccessor<Asignatura, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosPorGrupoRepository') protected usuariosPorGrupoRepositoryGetter: Getter<UsuariosPorGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>,
  ) {
    super(Grupo, dataSource);
    this.asignatura = this.createBelongsToAccessorFor('asignatura', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, usuariosPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}

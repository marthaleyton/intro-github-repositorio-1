import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Grupo, UsuariosPorGrupo, Perfiles} from '../models';
import {UsuariosPorGrupoRepository} from './usuarios-por-grupo.repository';
import {GrupoRepository} from './grupo.repository';
import {PerfilesRepository} from './perfiles.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          UsuariosPorGrupo,
          typeof Usuario.prototype.id
        >;

  public readonly perfiles: BelongsToAccessor<Perfiles, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosPorGrupoRepository') protected usuariosPorGrupoRepositoryGetter: Getter<UsuariosPorGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('PerfilesRepository') protected perfilesRepositoryGetter: Getter<PerfilesRepository>,
  ) {
    super(Usuario, dataSource);
    this.perfiles = this.createBelongsToAccessorFor('perfiles', perfilesRepositoryGetter,);
    this.registerInclusionResolver('perfiles', this.perfiles.inclusionResolver);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, usuariosPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}

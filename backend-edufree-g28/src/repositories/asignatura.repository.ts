import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asignatura, AsignaturaRelations, ProgramaAcademico} from '../models';
import {ProgramaAcademicoRepository} from './programa-academico.repository';

export class AsignaturaRepository extends DefaultCrudRepository<
  Asignatura,
  typeof Asignatura.prototype.id,
  AsignaturaRelations
> {

  public readonly programaAcademico: BelongsToAccessor<ProgramaAcademico, typeof Asignatura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProgramaAcademicoRepository') protected programaAcademicoRepositoryGetter: Getter<ProgramaAcademicoRepository>,
  ) {
    super(Asignatura, dataSource);
    this.programaAcademico = this.createBelongsToAccessorFor('programaAcademico', programaAcademicoRepositoryGetter,);
    this.registerInclusionResolver('programaAcademico', this.programaAcademico.inclusionResolver);
  }
}

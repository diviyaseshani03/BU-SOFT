import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Ds1DataSource} from '../datasources';
import {Address, AddressRelations, Student} from '../models';
import {StudentRepository} from './student.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.a_id,
  AddressRelations
> {

  public readonly student: HasOneRepositoryFactory<Student, typeof Address.prototype.a_id>;

  constructor(
    @inject('datasources.ds1') dataSource: Ds1DataSource, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>,
  ) {
    super(Address, dataSource);
    this.student = this.createHasOneRepositoryFactoryFor('student', studentRepositoryGetter);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
  }
}

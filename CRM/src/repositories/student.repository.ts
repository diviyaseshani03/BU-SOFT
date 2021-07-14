import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Ds1DataSource} from '../datasources';
import {Student, StudentRelations, Address} from '../models';
import {AddressRepository} from './address.repository';

export class StudentRepository extends DefaultCrudRepository<
  Student,
  typeof Student.prototype.s_id,
  StudentRelations
> {

  public readonly address: HasOneRepositoryFactory<Address, typeof Student.prototype.s_id>;

  constructor(
    @inject('datasources.ds1') dataSource: Ds1DataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Student, dataSource);
    this.address = this.createHasOneRepositoryFactoryFor('address', addressRepositoryGetter);
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ds1DataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userid,
  UserRelations
> {
  constructor(
    @inject('datasources.ds1') dataSource: Ds1DataSource,
  ) {
    super(User, dataSource);
  }
}

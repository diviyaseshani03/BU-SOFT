import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Ds1DataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export type Credentials = {
  email: string;
  password: string;
};
export type userprofile = {
  email: string;
  name: string;
};


export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  static create(userData: Users) {
    throw new Error('Method not implemented.');
  }


  constructor(
    @inject('datasources.ds1') dataSource: Ds1DataSource,


  ) {
    super(Users, dataSource);
  }

  //   async findCredentials(
  //     userId: typeof Users.prototype.id,
  //   ): Promise<UserCredentials | undefined> {
  //     try {
  //       return await this.userCredentials(userId).get();
  //     } catch (err) {
  //       if (err.code === 'ENTITY_NOT_FOUND') {
  //         return undefined;
  //       }
  //       throw err;
  //     }
  // }
}


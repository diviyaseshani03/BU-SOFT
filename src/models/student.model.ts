import {Entity, model, property, hasOne} from '@loopback/repository';
import {Address} from './address.model';

@model()
export class Student extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  s_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'number',
  })
  courseId?: number;

  @property({
    type: 'number',
  })
  addressId?: number;

  @hasOne(() => Address)
  address: Address;

  constructor(data?: Partial<Student>) {
    super(data);
  }
}

export interface StudentRelations {
  // describe navigational properties here
}

export type StudentWithRelations = Student & StudentRelations;

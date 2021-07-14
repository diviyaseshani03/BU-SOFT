import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'test', table: 'student'}}})
export class Student extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 's_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  sId: number;

  @property({
    type: 'string',
    required: true,
    length: 512,
    mysql: {columnName: 'firstName', dataType: 'varchar', dataLength: 512, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    length: 512,
    mysql: {columnName: 'lastName', dataType: 'varchar', dataLength: 512, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  lastName: string;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'courseId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  courseId?: number;

  @property({
    type: 'number',
    precision: 10,
    scale: 0,
    mysql: {columnName: 'addressId', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'Y'},
  })
  addressId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Student>) {
    super(data);
  }
}

export interface StudentRelations {
  // describe navigational properties here
}

export type StudentWithRelations = Student & StudentRelations;

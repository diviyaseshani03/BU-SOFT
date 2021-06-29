import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Ds1DataSource} from '../datasources';
import {Course, CourseRelations, Student} from '../models';
import {StudentRepository} from './student.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.c_id,
  CourseRelations
> {

  public readonly students: HasManyRepositoryFactory<Student, typeof Course.prototype.c_id>;

  constructor(
    @inject('datasources.ds1') dataSource: Ds1DataSource, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>,
  ) {
    super(Course, dataSource);
    this.students = this.createHasManyRepositoryFactoryFor('students', studentRepositoryGetter,);
    this.registerInclusionResolver('students', this.students.inclusionResolver);
  }
}

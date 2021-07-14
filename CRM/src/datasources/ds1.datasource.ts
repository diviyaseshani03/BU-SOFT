import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'ds1',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root@123',
  database: 'test'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Ds1DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'ds1';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.ds1', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

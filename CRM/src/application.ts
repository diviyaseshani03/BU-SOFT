import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {JWTAuthenticationComponent, JWTAuthenticationStrategy, UserServiceBindings} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {Ds1DataSource} from './datasources';
import {MySequence} from './sequence';
import {bcryptHasher} from './services/hash.password.bcrypt';
import {jwtservice} from './services/jwt-service';
// import {loginVerify} from './services/login-verification';
import {MyUserService} from './services/login-verification1';
export {ApplicationConfig};

export class FirstAppApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    //set up binding
    this.setupBinding();

    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    // this.bind(RestExplorerBindings.CONFIG).to({
    //   path: '/explorer',
    // });

    this.component(RestExplorerComponent);
    this.component(JWTAuthenticationComponent);
    this.dataSource(Ds1DataSource, UserServiceBindings.DATASOURCE_NAME)

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

  }

  setupBinding(): void {
    this.bind('service.hasher').toClass(bcryptHasher);
    // this.bind('round').to(10);
    // this.bind('loginVerify').toClass(loginVerify);
    this.bind('loginVerify1').toClass(MyUserService);
    this.bind('jwt-service').toClass(jwtservice);
    this.bind('jwt-secretKey').to('12345asdfg');
    this.bind('jwt-expiresIn').to('7hr');

  }
}
function UsersDatasource(UsersDatasource: any) {
  throw new Error('Function not implemented.');
}

function Ds1Datasource(Ds1Datasource: any, DATASOURCE_NAME: string) {
  throw new Error('Function not implemented.');
}


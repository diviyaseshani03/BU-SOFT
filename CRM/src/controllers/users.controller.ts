// Uncomment these imports to begin using these cool features!

import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, getJsonSchemaRef, post, requestBody} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {Users} from '../models';
// import {User} from '../models/users123.model';
import {Credentials, UsersRepository} from '../repositories';
import {bcryptHasher} from '../services/hash.password.bcrypt';
import {jwtservice} from '../services/jwt-service';
import {MyUserService} from '../services/login-verification1';
import {validateCredentials} from '../services/validator';
import {CredentialsRequestBody} from '../specs/user.contoller.spec';


export class UsersController {
  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository,

    @inject('service.hasher')
    public hasher: bcryptHasher,

    @inject('loginVerify1')
    public loginVerification: MyUserService,

    @inject('jwt-service')
    public jwtService: jwtservice,
  ) { }

  @post('/users/signup', {

    responses: {
      '200': {
        description: 'Users',
        content: {
          schema: getJsonSchemaRef(Users),
        },
      },

    },
  })

  async signup(@requestBody() userData: Users) {

    validateCredentials(_.pick(userData, ['email', 'password']));

    userData.password = await this.hasher.hashPassword(userData.password);

    const savedUser = await this.userRepository.create(userData);
    // delete savedUser.password;
    return savedUser;
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },

    },
  })

  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials): Promise<{token: string}> {
    //verify if the user is valid
    let user = await this.loginVerification.verifyCredentials(credentials);

    console.log(user);
    const userprofile = await this.loginVerification.convertToUserProfile(user);
    console.log(userprofile);
    const token = await this.jwtService.generateToken(userprofile);
    return Promise.resolve({token});
    // return Promise.resolve({token: "12558966321ggf"});

  }

  @get('/users/secured-area')
  @authenticate('jwt')
  async securedarea(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile
  ): Promise<UserProfile> {

    console.log(currentUser);

    return Promise.resolve({
      [securityId]: '1',
      name: 'Diviya',
      email: 'div@gamil.com',
      id: 1,
    });

  }

}

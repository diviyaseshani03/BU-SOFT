import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {jwtservice} from '../services/jwt-service';

export class JWTStratergy implements AuthenticationStrategy {
  constructor(
    @inject('jwt-service')
    public jwtService: jwtservice,
  ) { }

  name: string = 'jwt';
  // authenticate()
  async authenticate(request: Request): Promise<UserProfile | undefined> {

    const token: string = await this.extractCredentials(request);
    const userProfile: UserProfile = await this.jwtService.verifyToken(token);
    return userProfile;


  }

  async extractCredentials(request: Request): Promise<string> {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized('Authorisation header is missing');
    }
    const authHeaderValue = request.headers.authorization;

    // authorization : Bearer xxx..yyy..zzz // should start with Bearer in this case(condition)

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized('Authorization header is not of type of Bearer');
    }

    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2) {
      throw new HttpErrors.Unauthorized('Authrization header has too many parts , it must follow this pattern "Bearer xxx.yyy.zzz"');
    }

    const token: string = parts[1];
    console.log(token);
    return token;
  }
}

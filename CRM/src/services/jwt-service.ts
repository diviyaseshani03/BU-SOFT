import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
// import {} from 'jsonwebtoken';
import {promisify} from 'util';

const jwt = require('jsonwebtoken');
const AsyncSign = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);


export class jwtservice {
  @inject('jwt-secretKey')
  public readonly secretKey: string;

  @inject('jwt-expiresIn')
  public readonly expiresin: string;




  async generateToken(userProfile: UserProfile): Promise<string> {

    if (!userProfile) {
      throw new HttpErrors.Unauthorized('UserProfile Not found!!');
    }

    let token = '';
    try {

      token = await AsyncSign(userProfile, this.secretKey, {
        expiresIn: this.expiresin,
      })

    } catch {
      throw new HttpErrors.Unauthorized('Token not created for the userProfile. Authentication Failed!');
    }

    return token;

  }

  async verifyToken(token: string): Promise<UserProfile> {

    if (!token) {
      throw new HttpErrors.Unauthorized('Error verifying token, Token is null');
    }

    let userProfile: UserProfile;
    try {
      const decryptedToken = await verifyAsync(token, this.secretKey);
      if (!decryptedToken) {

        throw new HttpErrors.Unauthorized(
          `Error in decryption token: $({error.message}`);
          
      }
      console.log(decryptedToken.email);
      userProfile = Object.assign(
        {[securityId]: '', name: '', email: ''},
        {[securityId]: decryptedToken.id, name: decryptedToken.name, email: decryptedToken.email},
      );
    }
    catch (error) {

      throw new HttpErrors.Unauthorized(
        `Error verifying token: $({error.message}`,
      );
    }
    return userProfile;

    // return Promise.resolve({[securityId]: '1', name: 'diviya', email: 'ds/@gmail.com'});

  }
}

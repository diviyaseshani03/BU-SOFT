// // import {UserService,UserProfileFactory} from '@loopback/authentication';
// import {UserService} from '@loopback/authentication';
// import {inject} from '@loopback/core';
// import {repository} from '@loopback/repository';
// import {HttpErrors} from '@loopback/rest';
// import {SecurityBindings, UserProfile} from '@loopback/security';
// import {Users} from '../models/users.model';
// // import {Users} from '../models';
// // import {User} from '../models/users123.model';
// import {Credentials, UsersRepository} from '../repositories';
// import {bcryptHasher} from './hash.password.bcrypt';

// // export class MyUser implements UserProfile {

// //   id: number;
// //   username: string;
// //   firstName: string;
// //   lastName: string;
// //   mail: string;
// //   otherAwesomeProperty: AwesomeClass;

// //   [attribute: string]: any;
// //   email: User.email;
// //   name: ;
// //   [securityId]: ;
// // }

// // export const securityId = Symbol('securityId');

// export class loginVerify implements UserService<Users, Credentials>{
//   constructor(
//     @repository(UsersRepository)
//     public userRepository: UsersRepository,
//     @inject('service.hasher')
//     public hasher: bcryptHasher,
//     @inject(SecurityBindings.USER) public user: UserProfile
//   ) { }

//   // convertToUserProfile(user: Users): UserProfile {
//   //   throw new Error('Method not implemented.');
//   // }


//   async verifyCredentials(credentials: Credentials): Promise<Users> {
//     //
//     const foundUser = await this.userRepository.findOne({
//       where: {
//         email: credentials.email,
//       },
//     });

//     if (!foundUser) {
//       throw new HttpErrors.NotFound(`User with the email: ${credentials.email} is not found`);
//     }

//     const passCheck = await this.hasher.comparePassword(credentials.password, foundUser.password);
//     if (!passCheck) {
//       throw new HttpErrors.Unauthorized('Password not matching.');
//     }
//     console.log(foundUser);

//     return foundUser;
//   }

//   convertTouserProfile(user: Users): UserProfile {
//     let userName = '';
//     if (user.firstName) {
//       userName = user.firstName;
//     }
//     if (user.lastName) {
//       userName = user.firstName
//         ? `${user.firstName} ${user.lastName}`
//         : user.lastName;
//     }

//     // const user1: UserProfile = {[securityId]: 'user-001', type: 'Symbol'};
//     return {
//       [securityId]: user.id.toString(),
//       name: userName,
//       id: user.id,
//       email: user.email,
//       // email: user.email,
//       // name: userName,
//     }
//   }
// }



// // convertToUserProfile(user: Users): UserProfile {
// //   let userName = '';
// //   if (user.firstName) {
// //     userName = user.firstName;
// //   }
// //   if (user.lastName) {
// //     userName = user.firstName
// //       ? `${user.firstName} ${user.lastName}`
// //       : user.lastName;
// //   }

// //   // const user1: UserProfile = {[securityId]: 'user-001', type: 'Symbol'};
// //   return {
// //     [securityId]: '',
// //     id: `${user.id}`,
// //     name: userName,
// //   }
// // }


// // export interface UserProfileFactory<U> {
// //   (user: U): UserProfile;
// // }
//   // export class WhoAmIController {
//   //   constructor(@inject(SecurityBindings.USER) private user: UserProfile) {}

//   //   @authenticate('BasicStrategy', 'JWTStrategy')
//   //   @get('/whoami')
//   //   whoAmI(): string {
//   //     return this.user[securityId];
//   //   }

//   // convertToUserProfile(user: Users): UserProfile{
//   //   let userName = '';
//   //   if (user.firstname) {
//   //     userName = user.firstname;
//   //   }

//   //   if (user.lastname) {
//   //     userName = user.firstName ? `${user.firstname} ${user.lastName}` : user.lastname;
//   //   }
//   //   return {name= userName,email=user.email}
//   //     // throw new error
//   // }



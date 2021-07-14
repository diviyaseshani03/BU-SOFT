import {compare, genSalt, hash} from 'bcryptjs';

interface passswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(givenPass: T, storedPass: T): Promise<boolean>;
}

export class bcryptHasher implements passswordHasher<string>{

  // @inject('rounds')
  // public readonly rounds: number;
  rounds: number = 10;
  async hashPassword(password: string) {
    const salt = await genSalt(this.rounds);
    return await hash(password, salt);
  }

  async comparePassword(givenPass: string, storedPass: string): Promise<boolean> {
    const checkPass = await compare(givenPass, storedPass);
    return checkPass;
  }

}

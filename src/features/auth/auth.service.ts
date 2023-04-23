import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string) {
    console.log('validateUser', username, password);
    const user = await this.userService.getUser({ username });
    console.log('getUser', user);

    if (!user) return null;

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) return null;

    return user.toJSON();
  }

  public generateJwt(payload: Record<string, string>) {
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { PasswordService } from '../providers/password.service';
import { UserService } from '../providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userService.createUser(createUserDto);

    // 1) Return the user
    // 2) Return the user & token
    // 3) Return the token

    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    // 1) Theres no such user
    // 2) Password is invalid
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.passwordService.verify(password, user.password))) {
      throw new UnauthorizedException('Password is invalid');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id, name: user.name, roles: user.roles };
    return this.jwtService.sign(payload);
  }
}

// 1) User registration
//    - Make sure does not exist yet
//    - Store the user
//    - (optional) generate the token
// 2) Generating token

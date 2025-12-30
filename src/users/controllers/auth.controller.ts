import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Request,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../user.entity';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponse } from '../responses/login.response';
import { AuthRequest } from '../../types/auth.request';
import { Public } from '../decorators/public.decorator';
import { AdminResponse } from '../responses/admin.response';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../role.enum';
import { UserService } from '../providers/user.service';

@Controller('auth')
// Serialize the response from objects to JSON
@UseInterceptors(ClassSerializerInterceptor)
// Exclude(hide) all properties from the response but the ones
// we explicitly include in the class entity using @Expose() decorator
@SerializeOptions({ strategy: 'excludeAll' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.authService.register(createUserDto);
    return user;
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return new LoginResponse({ accessToken });
  }

  @Get('/profile')
  async profile(@Request() request: AuthRequest): Promise<User> {
    const user = await this.userService.findOne(request.user.sub);

    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  //last read
  @Get('admin')
  @Roles(Role.ADMIN)
  async adminOnly(): Promise<AdminResponse> {
    return new AdminResponse({ message: 'This is for admins only!' });
  }
}

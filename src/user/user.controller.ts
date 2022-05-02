import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Get('login/:email/:password')
  login(
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<string> {
    return this.userService.checkUser(email, password);
  }

  @Post('register')
  register(
    @Body() body: { email: string; password: string; username: string },
  ): any {
    const { username, email, password } = body;
    return this.userService.createUser({ username, email, password });
  }

  @Post('SendResetPasswordEmail')
  SendResetPasswordEmail(@Body() body: { email: string }): any {
    const { email } = body;
    return this.userService.SendResetPasswordEmail(email);
  }

  @Get('reset-password/:email/:password')
  resetPassword(
    @Param('email') email: string,
    @Param('password') password: string,
  ): any {
    return this.userService.resetPassword(email, password);
  }
}

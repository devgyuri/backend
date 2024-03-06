import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/auth/login')
  login() {
    return this.clientAuthService.send(
      { cmd: 'login' },
      { email: 'a@a.com', password: '1234' },
    );
  }

  @Get('/boards')
  fetchBoard() {
    return this.clientResourceService.send(
      { cmd: 'fetchBoard' }, //
      { boardId: '111' },
    );
  }
}

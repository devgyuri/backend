import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ cmd: 'fetchBoard' })
  fetchBoard() {
    // 데이터 조회
    return 'board data';
  }
}

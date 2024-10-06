import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseMessage } from './decorator/transfrom-response.decorate';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ResponseMessage("Home Page")
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

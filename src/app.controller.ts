import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  @Public()
  endpoint(): string {
    return 'true';
  }
}

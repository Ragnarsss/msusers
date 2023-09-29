import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { CustomersService } from '@services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from '@dtos/customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(+id);
  }

  @Get('userToken')
  @UseGuards(AuthGuard('jwt'))
  myToken() {
    return 'MyToken';
  }

  @Get('totalCustomers')
  @Public()
  totalCustomers() {
    return 'MyToken';
  }
}

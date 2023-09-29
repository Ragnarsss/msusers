import { CreateUserDto, UpdateUserDto } from '@dtos/user.dto';
import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@services/user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'List of users' })
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

// import { Controller } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { MessagePattern, Payload } from '@nestjs/microservices/decorators';

// import { CreateUserDto, UpdateUserDto } from '@dtos/user.dto';
// import { UserService } from '@services/user.service';
// import { UserMSG } from '@common/constants';

// @ApiTags('Users')
// @Controller('users')
// export class UserController {
//   constructor(private userService: UserService) {}

//   @MessagePattern(UserMSG.FIND_ALL)
//   async findAll() {
//     try {
//       const foundProducts = await this.userService.findAll();
//       return {
//         success: true,
//         message: 'Users found',
//         data: foundProducts,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: 'Failed to found products',
//         error: error.message,
//       };
//     }
//   }

//   @MessagePattern(UserMSG.FIND_ONE)
//   async findOne(@Payload() id: number) {
//     try {
//       const foundProduct = await this.userService.findOne(id);
//       return {
//         success: true,
//         message: 'Product found',
//         data: foundProduct,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: 'Product not found',
//         error: error.message,
//       };
//     }
//   }

//   @MessagePattern(UserMSG.CREATE)
//   async create(@Payload() payload: CreateUserDto) {
//     try {
//       const createdProduct = await this.userService.create(payload);
//       return {
//         success: true,
//         message: 'Product created succesfully',
//         data: createdProduct,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: 'Failed to create product',
//         error: error.message,
//       };
//     }
//   }

//   @MessagePattern(UserMSG.UPDATE)
//   async update(@Payload() message: { id: number; payload: UpdateUserDto }) {
//     try {
//       const updateProduct = await this.userService.update(
//         message.id,
//         message.payload,
//       );
//       return {
//         success: true,
//         message: 'Product updated succesfully',
//         data: updateProduct,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: 'Failed to update product',
//         error: error.message,
//       };
//     }
//   }

//   @MessagePattern(UserMSG.DELETE)
//   async delete(@Payload() id: number) {
//     try {
//       const deletedProduct = await this.userService.delete(id);
//       return {
//         success: true,
//         message: 'Product deleted succesfully',
//         data: deletedProduct,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: 'Failed to delete product',
//         error: error.message,
//       };
//     }
//   }
// }

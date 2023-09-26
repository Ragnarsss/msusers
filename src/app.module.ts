import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@controllers/user.controller';
import { UserService } from '@services/user.service';
import { User } from '@entities/user.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // //Terminar esta shit
    // TypeOrmModule.forRootAsync({
    //   inject: [],
    //   useFactory: '',
    // }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

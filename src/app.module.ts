import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { UserController } from '@controllers/user.controller';
import { UserService } from '@services/user.service';
import { User } from '@entities/user.entity';

import * as Joi from 'joi';
import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from '@controllers/customer.controller';
import { CustomersService } from '@services/customer.service';
import { Customer } from '@entities/customer.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Customer]),
    AuthModule,
  ],
  controllers: [AppController, UserController, CustomerController],
  providers: [AppService, UserService, CustomersService],
})
export class AppModule {}

import { ROLES } from '@common/constants';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Public name of the user' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'unique name of the user for identification' })
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'email of the user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password of the user' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'role of the user' })
  readonly role: ROLES;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

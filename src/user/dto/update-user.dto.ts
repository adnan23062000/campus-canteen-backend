import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    type: String,
  })
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @MaxLength(11, { message: "Please provide a valid phone number." })
  @MinLength(11, { message: "Please provide a valid phone number." })
  contactNo: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional() 
  @IsString()
  profilePic?: string; 
}

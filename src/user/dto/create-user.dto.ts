import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, IsInt, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
  
export class CreateUserDto {
  
    @ApiProperty({
      type: String,
      description: 'fullname is required',
    })
    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    @IsNotEmpty()
    readonly fullname: string;
  
    @ApiProperty({
      type: String,
      description: 'email is required',
    })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide a valid Email.' })
    readonly email: string;
  
    @ApiProperty({
      type: String,
      description: 'contactNo is required',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(11, { message: "Please provide a valid phone number." })
    @MinLength(11, { message: "Please provide a valid phone number." })
    readonly contactNo: string;
  
    @ApiProperty({
      type: String,
      description: 'password is required',
    })
    @IsNotEmpty()
    password: string;
  
    @ApiProperty({
      type: Number,
      description: 'registrationNumber is optional', 
    })
    @IsOptional() 
    @IsInt()
    registrationNumber?: number; 
  
    @ApiProperty({
      type: String,
      description: 'profilePic is optional', 
    })
    @IsOptional() 
    @IsString()
    profilePic?: string; 
  
    @ApiProperty({
      type: String,
      description: 'idCard is optional', 
    })
    @IsOptional() 
    @IsString()
    idCard?: string; 
  
    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole, { message: 'Invalid role value' })
    role: UserRole;
}
  
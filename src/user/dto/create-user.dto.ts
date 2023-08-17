
import {
    IsEmail,
    IsString,
    MinLength,
    MaxLength, IsNotEmpty, IsInt, IsEnum
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';
export class CreateUserDto {

    @ApiProperty({
        type: String,
        description: 'fullname is required',
    })
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    readonly fullname: string;

    @ApiProperty({
        type: String,
        description: 'email is required',
    })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
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
    // @Matches(passwordRegEx, {
    //     message: `Password must contain Minimum 8 and maximum 20 characters, 
    // at least one uppercase letter, 
    // one lowercase letter, 
    // one number and 
    // one special character`,
    // })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: Number,
        description: 'registrationNumber is required',
    })
    @IsInt()
    @IsNotEmpty()
    registrationNumber: number;

    @ApiProperty({
        type: String,
        description: 'profilePic is required',
    })
    @IsString()
    profilePic: string;

    @ApiProperty({
        type: String,
        description: 'idCard is required',
    })
    @IsString()
    idCard: string;

    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole, { message: 'Invalid role value' })
    role: UserRole;
}
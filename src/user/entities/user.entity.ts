import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Customer = 'customer',
  Vendor = 'vendor',
  Admin = 'admin',
  DeliveryPerson = 'delivery person',
}

@Entity('users')
export class User {

  @ApiProperty({
    type: String,
    description: 'id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'fullname is required',
  })
  @Column({ length: 50 })
  fullname: string;

  @ApiProperty({
    type: String,
    description: 'email is required',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    type: String,
    description: 'contactNo is required',
  })
  @Column({ length: 11, nullable: false })
  contactNo: string;

  @ApiProperty({
    type: String,
    description: 'password is required',
  })
  @Column()
  password: string;

  @ApiProperty({
    type: Number,
    description: 'registrationNumber is required',
  })
  @Column({ type: 'int', nullable: true })
  registrationNumber: number;

  @ApiProperty({
    type: String,
    description: 'profilePic is required',
  })
  @Column({ nullable: true })
  profilePic: string;

  @ApiProperty({
    type: String,
    description: 'idCard is required',
  })
  @Column({ nullable: true })
  idCard: string;

  @ApiProperty({
    type: String,
    description: 'role is required',
  })
  @Column({ type: 'enum', nullable: false, enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @ApiProperty({
    type: Boolean,
    description: 'isVerified is required',
  })
  @Column({ default: false })
  isVerified: boolean;
}
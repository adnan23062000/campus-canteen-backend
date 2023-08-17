import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  Customer = 'customer',
  Vendor = 'vendor',
  Admin = 'admin',
  DeliveryPerson = 'delivery person',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  fullname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ length: 11, nullable: false })
  contactNo: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'int', nullable: true })
  registrationNumber: number;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  idCard: string;

  @Column({ type: 'enum', nullable: false, enum: UserRole }) 
  role: UserRole;

  @Column({ default: false }) 
  verified: boolean;
}
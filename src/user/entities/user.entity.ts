import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable: false }) 
  role: string;

  @Column({ default: false }) 
  verified: boolean;
}
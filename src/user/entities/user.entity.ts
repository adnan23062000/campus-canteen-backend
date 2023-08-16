import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 11, nullable: false })
  contactNo: string;

  @Column()
  password: string;

  @Column({ type: 'int', nullable: true })
  registrationNumber: number;

  @Column({ nullable: true })
  profilePic: string;

  @Column({ nullable: true })
  idCard: string;
}
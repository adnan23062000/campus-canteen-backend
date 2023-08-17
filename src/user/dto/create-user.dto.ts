import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    fullname: string;
    email: string;
    contactNo: string;
    password: string;
    registrationNumber: number;
    profilePic: string;
    idCard: string;
    role: UserRole;
}
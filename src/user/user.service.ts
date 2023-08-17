import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/hashPassword.util';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // let user: User = new User();
    // user.fullname = createUserDto.fullname;
    // user.email = createUserDto.email;
    // user.contactNo = createUserDto.contactNo;
    // user.password = await hashPassword(createUserDto.password);
    // user.registrationNumber = createUserDto.registrationNumber;
    // user.profilePic = createUserDto.profilePic;
    // user.idCard = createUserDto.idCard;
    // user.role = createUserDto.role;
    // console.log(createUserDto);
    createUserDto.password = await hashPassword(createUserDto.password);
    return this.userRepository.save({ ...createUserDto });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    const options: FindOneOptions<User> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // let user: User = new User();
    // user.email = updateUserDto.email;
    // user.contactNo = updateUserDto.contactNo;
    // user.password = await hashPassword(updateUserDto.password);
    // user.profilePic = updateUserDto.profilePic;

    updateUserDto.password = await hashPassword(updateUserDto.password);
    return this.userRepository.update(id, { ...updateUserDto });
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}

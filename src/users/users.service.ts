import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User) {}

    public async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        return user;
    }

    public async getAllUser() {
        const users = await this.usersRepository.findAll();
        return users;
    }
}

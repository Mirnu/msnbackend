import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private rolesService: RolesService) {}

    public async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    public async getAllUser() {
        const users = await this.usersRepository.findAll({include: {all: true}});
        return users;
    }

    public async getUserByEmail(email: string) {
        const users = await this.usersRepository.findOne({where: {email}, include: {all: true}});
        return users;
    }
}

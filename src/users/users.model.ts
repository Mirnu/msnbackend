import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({
    tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    public id: number;

    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    public email: string;

    @ApiProperty({example: '12345678', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    public password: string;

    @ApiProperty({example: 'true', description: 'User banned'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    public banned: boolean;

    @ApiProperty({example: 'spam', description: 'User ban reason'})
    @Column({type: DataType.STRING, allowNull: true})
    public banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    public roles: Role[]
}
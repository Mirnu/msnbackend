import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@email.com', description: 'email'})
    public email: string;
    
    @ApiProperty({example: '12345678', description: 'password'})
    public password: string;
}
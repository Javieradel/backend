import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class LoginDTO {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    required: false,
    type: String,
    example: 'usuario@example.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    required: false,
    type: String,
    example: 'Usuario123',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    required: true,
    type: String,
    example: 'contraseña123',
  })
  @IsNotEmpty()
  password: string;
}
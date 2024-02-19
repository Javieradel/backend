import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    required: true,
    type: String,
    example: 'usuario@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    required: true,
    type: String,
    example: 'Usuario123',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Primer nombre del usuario',
    required: true,
    type: String,
    example: 'Juan',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    required: true,
    type: String,
    example: 'Pérez',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
    required: true,
    type: String,
    example: 'contraseña123',
  })
  @MinLength(8)
  password: string;
}
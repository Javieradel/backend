import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateDTO {
  @ApiProperty({
    description: 'Nuevo correo electrónico del usuario',
    required: false,
    type: String,
    example: 'nuevo_usuario@example.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Nuevo nombre del usuario',
    required: false,
    type: String,
    example: 'NuevoUsuario123',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Nuevo primer nombre del usuario',
    required: false,
    type: String,
    example: 'NuevoJuan',
  })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    description: 'Nuevo apellido del usuario',
    required: false,
    type: String,
    example: 'NuevoPérez',
  })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    description: 'Nueva contraseña del usuario (mínimo 8 caracteres)',
    required: false,
    type: String,
    example: 'nueva_contraseña123',
  })
  @MinLength(8)
  @IsOptional()
  password: string;
}
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDTO } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/guard/auth-jwt.guard';
import { UpdateDTO } from './dto/update.dto';
import { ApiResponse } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos' })
    @ApiResponse({ status: 409, description: 'El email ya está registrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    register(@Body() userDTO: RegisterDTO){
        return this.usersService.create(userDTO)
    }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'ok' })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    getAll(@Query() params){
        return this.usersService.findAll(params.page, params.count)
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'Usuario encontrado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos' })
    @ApiResponse({ status: 404, description: 'No encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    getById(@Param('id') id: number){
        return this.usersService.findOne(id)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'Usuario Actualizado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos' })
    @ApiResponse({ status: 404, description: 'No encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    update(@Param('id') id: number, @Body() payload: UpdateDTO){
        return this.usersService.update(id, payload)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({ status: 201, description: 'Usuario Actualizado con éxito' })
    @ApiResponse({ status: 400, description: 'Datos de entrada no válidos' })
    @ApiResponse({ status: 404, description: 'No encontrado' })
    @ApiResponse({ status: 403, description: 'No autorizado' })
    delete(@Param('id') id: number){
        return this.usersService.remove(id)
    }
}

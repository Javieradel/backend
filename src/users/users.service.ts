import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Users } from './users.entity';
import { hash }from 'bcrypt'
import { UpdateDTO } from './dto/update.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(id: number): Promise<Partial<Users>> {
    const fUser = await this.usersRepository.findOneBy({ id })
    if(!fUser) throw new HttpException('Not found', 404)
    const {password, ...user} =  fUser
    return user;
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Users[], total: number }> {
    const skip = (page - 1) * pageSize ? (page - 1) * pageSize: 0 ;
    console.log(skip, page, pageSize)
    const [data, total] = await this.usersRepository.findAndCount({
      select: ["id","name", "last_name", "first_name", "email", 'is_active'],
      skip,
      take: pageSize,
    });
    return { data, total };
  }

  async remove(id: number) {
    try {
      const { affected } = await this.usersRepository.delete(id);
      if(affected == 0){
        throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      return {
          "statusCode": 200,
      }
    } catch (error) {
        throw error;
      }
  }

  async search(params: any): Promise<Users> {
    return this.usersRepository.findOne({
      where: [...params]
    });
  }
  
  async update(id: number, userDTO: UpdateDTO){
    try{
      const user = await this.findOne(id)
      if (userDTO.name) user.name = userDTO.name;
      if (userDTO.last_name) user.last_name = userDTO.last_name;
      if (userDTO.first_name) user.first_name = userDTO.first_name;
      if (userDTO.email) user.email = userDTO.email;

      if (userDTO.password) {
        const hashedPassword = await hash(userDTO.password, 10);
        user.password = hashedPassword;
      }

      return this.usersRepository.save(user);
    }catch(error){
      throw error
    }

  }

  async create(newUser: Partial<Users>): Promise<Users> {
    const { password, ...userData } = newUser;
    const hashedPassword = await hash(password, 10);

    try {
      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });

      return {...await this.usersRepository.save(user), password: undefined};
    } catch (error) {
      
      if (error.code === '23505') { // Código específico de PostgreSQL para violación de restricción de unicidad
        throw new ConflictException('El email ya está registrado');
      }

      throw new BadRequestException('No se pudo crear el usuario: '+ error.message);
    }
  }
}
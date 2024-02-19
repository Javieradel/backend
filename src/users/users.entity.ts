import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export interface IUsers {
    id: Number,
    name: String,
    lastName: String,
    firstName: String,
    email: String,
    photo?: String,
    isActive: boolean,
}


@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  first_name: String;

  @Index({unique: true})
  @Column()
  name: String;

  @Column()
  last_name: String;

  @Column({ default: true })
  is_active: boolean;

  @Index({unique: true})
  @Column()
  email: String;

  @Column()
  password: String;
}

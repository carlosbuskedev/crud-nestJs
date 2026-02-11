import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../models/entities/user.entity";
import { Repository } from "typeorm";

@Injectable() // parecido com o @service do spring
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

  async  createUser(email: string, senha:string): Promise<User>{
        const createUser = this.userRepository.create({email, senha})
        return await this.userRepository.save(createUser)
    }

  async findAllUsers():Promise<User[]>{
    return await this.userRepository.find()
  }

  async FindById(id:number):Promise<User | null>{
    return await this.userRepository.findOne({where:{id}})
  }

  async deleteUser(id:number):Promise<User>{
    const findTodelete = await this.userRepository.findOne({where:{id}})

    if(!findTodelete){
        throw new NotFoundException('usuário não encontrado')
    }
    await this.userRepository.remove(findTodelete)
    return findTodelete;
  }
  async putUser(id: number, email: string, senha:string):Promise<User>{
    const findUserToChange = await this.userRepository.findOne({where:{id}})
    if(!findUserToChange){
        throw new NotFoundException('usuário não encontrado')
    }

    findUserToChange.email = email
    findUserToChange.senha = senha

    return await this.userRepository.save(findUserToChange)
  }
}
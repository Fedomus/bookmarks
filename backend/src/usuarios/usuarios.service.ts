import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) {}

    async findOne(email: string){
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
        return usuario
    }

    async create(dto: AuthDto) {

        let existeUsuario = await this.findOne(dto.email);

        if(existeUsuario) return false
        
        const hash = await argon.hash(dto.password)
        const user = await this.prisma.usuario.create({
            data: {
                email: dto.email,
                hash,
            }
        })
        return user
    }

    async editUser(
        userId: number,
        dto: EditUserDto 
    ) {
        const usuario = await this.prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        })

        delete usuario.hash

        return usuario
    }

    async deleteUser(
        userId: number
    ) {
        const deleteUser = await this.prisma.usuario.delete({
            where: {
                id: userId
            }
        })

        return deleteUser;

    }

}

import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { UsuariosService } from "../usuarios/usuarios.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService{

    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
      ) {}
    
      async signIn(dto: AuthDto) {
        const user = await this.usuariosService.findOne(dto.email);

        if(!user) throw new ForbiddenException('Usuario incorrecto');
        
        const pwMatches = await argon.verify(user.hash, dto.password)

        if(!pwMatches) throw new ForbiddenException('Contrasenia incorrecta')
  
        const payload = { email: user.email, sub: user.id };

        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(dto: AuthDto){

        try {
           
            const user = await this.usuariosService.create(dto);

            if(!user) throw new ForbiddenException('Ya existe ese usuario')
    
            delete user.hash
    
            return user
        }
        catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw err
        }
        
    }

}
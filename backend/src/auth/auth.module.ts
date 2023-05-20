import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsuariosService } from "../usuarios/usuarios.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { 
                expiresIn: '259200s' 
                // expiresIn: '60s'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsuariosService]
})
export class AuthModule {}
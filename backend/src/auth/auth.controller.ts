import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        return this.authService.signUp(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }

}
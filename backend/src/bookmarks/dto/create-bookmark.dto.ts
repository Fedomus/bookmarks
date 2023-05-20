import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookmarkDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsString()
    link: string
}
import { IsOptional, IsString } from "class-validator"

export class EditBookmarkDto {

    @IsString()
    @IsOptional()
    nombre?: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsString()
    @IsOptional()
    link?: string
}
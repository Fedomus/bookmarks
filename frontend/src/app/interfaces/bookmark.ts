export interface Bookmark {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    nombre: string;
    descripcion?: string;
    link: string;
    usuarioId: number;
}

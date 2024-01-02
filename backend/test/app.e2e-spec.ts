import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { describe } from 'node:test';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { EditUserDto } from 'src/usuarios/dto/edit-user.dto';
import { CreateBookmarkDto } from 'src/bookmarks/dto/create-bookmark.dto';
import { EditBookmarkDto } from 'src/bookmarks/dto/edit-bookmark.dto';

describe('App e2e', () => {

  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    
    await app.init();
    await app.listen(3333)

    prisma = app.get(PrismaService)

    await prisma.cleanDb()

    pactum.request.setBaseUrl('http://localhost:3333')
  });

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {

    const dto: AuthDto = {
      email: 'prueba@prueba.com',
      password: '1234'
    }

    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email
        })
        .expectStatus(400)
      })
      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .expectStatus(400)
      })
      it('hacer signup', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
      })
    })
    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email
        })
        .expectStatus(400)
      })
      it('should throw if no body provided', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400)
      })
      it('hacer signin', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt', 'access_token')
      })
    })
  })

  describe('bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('Should get bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .expectStatus(200)
        .expectBody([])
      })
    })
    describe('Create bookmark', () => {
      it('should create bookmark', () => {

        const dto: CreateBookmarkDto = {
          nombre : "repositorio del curso",
          link : "https://github.com/vladwulf/nestjs-api-tutorial"
        }

        return pactum
        .spec()
        .post('/bookmarks')
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .withBody(dto)
        .expectStatus(201)
      })
    })
    describe('Get bookmarks', () => {
      it('Should get bookmarks', () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .expectStatus(200)
        .expectJsonLength(1)
        .stores('bookmarkId', 'id')
      })
    })
    describe('Get bookmark by id', () => {
      it('Should get bookmark by id', () => {
        return pactum
        .spec()
        .get('/bookmarks/{id}')
        .withPathParams('id', "$S{bookmarkId}")
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .expectStatus(200)
      })
    })
    describe('Edit bookmark by id', () => {

      const dto: EditBookmarkDto = {
        nombre: "Título de prueba 1",
        descripcion: "Esta es una descripcion de prueba"
      }

      it('Should edit bookmark', () => {
        return pactum
        .spec()
        .patch('/bookmarks/{id}')
        .withPathParams('id', "$S{bookmarkId}")
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.nombre)
      })
    })
    describe('Delete bookmark by id', () => {
      it('Should delete bookmark', () => {
        return pactum
        .spec()
        .delete('/bookmarks/{id}')
        .withPathParams('id', "$S{bookmarkId}")
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .expectStatus(204)
      })

      it("should get empty bookmarks", () => {
        return pactum
        .spec()
        .get('/bookmarks')
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .expectStatus(200)
        .expectJsonLength(0)
        .stores('bookmarkId', 'id')
      })
    })
  })

  describe('Usuario', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
        .spec()
        .get('/usuarios/me')
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .expectStatus(200)
      })
    })
    describe('Edit user', () => {
      it('should edit user', () => {

        const dto: EditUserDto = {
          firstName: "Federico",
          email: "fede@fede.com"
        }

        return pactum
        .spec()
        .patch('/usuarios')
        .withHeaders({
          Authorization: "Bearer $S{userAt}"
        })
        .withBody(dto)
        .expectStatus(200)
      })
    })
  })
  describe('Delete user', () => {
    it('should delete user', () => {
      return pactum
      .spec()
      .delete('/usuarios')
      .withHeaders({
        Authorization: "Bearer $S{userAt}"
      })
      .expectStatus(200)
    })
  })

});
## Description

This is a [Nest](https://github.com/nestjs/nest) template with user collection and auth. The main goal of this template is to deliver a ready-to-use app.

## What's in this template

#### About routes :

Exposed routes are :

- /auth/login
- /auth/register

All routes are protected by JWT auth by default. If you want to exposed them pubicly use `@Public()` decoractor.

#### About Auth strategy

Auth works with JWT, the payload is :

```
{
    id: string, // uuid
    email: string,
    role: UserRole
}
```

JWT token expires in 1 day, it can be changed in `auth.module.ts`

### About roles

The default role is `USER` but you can add more roles in `user.entity.ts`.

## Env variables

Edit the `.env.exemple`

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## NestJS documentation

Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

## Stay in touch

- Author - [Nicolas Brouard](https://linkedin.com/in/brdnicolas)
- Website - [https://brdnicolas.com](https://brdnicolas.com)

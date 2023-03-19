# Prisma Docker Example

Test running ts-node app with prisma connected to mysql running in docker

### Todo

- [x] dockerize Node.js app with Prisma
- [x] make nodemon works inside docker container
- [ ] optimize docker image size

### Installation

- clone repository

```bash
git clone https://github.com/Qu1etboy/prisma-docker-example.git
cd prisma-docker-example
cp .env.example .env
```

Start everything with docker.

```bash
docker-compose up -d
```

Enter the shell of our container to setup prisma

```bash
docker-compose exec server /bin/sh
```

Initialize prisma schema and seed data.

```bash
npx prisma migrate dev --name init && npx prisma db seed --preview-feature
```

## Results

- https://localhost:4000/user to see all users
- https://localhost:4000/post to see all posts

## Reference

- [docker-prisma](https://gordonmes.dev/docker-prisma/)
- [Hot Reload Node-Typscript with Docker!](https://medium.com/@kartikio/setup-node-ts-local-development-environment-with-docker-and-hot-reloading-922db9016119)

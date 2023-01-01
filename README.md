# Prisma Docker Example

Test running ts-node app with prisma connected to mysql running in docker

### Todo

- [ ] dockerize Node.js app with Prisma

### Installation

- clone repository

```bash
git clone https://github.com/Qu1etboy/prisma-docker-example.git
cd prisma-docker-example
cp .env.example .env
```

- build mysql server inside docker container

```bash
docker-compose up -d
```

- setup database

```bash
npx prisma db push
```

- setup initial data

```bash
npx prisma db seed
```

- run web server locally

```bash
npm run dev
```

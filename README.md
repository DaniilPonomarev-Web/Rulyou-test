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

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:user
```

docker build -f Dockerfile.base -t crud-image:nx-base .
docker build -f Dockerfile.deps -t crud-image:deps .
docker compose -f docker-compose.qa.yml up --build -d

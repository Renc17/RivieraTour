<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

```bash
$ npm install
$ npx prisma db seed
```

## Build

```bash
  .env

  DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
  SECRET_TOKEN="<SOME_TOKEN>"
  ADMIN_PASSWORD="<SOME_PASSWORD>"

  # mail
  MAIL_HOST=smtp.gmail.com
  MAIL_USER=sarandariviera442@gmail.com
  MAIL_PASSWORD=makina123aA
  MAIL_FROM=noreply@gmail.com
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Calls

### Admin Login

```bash
  curl -X POST \
    'http://localhost:3000/admin/login' \
    --header 'Accept: */*' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "email": "info@toursarandariviera.com",
      "password": "123456"
  }'
```

### Admin Change Password

```bash
  curl -X PUT \
    'http://localhost:3000/admin/password' \
    --header 'Accept: */*' \
    --header 'Authorization: Bearer <AUTH_TOKEN>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "password": "..."
  }'
```

### User Login

```bash
  curl -X POST \
    'http://localhost:3000/account/login' \
    --header 'Accept: */*' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "email": "<USER_EMAIL>",
      "password": "<PASSWORD>"
  }'
```

### User Register

```bash
  curl -X POST \
    'http://localhost:3000/account/register' \
    --header 'Accept: */*' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "username": "...",
      "email": "...",
      "password": "..."
  }'
```

### Auth User Book Tour

```bash
  curl -X POST \
    'http://localhost:3000/book/tour' \
    --header 'Accept: */*' \
    --header 'Authorization: Bearer <AUTH_TOKEN>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "tourId": "<uuid_of_tour>",
      "email": "...@gmail.com",
      "date": {
          "day": "16",
          "month": "JUNE"
      },
      "name": "...",
      "adults": ...,
      "children": ...
  }'
```

### Auth User Get Bookings

```bash
  curl -X GET \
    'http://localhost:3000/book/myBookings' \
    --header 'Accept: */*' \
    --header 'Authorization: Bearer <AUTH_TOKEN>'
```

### Admin Get All Bookings

```bash
  curl -X GET \
    'http://localhost:3000/book' \
    --header 'Accept: */*' \
    --header 'Authorization: Bearer <AUTH_TOKEN>'
```

### Admin Get All Tours

```bash
  curl -X GET \
    'http://localhost:3000/tours' \
    --header 'Accept: */*' \
    --header 'Authorization: Bearer <AUTH_TOKEN>'
```

### Admin Get Tour By UUID

```bash
curl -X GET \
  'http://localhost:3000/tours/id' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'
```

### Admin Reset Seats Capacity

```bash
  curl -X PUT \
    'http://localhost:3000/tours/id' \
    --header 'Accept: */*' \
    --header 'Authorization: Bearer <AUTH_TOKEN>'
```


## License

Nest is [MIT licensed](LICENSE).

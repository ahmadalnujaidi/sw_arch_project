# Book Store API

A NestJS REST API for managing books with PostgreSQL database.

## Features

- CRUD operations for books
- PostgreSQL database integration with TypeORM
- Data validation using class-validator
- RESTful API endpoints

## Book Entity

Each book has the following properties:
- `id`: Unique identifier (auto-generated)
- `title`: Book title (required, max 255 characters)
- `desc`: Book description (optional, text)
- `author`: Book author (required, max 100 characters)
- `price`: Book price (required, decimal with 2 decimal places)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Get All Books
```
GET /books
```
Returns an array of all books.

### Get Book by ID
```
GET /books/:id
```
Returns a specific book by ID.

### Create New Book
```
POST /books
Content-Type: application/json

{
  "title": "Book Title",
  "desc": "Book description (optional)",
  "author": "Author Name",
  "price": 29.99
}
```

### Update Book
```
PUT /books/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "desc": "Updated description",
  "author": "Updated Author",
  "price": 34.99
}
```
All fields are optional in the update request.

### Delete Book
```
DELETE /books/:id
```
Deletes a book by ID.

## Database Setup

1. Install PostgreSQL
2. Create a database named `bookstore`
3. Update database credentials in `.env.example` and rename to `.env`

Example `.env` configuration:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=bookstore
NODE_ENV=development
```

## Project Setup

```bash
$ npm install
```

## Running the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The API will be available at `http://localhost:3000`

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client.

Example using curl:

```bash
# Create a new book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "desc": "A classic American novel",
    "author": "F. Scott Fitzgerald",
    "price": 15.99
  }'

# Get all books
curl http://localhost:3000/books

# Get book by ID
curl http://localhost:3000/books/1
```

## Dependencies

- **@nestjs/common** - Core NestJS framework
- **@nestjs/typeorm** - TypeORM integration for NestJS
- **typeorm** - Object-relational mapping
- **pg** - PostgreSQL client
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation

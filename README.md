Ahmad Alnujaidi - 202002510
Ahmad Saad - 202000673
Abdulmalik Al Shammari - 202200093


we used Node.JS and the framework for node, which is Nest.JS to develop this API backend. you can install node first then you must run "npm install" to install all dependencies.
after installing all dependencies make sure the database configuration is correct, then run "npm run start"

API Endpoints:

Books Management
- POST /books - Create a new book
- GET /books - Get all available books
- GET /books/:id - Get a specific book
- PUT /books/:id - Update book information
- DELETE /books/:id - Delete a book

Members Management
- POST /members - Register a new member
- GET /members - Get all members
- GET /members/:id - Get a specific member
- PUT /members/:id - Update member information
- DELETE /members/:id - Delete a member

Loans Management
- POST /loans - Borrow a book (requires bookId and memberId)
- GET /loans - View all loan history
- GET /loans/:id - View a specific loan

Returns Management
- POST /returns - Return a book (requires bookId and memberId)
- GET /returns - View all return history
- GET /returns/:id - View a specific return

System Flow
1. Borrowing: When a book is borrowed, it moves from the books table to the loans table
2. Returning: When a book is returned, it moves back to the books table and a record is created in the returns table
3. Tracking: Member borrow/return counts are automatically updated
4. History: Complete audit trail is maintained in loans and returns tables


System Architecture

High-Level Architecture
The system follows a layered architecture pattern with NestJS framework:
- Controller Layer: Handles HTTP requests and responses
- Service Layer: Contains business logic and orchestrates operations
- Repository Layer: Manages database operations through TypeORM
- Entity Layer: Defines data models and database schema
- Database Layer: PostgreSQL database with four main tables


Database Schema
- books: Currently available books
- members: Registered library members with activity counters
- loans: Historical record of all loans (both active and returned)
- returns: Historical record of all book returns



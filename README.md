# NoteKeeper API Project

A professional backend API for a note-taking application built with **Node.js**, **Express**, and **MongoDB**. This project includes user authentication, protected note CRUD operations, search, and pinning support.

## 🚀 Features

- User signup and login with **JWT authentication**
- Protected note routes for authenticated users only
- Create, read, update, and delete notes
- Search notes by title, content, or tags
- Pin and unpin notes
- MongoDB data models for users and notes
- Environment-based configuration with `.env`

## 📦 Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT for token-based authentication
- bcrypt for password hashing
- cors for cross-origin resource sharing
- dotenv for environment variables

## 📁 Project Structure

- `server.js` - Express app bootstrap and route registration
- `config/db.config.js` - MongoDB connection
- `routes/users.route.js` - Authentication routes
- `routes/notes.route.js` - Notes routes
- `controllers/user.controle.js` - Signup, login, current user logic
- `controllers/notes.controle.js` - Notes CRUD and search logic
- `middlewares/verifyUserToken.js` - JWT validation middleware
- `modules/user.model.js` - Mongoose user schema
- `modules/notes.model.js` - Mongoose notes schema
- `utils/check_moongose_id.js` - ObjectId validator helper

## ⚙️ Setup

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```env
MONG_URL=mongodb://localhost:27017/note_keeper
ACCESS_TOKEN=your_jwt_secret_key
PORT=7001
```

3. Start the app

```bash
npm run dev
```

4. The API will be available at:

```text
http://localhost:7001
```

## 🔐 Authentication Endpoints

### Signup

`POST /api/v1/auth/users/signup`

Request body:

```json
{
  "fullName": "Salim Ahmed",
  "email": "salim@example.com",
  "password": "StrongPassword123"
}
```

Success response:

```json
{
  "status": true,
  "message": "User Created successfully",
  "data": {
    "_id": "...",
    "fullName": "Salim Ahmed",
    "email": "salim@example.com",
    "password": "...",
    "createdDate": "..."
  }
}
```

### Login

`POST /api/v1/auth/users/login`

Request body:

```json
{
  "email": "salim@example.com",
  "password": "StrongPassword123"
}
```

Success response:

```json
{
  "status": true,
  "message": "User logged in successfully",
  "user": {
    "_id": "...",
    "fullName": "Salim Ahmed",
    "email": "salim@example.com"
  },
  "token": "<jwt_token>"
}
```

### Current User

`GET /api/v1/auth/users/me`

Required header:

```http
Authorization: Bearer <jwt_token>
```

Success response:

```json
{
  "status": true,
  "message": "Current user Information",
  "data": {
    "_id": "...",
    "fullName": "Salim Ahmed",
    "email": "salim@example.com"
  }
}
```

## 📝 Notes Endpoints

All notes routes require a valid JWT token.

Header:

```http
Authorization: Bearer <jwt_token>
```

### Get All Notes

`GET /api/v1/notes`

Success response:

```json
{
  "status": true,
  "message": "All notes are fetched",
  "notes": [ ... ]
}
```

### Get Single Note

`GET /api/v1/notes/:id`

Success response:

```json
{
  "status": true,
  "message": "Single note found in the database successfully",
  "note": { ... }
}
```

### Create a Note

`POST /api/v1/notes`

Request body:

```json
{
  "title": "Build bootcamp README",
  "content": "Write a professional README with examples.",
  "tags": ["documentation", "readme"]
}
```

Success response:

```json
{
  "status": true,
  "message": "Note Created Successfully",
  "note": { ... }
}
```

### Update a Note

`PUT /api/v1/notes/:id`

Request body can include any fields to update:

```json
{
  "title": "Updated title",
  "content": "Updated content."
}
```

Success response:

```json
{
  "status": true,
  "message": "Note updated successfully",
  "note": { ... }
}
```

### Delete a Note

`DELETE /api/v1/notes/:id`

Success response:

```json
{
  "status": true,
  "message": "Note Deleted successfully",
  "note": { ... }
}
```

### Search Notes

`GET /api/v1/notes/search?query=searchTerm`

Searches the authenticated users notes by `title`, `content`, or `tags`.

Success response:

```json
{
  "status": true,
  "message": "Note search found successfully",
  "note": [ ... ]
}
```

### Pin or Unpin a Note

`POST /api/v1/notes/ping/:id`

Request body:

```json
{
  "isPinned": true
}
```

Success response:

```json
{
  "status": true,
  "message": "Note Pinged successfully",
  "note": { ... }
}
```

## Data Models

### User Model

- `fullName` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- `createdDate` (Date)

### Note Model

- `userId` (ObjectId, required)
- `title` (String, required)
- `content` (String, required)
- `tags` (Array of strings)
- `isPinned` (Boolean)
- `createdOn` (Date)

## Example Workflow

1. Signup a new user.
2. Login to receive a JWT token.
3. Use the token to create notes.
4. Update, delete, search, or pin notes as needed.

## Useful Commands

```bash
npm install
npm run dev
npm start
```

## Notes

- Every note route is protected by `validateToken` middleware.
- Make sure `ACCESS_TOKEN` is defined in `.env`.
- The server uses MongoDB connection string from `MONG_URL`.

---

## Author

Salim Abukar Ahmed

---

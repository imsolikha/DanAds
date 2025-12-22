# Notes REST API (Node.js + TypeScript)

This project is a simple REST API for managing notes, built with **Node.js**, **Express**, and **TypeScript**.  
It was created as a technical assignment and demonstrates core backend concepts such as CRUD operations, request validation, error handling, and API design.

---

## 🚀 Features

- Full CRUD operations for notes
  - Create a note
  - Read all notes or a single note
  - Update a note
  - Delete a note
- RESTful API design
- Request validation with proper HTTP status codes
- Centralized error-handling middleware
- Async-safe error handling
- Pagination using query parameters
- Keyword search (case-insensitive)
- In-memory data storage (no database required)

---

## 🧱 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **ts-node-dev** (for development)

---
## 📌 API Endpoints

### Health Check:

**GET /**

*Response:*

{
  "message": "API is running yeahh!"
}

Get All Notes (with pagination & search)

GET /notes


#### Query parameters:
page (number, optional)

limit (number, optional)

q (string, optional) — keyword search by title or content

*Example*:

/notes?page=1&limit=5&q=hello


Get Note by ID
GET /notes/:id

Create a Note
POST /notes


*Request body*:

{
  "title": "My note",
  "content": "Some text"
}

Update a Note
PUT /notes/:id

Delete a Note
DELETE /notes/:id

### ❌ Error Handling:


Uses a centralized error-handling middleware


Custom ApiError class for consistent error responses


Proper HTTP status codes (400, 404, 500)


Async error handler to safely catch errors in async routes


#### Example error response:

{
  "error": "Note not found"
}

## 🧠 Design Decisions:

Data is stored in memory to keep the project simple, as database persistence was not required.


The architecture is designed to be easily extendable.


The project follows REST principles similar to Django REST Framework, with clear separation of concerns.


## 🗄️ Future Improvements

If more time and mentorship were available, the following improvements could be added:


Database integration (e.g. PostgreSQL)


Authentication & authorization (e.g JWT)


Automated tests


More advanced validation using a validation library


Improved logging and monitoring

---

src/

├── index.ts # Main application entry point

├── errors.ts # Custom ApiError class

├── errorMiddleware.ts #Centralized error-handling middleware

└── asyncHandler.ts #Async error-handling wrapper


---


## 📂 Project Structure

## ⚙️ Installation & Setup

### 1. Clone the repository


```bash
git clone https://github.com/imsolikha/DanAds.git
cd tipa_jsrazrab


2. Install dependencies
npm install


3. Run the development server
npm run dev


The server will start at:
http://localhost:3000




Thank you for reviewing this project!

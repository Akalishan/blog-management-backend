# Blog Management Backend

Backend for a Blog Management Platform built with Node.js, Express and MySQL.

## Quick setup

1. Copy `.env.example` to `.env` and fill values (DB credentials, JWT secret).
2. Install dependencies:

```bash
npm install
```

3. Create the database and tables (option A: local MySQL):

```bash
# run in project root
mysql -u root -p < schema.sql
```

4. Start development server:

```bash
npm run dev
```

Server runs at `http://localhost:5000` by default.

## Docker

Start app + MySQL using Docker Compose:

```bash
cp .env.example .env   # edit values
docker compose up --build
```

The compose file configures a `db` service (MySQL) and an `app` service.

## API Endpoints

Authentication
- `POST /auth/register` — Register a new user
  - Body: `{ name, email, password }`
  - Returns: `{ message, token }`
- `POST /auth/login` — Login and receive JWT
  - Body: `{ email, password }`
  - Returns: `{ message, token }`

Users
- `GET /users` — Get all users (Admin only)
- `GET /users/:id` — Get user by ID (Owner or Admin)

Blogs
- `POST /blogs` — Create a new blog (Protected)
  - Body: `{ title, content }` — summary is generated automatically
- `GET /blogs` — Get all blogs (supports `?page=&limit=`)
- `GET /blogs/:id` — Get blog by ID
- `PUT /blogs/:id` — Update blog (Owner or Admin)
- `DELETE /blogs/:id` — Delete blog (Admin only)

All protected endpoints require header: `Authorization: Bearer <token>`

## Database schema

See `schema.sql` for the full schema. Main tables:
- `users` (id, name, email, password, role, created_at)
- `blogs` (id, title, content, summary, user_id, created_at, updated_at)

## Testing

Tests are provided under `test/` and use Node's built-in test runner + `supertest`.

- Run tests:

```bash
npm test
```

Note: tests run against the database configured in your `.env`. Use a separate test DB or drop/test data manually between runs.

## .env.example

An example environment file is included in `.env.example`. Do not commit real secrets.

## Next steps / Notes

- Add automated test DB setup and teardown (recommended) to avoid polluting development DB.
- Export a Postman collection for API testing and include it in the repo.
- Add CI workflow to run tests and lint on PRs.

---
Prepared for the assessment submission. If you want, I can now:
- Add test DB isolation (transactions or a dedicated test DB) and update tests to clean up automatically, or
- Export a Postman collection and include it in the repository.

## postman collection
https://web.postman.co/workspace/mern-crash-cource~f8068d8e-fa8f-424e-96f4-f5b3a738409a/collection/42228166-535ac04a-826f-4181-ba0b-27a7866412b3?action=share&source=copy-link&creator=42228166
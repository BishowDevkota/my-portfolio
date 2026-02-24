# Developer Portfolio (Next.js + MongoDB)

Full-stack developer portfolio built with Next.js App Router, TypeScript, MongoDB (Mongoose), Tailwind CSS, JWT auth, and local image storage in `/public`.

## Features

- Dark-first black/white minimal UI with light mode toggle
- Sticky navbar, smooth scrolling, responsive sections
- Public pages: Home, Projects, Blog listing, Blog details (`/blog/[slug]`)
- Admin auth with JWT in HTTP-only cookies
- Protected admin routes:
	- `/admin/login`
	- `/admin/dashboard`
	- `/admin/projects`
	- `/admin/blog`
- Full CRUD APIs for Projects and Blog
- Local image upload + cleanup (`/public/projects`, `/public/blog`)
- Image validation (type + max size)

## Environment Variables

Create `.env.local` (or copy from `.env.example`) with:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=portfolio
JWT_SECRET=replace-with-a-strong-secret

# First admin bootstrap credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin12345
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## API Endpoints

### Auth
- `POST /api/login`
- `POST /api/logout`

### Projects
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Blog
- `GET /api/blog`
- `POST /api/blog`
- `PUT /api/blog/:id`
- `DELETE /api/blog/:id`

## Notes

- Uploaded files are uniquely renamed with timestamp + original filename.
- On update/delete of Project or Blog, old images are removed from `/public`.
- Admin user auto-creates on first valid login if not found and env bootstrap credentials match.

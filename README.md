# SupportDesk — Support Ticket Management System

A production-style full-stack support ticket application built for the 2-Day Full-Stack Development Intern technical assignment.

## Stack
- Frontend: Next.js 16.3.7, App Router, TypeScript, Tailwind CSS 4
- Backend: Node.js, Express.js 5, TypeScript
- Database: MySQL 8+
- API: REST + JSON

## Features implemented
- Dashboard with database-backed Total, Open, In Progress and Resolved counts
- Recently created tickets
- Create ticket with frontend and backend validation
- Ticket list with search, status/priority/category/agent filters
- Newest, oldest and priority sorting
- Server-side pagination
- Dedicated `/tickets/[id]` details route
- Status updates persisted in MySQL
- Agent assignment persisted in MySQL
- Agents section with 5 seeded agents
- Ticket deletion
- Parameterized MySQL queries
- Centralized Express error handling
- Responsive Tailwind UI for desktop/tablet/mobile
- Loading, error and empty states

## Project structure
```text
support-ticket-management/
├── frontend/
│   ├── app/
│   │   ├── agents/
│   │   ├── create/
│   │   ├── tickets/[id]/
│   │   └── tickets/
│   ├── components/
│   ├── lib/
│   └── types/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── repositories/
│       ├── routes/
│       ├── types/
│       └── utils/
└── database/database.sql
```

## Prerequisites
Install Node.js 20+ and MySQL 8+.

## 1. Database setup
1. Open MySQL Workbench or MySQL command line.
2. Run `database/database.sql`.
3. This creates the `support_desk` database, tables, indexes, foreign keys, 5 agents and sample tickets.

## 2. Backend setup
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` and set your MySQL credentials:
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=support_desk
```
Run:
```bash
npm run dev
```
API: http://localhost:4000/api
Health check: http://localhost:4000/api/health

## 3. Frontend setup
Open a second terminal:
```bash
cd frontend
npm install
```
Copy `.env.example` to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```
Run:
```bash
npm run dev
```
Open http://localhost:3000

## API documentation
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/tickets` | Create ticket |
| GET | `/api/tickets` | List/search/filter/paginate tickets |
| GET | `/api/tickets/:id` | Get ticket details |
| PUT | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |
| PATCH | `/api/tickets/:id/assign` | Assign agent |
| PATCH | `/api/tickets/:id/status` | Update status |
| GET | `/api/dashboard` | Dashboard statistics |
| GET | `/api/agents` | List agents |

### Ticket list example
`GET /api/tickets?page=1&limit=10&search=priya&status=OPEN&priority=HIGH&sort=newest`

Response shape:
```json
{
  "data": [],
  "page": 1,
  "limit": 10,
  "total": 0,
  "totalPages": 0
}
```

## Screenshots
After starting the application, capture screenshots of Dashboard, Tickets, Create Ticket, Ticket Details and Agents and add them here before GitHub submission.

## Known limitations
- Authentication/JWT, comments, history timeline and dark mode are not included because they are optional bonus features.
- The assignment's screenshot requirement is documented above; screenshots should be captured from the running application before submission.

## GitHub submission
Do not commit `.env` or database passwords. Commit source code, `database/database.sql`, `.env.example` files and this README.

# eDitari

A comprehensive school management system that enables administrators, teachers, and students to manage classes, schedules, grades, users, and notifications in one place.

## About

eDitari is a full-stack web application designed to streamline school operations. It provides role-based access control, allowing different user types (admin, teacher, student, parent) to interact with relevant school data including class management, student transcripts, schedules, materials distribution, and real-time notifications.

## Tech Stack

**Frontend:**
- React 18 with Vite
- Tailwind CSS & Ant Design (UI components)
- React Router v6 (routing)
- Axios (HTTP client)
- i18next (multi-language support)
- React Big Calendar (schedule visualization)

**Backend:**
- Node.js with Express.js
- PostgreSQL (database)
- JWT (authentication)
- bcrypt (password hashing)

**Database:**
- PostgreSQL with SQL stored procedures
- Custom scripts for database initialization

## Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)

### Installation

1. **Install dependencies across all packages:**
   ```bash
   npm run inst
   ```

2. **Set up environment variables:**
   - Create `.env` files in both `server/` and `database/` folders:
   
   **database/.env** and **server/.env:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=SchoolDB
   ```
   
   **server/.env** (add these secrets)
   ```env
   ACCESS_SECRET=TQagS8lreF2vbyqUvnJIqGqFgJs9e1XYiJvsS8mYrOKHF4IBDVoXEQRNb0uLuTLc5x5itjDW8qKaA0AsgKg
   REFRESH_SECRET=HBBPh8BluBvBaLQjxz1IsiQVCFEs0OHimKf9rhzrATm69sXVIqmKarlkfrCPZUmi4nmiCCQt41N1q03buSw
   ```

3. **Create and initialize database:**
   ```bash
   npm run database
   ```

4. **Start the application:**
   ```bash
   npm start
   ```
   - Server runs on `http://localhost:8000`
   - Client runs on `http://localhost:5173`


## Features

### User Management
- Create and manage users with role-based access (admin, teacher, student, parent)
- User profile management
- Role-based permission system

### Role-Based Dashboards
- **Admin Dashboard:** Overview of all statistics (students, teachers, classes), gender distribution charts, best/worst performing students, calendar view
- **Teacher Dashboard:** Student class management, attendance tracking, grade visualization, performance graphs, class schedule calendar
- **Student Dashboard:** Personal GPA, subject list, attendance statistics, grade overview, schedule calendar
- **Parent Dashboard:** Child performance monitoring, grade tracking, schedule visibility

### Academic Management
- **Class Management:** Create and organize classes with multiple subjects
- **Subject Management:** Manage subjects with assignments and course materials
- **Student Records:** Track grades, transcripts, and academic progress
- **Grading System:** Grade modal for entering and managing student grades

### Scheduling & Calendar
- View and manage class schedules with intuitive calendar visualization
- Teacher and student schedule management
- Schedule table view with conflict detection

### Notifications
- Real-time notification system for announcements
- Send notifications to specific users or groups
- Notification history and management

### Additional Features
- **Multi-language Support:** i18n integration (international interface)
- **Data Visualization:** Charts and graphs using Ant Design Plots
- **Responsive Design:** Works on desktop and tablet devices
- **Secure Authentication:** JWT-based authentication with refresh tokens

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start both server and client |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run database` | Initialize database with schema and data |
| `npm run create-db` | Create database structure |
| `npm run delete-db` | Delete database |
| `npm run generate-procedures` | Create SQL procedures |
| `npm run initial-data` | Load initial sample data |

# 🚀 CoTask - Collaborative Task Management App

## 📝 Project Description

**CoTask** is an intuitive and powerful collaborative task management application designed to help teams organize, track, and accomplish their goals efficiently. This web-based platform provides a centralized workspace for creating tasks, assigning them to team members, setting deadlines, and monitoring progress in real-time. Whether you're managing a small team project or coordinating large-scale workflows, CoTask streamlines communication and enhances productivity.

Built with a modern, serverless-first tech stack, CoTask ensures a responsive, secure, and seamless user experience across all devices.

## 🎯 Key Features

CoTask addresses the common challenges of team collaboration and project management by:

- **Centralizing Task Management**: Keep all your team's tasks in one organized place, accessible from anywhere.
- **Enhancing Collaboration**: Real-time updates and notifications ensure everyone is on the same page.
- **Improving Productivity**: A clean, intuitive interface reduces clutter and helps users focus on what's important.
- **Providing Clarity**: Visual progress trackers and clear ownership for each task eliminate confusion.

## 🛠️ Tools & Technologies Used

| Category          | Tool / Technology                               |
| ----------------- | ----------------------------------------------- |
| Frontend          | **JavaScript, TypeScript, React.js, Next.js** |
| Backend           | **Hono on Cloudflare Workers** |
| Database          | **Cloudflare D1 (using Drizzle ORM with PostgreSQL syntax)** |
| Authentication    | **NextAuth.js (Google Provider)** |
| Version Control   | **Git & GitHub** |
| Deployment        | **Cloudflare Pages & Workers, Vercel** |

## 🔧 Module Overview & Functions

### 📍 1. User Authentication & Profile Management

- Secure user registration and login via Google OAuth.
- Profile customization with avatars and personal information.

### 📍 2. Workspace & Project Management

- Create multiple workspaces for different teams or projects.
- Invite members to workspaces.
- Role-based access control (Admin, Member).

### 📍 3. Task Management

**Includes:**

- **Task Creation**: Add tasks with titles, descriptions, due dates, and priority levels.
- **Task Assignment**: Assign tasks to one or more team members.
- **Task Status**: Update task status (e.g., To-Do, In Progress, Done).
- **Sub-tasks**: Break down complex tasks into smaller, manageable sub-tasks.
- **Attachments**: Add files and links to tasks.

**Features:**

- Drag-and-drop Kanban board view.
- List view for a more traditional task overview.
- Real-time updates for task assignments and status changes.

### 📍 4. Collaboration

**Features:**

- **Comments**: Discuss tasks with team members in a dedicated comment thread.
- **Mentions**: Tag team members in comments to get their attention.
- **Activity Feed**: A real-time log of all activities within a project.

## ✅ Features Summary

- Real-time, collaborative task management.
- Intuitive and responsive user interface built with Next.js.
- Secure Google OAuth authentication via NextAuth.js.
- Serverless backend powered by Hono on Cloudflare Workers.
- Fast, reliable data persistence with Cloudflare D1 and Drizzle ORM.
- Workspace and project organization.
- Detailed task management with sub-tasks and attachments.

## 📁 Project Structure

```bash
CoTask_App/
├── app/                  # Next.js 13+ App Router
│   ├── (auth)/           # Authentication routes (login, etc.)
│   ├── (main)/           # Main application routes
│   └── api/              # Next.js API Routes (for NextAuth)
├── components/           # Shared React components
├── drizzle/              # Drizzle ORM configuration and schemas
├── lib/                  # Library functions (db connection, auth config)
├── public/               # Static assets
├── .env.example          # Example environment variables
├── drizzle.config.ts     # Drizzle Kit configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- Node.js & npm
- Git
- A Cloudflare account with D1 enabled

### Installation

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/Som-Prajapati/CoTask-Collaborative-task-management-app.git](https://github.com/Som-Prajapati/CoTask-Collaborative-task-management-app.git)
    ```

2.  **Navigate to the project directory**
    ```sh
    cd CoTask-Collaborative-task-management-app
    ```

3.  **Install dependencies**
    ```sh
    npm install
    ```

4.  **Set up your environment variables**
    -   Rename the `.env.example` file to `.env` in the root of your project.
    -   Fill in the required values.

    **.env.example**
    ```env
    # NextAuth.js & Google OAuth Credentials
    # Get these from the Google Cloud Console: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""

    # A secret key for NextAuth.js to sign tokens. Generate one here: [https://generate-secret.vercel.app/](https://generate-secret.vercel.app/)
    NEXTAUTH_SECRET=""
    NEXTAUTH_URL="http://localhost:3000" # Or your production URL

    # Cloudflare D1 Database Credentials
    # Get these from your Cloudflare Dashboard
    API_PREFIX_SECRET=""
    ```

5.  **Sync your database schema**
    -   Use Drizzle Kit to push your schema to Cloudflare D1.
    ```sh
    npx drizzle-kit push
    ```

### Running the Development Server

1.  **Start the Next.js app**
    ```sh
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## 📌 Conclusion

**CoTask** leverages a powerful, modern, and serverless tech stack to provide a seamless and efficient task management solution. By combining the strengths of Next.js, Cloudflare, and Drizzle, it offers a scalable and maintainable platform perfect for teams looking to enhance their productivity and collaboration.

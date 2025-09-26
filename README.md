<div align="center">
  <img src="public/logo.svg" alt="Cube Logo" width="120" height="120">
  <h1>Cube</h1>
  <p><strong>Create fully-functional web applications by chatting with an AI.</strong></p>
  <p>
    <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fr2adio%2Fcube">
      <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
    </a>
  </p>
</div>

**Cube** is a generative AI application that allows you to describe a web page or component in plain English and watch as it gets built and deployed in real-time. It leverages a sophisticated multi-agent system to interpret requests, write code, and run it in a secure cloud environment.

<!-- Optional: Add a screenshot or GIF of the application in action -->
<img src="link-to-your-screenshot.png" alt="Cube Application Demo">

## ✨ Key Features

- **From Idea to Live App, Instantly**: Describe the web application you want, and our AI will build and deploy it for you in real-time.
- **Live, Interactive Previews**: See your generated website come to life in a real-time preview and interact with it as you build.
- **Live & Secure Sandboxes (Powered by E2B)**: Each project is built in a dedicated cloud sandbox, providing a secure, instantly-deployed environment and a shareable live URL.
- **Full Code Access & Transparency**: Get complete access to the generated source code, with the ability to view and download it at any time.

## ⚙️ How It Works

Cube's magic lies in its robust, event-driven architecture that coordinates multiple services to turn a prompt into a running web application.

1.  **User Prompt**: The user submits a request through the Next.js web interface.
2.  **Orchestration Layer**: An **Inngest** function picks up the request and begins a durable, long-running workflow.
3.  **Secure Sandbox Creation**: Inngest spins up a secure, isolated **E2B** cloud sandbox for the AI to work in.
4.  **AI Code Generation**: A **Google Gemini**-powered AI agent is invoked inside the sandbox. It has access to a file system, a terminal, and other tools necessary to build a web application.
5.  **Real-Time Deployment**: As the agent works, it runs a development server inside the sandbox, which is exposed via a secure, public URL for the user to preview.
6.  **Saving the Result**: Once the build is complete, the final code is saved to the database via **Prisma**, and the user is presented with the final result.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Orchestration**: [Inngest](https://www.inngest.com/)
- **AI Sandboxing**: [E2B](https://www.e2b.dev/)
- **AI Model**: [Google Gemini](https://deepmind.google/technologies/gemini/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **UI**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20.x or later)
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cube.git
cd cube
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.example .env.local
```

Now, fill in the required values in `.env.local`:

```env
# Prisma
DATABASE_URL="postgresql://user:password@host:port/database"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# E2B
E2B_API_KEY=

# Google Gemini
GOOGLE_API_KEY=
```

### 4. Set Up the Database

Run the Prisma migrations to set up your database schema.

```bash
bunx prisma migrate dev
```

### 5. Run the Development Server

Now you can start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Pull requests are welcome! Feel free to fork this repo, open issues, and suggest enhancements.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Author

**Gaurav Vashisth** \
[Github](https://github.com/r2adio) | Email: gauravvashisth365@gmail.com

## 🫂 Contributors

[Aryan Shandilya](https://github.com/shandilyaaryan) \
[Deepansh Sharwan](https://github.com/deepanshusharwan)

<a href="https://github.com/r2adio/cube/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=r2adio/cube" />
</a>

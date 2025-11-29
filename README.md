# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1e9e30ed-32ba-4f65-9197-5453d2a6ab29

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1e9e30ed-32ba-4f65-9197-5453d2a6ab29) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**
# CareConnect - Emergency Aid Distribution Platform

## 🚀 Live Deployment

**Application Link:** https://help-bridge-20-lrzh2ly78-mohits-projects-dc27f4af.vercel.app

The application is deployed and **accessible to anyone without restrictions**.

## Project Overview

CareConnect is a multi-role emergency aid distribution platform connecting:
- **Donors** - List and donate items
- **Recipients** - Request needed items
- **Admins** - Approve/oversee operations
- **Logistics Coordinators** - Manage shipments and deliveries

## 📊 Features

✅ Multi-role authentication system  
✅ Role-based access control & protected routes  
✅ Complete CRUD operations for donations and requests  
✅ Real-time data persistence with localStorage  
✅ Responsive UI with professional design system  
✅ Admin dashboard with analytics  
✅ Shipment tracking and inventory management  
✅ Search and filtering capabilities  

## Demo Accounts (for testing)

```
Admin:      admin@aid.com / admin123
Donor:      donor@aid.com / donor123
Recipient:  recipient@aid.com / recipient123
Logistics:  logistics@aid.com / logistics123
```

## GitHub Repository

**Repo:** https://github.com/MohitMajhi7/hk-new-final

Branches:
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/improve-auth` - Sample feature branch

## Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **State:** Context API, Custom Hooks
- **Persistence:** localStorage
- **Deployment:** Vercel

## 🛠 Local Setup & Development

### Prerequisites
- Node.js 16+ and npm installed

### Installation

```sh
# Clone the repository
git clone https://github.com/MohitMajhi7/hk-new-final.git
cd hk-new-final

# Install dependencies
npm install
```

### Development Server

```sh
npm run dev
```

Visit `http://localhost:5173` and log in with demo credentials.

### Build for Production

```sh
npm run build
```

Output will be in `dist/` directory.

### Linting

```sh
npm run lint
```

## 📋 Project Structure

```
src/
├── pages/              # Page components (dashboards, auth)
├── context/            # Global state (Auth, Donations)
├── components/         # Reusable components & UI library
├── hooks/              # Custom React hooks
├── data/               # Seed data and constants
├── App.jsx             # Root component with routing
└── index.css           # Global styles
```

## 🚀 Deployment

Deployed on **Vercel** with automatic builds from GitHub.

### Redeploy Changes

```bash
# Push to main branch (auto-deploys)
git add .
git commit -m "feat: your feature description"
git push origin main
```

Changes merge to main will automatically trigger a Vercel deployment.

## 📝 Git Workflow

### Creating Features

```bash
# Create and push feature branch
git checkout -b feature/your-feature-name
git add .
git commit -m "feat(scope): short description"
git push -u origin feature/your-feature-name

# Create Pull Request on GitHub (develop → main workflow)
```

### Commit Message Convention

```
feat(scope): add new feature
fix(scope): fix a bug
docs: update documentation
chore: maintenance tasks
refactor: code improvements
```

## 🤝 Contributing

1. Fork or clone the repo
2. Create a feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m "feat: description"`
4. Push to branch: `git push origin feature/name`
5. Open a Pull Request
- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?


## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)


# Quest App Web

> **Quest App Web** is a React/Next.js–based frontend for creating and participating in quests, challenges, and tasks. Users can create quests, define tasks (including image-based, multiple choice, geolocation tasks), and track progress with a countdown timer.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Quest Creation**: Create quests with title, description, and time limits.
- **Task Types**:
  - **Single** (radio buttons)
  - **Multiple** (checkboxes)
  - **Open** (free text)
  - **Image** (select a point or bounding box on an image)
  - **Location**/Map-based tasks (pick a location on a map)
- **Points & Timer**: Assign points to tasks, track elapsed time, and auto-complete a quest after time runs out.
- **Progress Tracking**: See how many tasks are completed and overall progress as a percentage.
- **Correctness**: Check whether user answers match the correct data (text, chosen coordinates, bounding boxes, or location ranges).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React), Typescript
- **UI Components**: 
  - [Tailwind CSS](https://tailwindcss.com/), Shadcn, Lucide icons
  - Custom React components (Cards, Buttons, Progress Bars, Modals, etc.)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand), Nuqs
- **API Communication**: RESTful calls to a Laravel or Node-based backend, TenStack(React query)
- **Formatting**: ESLint, Prettier
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod)

## Prerequisites

- **Node.js** >= v16
- **npm** or **yarn** (choose one and be consistent)

You also need a **running backend** (likely [this repo](https://github.com/INT20-laravel-devs/quest-app) or your own Laravel-based server) that exposes endpoints for user authentication, quest/task creation, and participation.

## Getting Started

### Installation

1. **Clone** this repository:
   ```bash
   git clone https://github.com/INT20-laravel-devs/quest-app-web.git
   cd quest-app-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Copy the example environment file and update it as needed:

```bash
cp .env.example .env
```

Inside `.env`, you’ll typically configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_MAPBOX_TOKEN=...
# etc.
```

- `NEXT_PUBLIC_API_URL`: URL pointing to your backend API.
- `NEXT_PUBLIC_MAPBOX_TOKEN`: (Optional) If you’re using Mapbox for location-based tasks.

### Running the App

**Development mode**:
```bash
npm run dev
# or
yarn dev
```
By default, this runs at [http://localhost:3000](http://localhost:3000).

**Production build**:
```bash
npm run build
npm run start
```
Then access the app at [http://localhost:3000](http://localhost:3000).

## Project Structure

A simplified look at the project layout:

```
├── public
│   ├── images // for bitmap images
│   └── icons // small images as usual that's the svgs
├── src
│   ├── app
│   │   ├── // other different pages
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── api
│   │   ├── actions // for server actions
│   │   ├── user-api.ts
│   │   └── // there will be files with fetch functions
│   ├── components
│   │   ├── ui // components from schadcn and ui-kit
│   │   ├── header.tsx
│   │   ├── providers.tsx
│   │   └── // other components
│   ├── constants
│   │   ├── metadata ?
│   │   │   └── home-metadata.ts
│   │   ├── index.ts
│   │   └── // can be different files related to entities
│   ├── providers
│   │   ├── auth-provider.tsx
│   │   ├── user-context.tsx
│   │   └── index.tsx // unite all the context and providers in this file
│   ├── hooks
│   │   └── use-user.ts
│   ├── lib
│   │   ├── db.ts
│   │   ├── api.ts
│   │   └── config.ts // for .env imports
│   ├── features
│   │   ├── // for each page we create module
│   │   └── home
│   │       ├── components
│   │       │   └── home-card.tsx
│   │       ├── constants ?
│   │       ├── types ?
│   │       ├── utils ?
│   │       └── home-page.tsx
│   ├── store
│   │   └── use-user-store.tsx
│   ├── theme
│   │   ├── // some styles utilities
│   │   └── global.css
│   ├── types
│   │   ├── validations
│   │   │   └── auth-schema.ts
│   │   ├── user.ts // types related to the user
│   │   └── index.ts // gloabal types
│   └── utils
│       └── user-utils.ts
```

## Architecture

The project follows the Feature-Sliced Design architecture, which organizes the codebase into distinct layers and slices:

- **Layers**:
    - **App**: Application-level configurations and providers.
    - **Api**: API services and configurations.
    - **Components**: Reusable UI components.
    - **Config**: Configuration files and constants.
    - **Constants**: Constants and enums.
    - **Features**: Reusable feature components and logic.
    - **Hooks**: Custom hooks.
    - **Lib**: Utility functions and classes.
    - **Providers**: Context providers.
    - **Store**: Zustand store configurations.
    - **Theme**: Theme configurations.
    - **Types**: Custom types and interfaces.
    - **Utils**: Utility functions.

- **Slices**:
    - Each slice represents a vertical feature or domain within the application, containing all related components, hooks, and logic.


## Usage

1. **Create an account** (if your backend supports user registration).
2. **Log in** to the quest app.
3. **Create a new quest**: Provide title, description, optional image, etc.
4. **Add tasks** to the quest: 
   - Single or multiple choice tasks with one or multiple correct answers.
   - Open text tasks.
   - Image tasks (crop or select a point).
   - Location tasks (pick a lat/lng or bounding box).
5. **Publish** the quest and share it with participants.
6. **Track** participants’ progress and time. Once they finish all tasks, their answers get evaluated.

## Contributing

Contributions are welcome! Please fork the repo and create a pull request with your changes. Common ways to contribute:

1. **Bug fixes** or **typo corrections**.
2. **New features** (e.g., advanced map features, user roles, etc.).
3. **Documentation** updates.
4. **UI/UX improvements** to the quest creation or tasks flow.

### Steps to Contribute

1. **Fork** this repository.
2. **Create** a new branch: `git checkout -b my-feature-branch`.
3. **Commit** your changes: `git commit -m 'Add some feature'`.
4. **Push** to the branch: `git push origin my-feature-branch`.
5. Open a **Pull Request** in this repo.

## License

[MIT License](LICENSE) © 2023 INT20-laravel-devs

---

Feel free to adjust as necessary to fit your specific environment, naming conventions, and usage instructions!

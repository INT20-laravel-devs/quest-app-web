# Quest App

Quest App is a web application built with React and TypeScript that allows users to participate in various quests. The application is designed using the Feature-Sliced Design architecture to ensure scalability and maintainability.


## Features

- User authentication
- Quest participation
- Task completion with various types (single choice, multiple choice, open-ended, image, map)
- Progress tracking
- Timer for quest duration
- Result evaluation and points calculation

## Tech stack

**Basic technologies:**

- React
- Typescript
- Next.js

**Styles:**

- Tailwind CSS
- Shadcn
- Lucide icons

**API requests:**

- Fetch API
- TenStack(React query)

**Formatting**

- ESLint
- Prettier

**State management:**

- Nuqs
- Zustand

**Forms**

- React Hook Form
- Zod(validation)

## Project Structure

```plaintext
.
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


## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/INT20-laravel-devs/quest-app-web.git
   cd quest-app
   ```
2. Install the dependencies:
   ```sh
    pnpm install
    ```
3. Run in development mode:
   ```sh
    pnpm dev
    ```
4. Also, you can run production build
    ```sh
    pnpm build
    pnpm start
    ```
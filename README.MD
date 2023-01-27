# TODO List project node

## Content

Project practice node G5

## Requirements

- node - version 16.5.x: [click here](https://nodejs.org/en/)\
- pnpm - version 7.x: [click here](https://pnpm.io/installation)\
- mongodb - [click here](https://www.mongodb.com/)
- dotenv -- variables de entorno
- npm i jsonwebtoken

## Run project

- Install all dependencies

```bash
pnpm install
```

- Crear archivo .env:

```bash
  todolist-project\
  ├── ...
  ├── .env # file
  ├── app.js
  └── ...
```

- Inside the .env file declarte this environment variables

```env
PORT = 8000
MONGO_URL = url mongodb atlas
```

- Now you can run this project, execute command:

```bash
pnpm run dev
```

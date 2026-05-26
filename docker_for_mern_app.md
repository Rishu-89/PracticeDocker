# Docker Notes

## React Frontend & Docker

- React app runs in browser.
- Browser cannot access Docker network directly.
- So frontend ports must be exposed.

Example:
```bash
docker run -p 3000:3000 react-app
```

Access:
```bash
http://localhost:3000
```

---

## Backend + MongoDB

- Backend and MongoDB containers can communicate using container/service name.

Example:
```bash
mongodb://mongodb:27017/course-goals
```

Here `mongodb` is container name.

---

# MongoDB Data Persistence

Without volume:
- Data is lost when container is removed.

Use volume:
```bash
docker run -v data:/data/db mongo
```

- `data` = named volume
- `/data/db` = MongoDB data folder

Data now survives container restart/removal.

---

# MongoDB Authentication

Run MongoDB with username/password:

```bash
docker run -v data:/data/db \
--name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=max \
-e MONGO_INITDB_ROOT_PASSWORD=secret \
mongo
```

Connection URL:
```bash
mongodb://max:secret@mongodb:27017/course-goals?authSource=admin
```

Format:
```bash
mongodb://USERNAME:PASSWORD@CONTAINER:PORT/DB_NAME?authSource=admin
```

---

# Bind Mounts + Nodemon

Bind mount syncs local code with container.

Example:
```bash
docker run -v $(pwd):/app node-app
```

Use Nodemon during development because container does not auto restart on file changes.

Install:
```bash
npm install nodemon --save-dev
```

Package.json:
```json
"scripts": {
  "start": "nodemon app.js"
}
```

---

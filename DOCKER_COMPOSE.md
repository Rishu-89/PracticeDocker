# Docker Compose Notes

Reference File:
:contentReference[oaicite:0]{index=0}

---

# What is Docker Compose?

- Docker Compose is used to run multiple containers together using one YAML file.
- Replacement for writing multiple `docker run` commands manually.

Docker Compose file:
```yaml
docker-compose.yaml
```

---

# Networks in Docker Compose

- Normally no need to create network manually.
- Docker Compose automatically creates one shared network for all services.

So containers communicate using service names.

Example:
```yaml
services:
  mongodb:
  backend:
```

Backend can access MongoDB using:
```bash
mongodb
```

---

# Named Volumes

Named volumes should be defined globally.

Example:
```yaml
services:
  mongodb:
    volumes:
      - data:/data/db

volumes:
  data:
```

---

# Docker Compose Commands

## Start Containers

```bash
docker-compose up
```

- Builds images if not already built
- Starts containers
- Detects code changes with bind mounts

---

## Build Only

```bash
docker-compose build
```

- Only builds images
- Does not start containers

---

## Detached Mode

```bash
docker-compose up -d
```

- Runs containers in background

---

## Stop & Remove Containers

```bash
docker-compose down
```

Removes:
- containers
- networks

Does NOT remove volumes.

---

## Remove Volumes Also

```bash
docker-compose down -v
```

Removes:
- containers
- networks
- volumes

---

# depends_on

Example:
```yaml
depends_on:
  - mongodb
  - frontend
```

Meaning:
- Start `mongodb` and `frontend` first
- Then start current service

Useful for backend services depending on database/frontend.

---

# Container Names

If container name is not provided:

Docker Compose auto generates name using:
```bash
project-folder-name + service-name
```

Example:
```bash
myproject_backend_1
```

---

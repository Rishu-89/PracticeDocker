# Docker as Utility Container (Node Environment)

```bash
docker run -it -d node
```

- `-i` → interactive
- `-t` → terminal
- `-d` → detached mode

---

# docker exec

Helps to run commands inside a running container  
(additional commands other than the default command)

## Node.js Example

```bash
docker exec -it container_name npm init
```

---

# Override Default CMD

```bash
docker run -it node npm init
```

Overrides default command from Dockerfile

Example:

```dockerfile
CMD ["node","server.js"]
```

But does NOT override ENTRYPOINT

Example:

```dockerfile
ENTRYPOINT ["npm"]
```

Instead it appends command after ENTRYPOINT

Example:

```bash
docker run node-util install express
```

Actually runs:

```bash
npm install express
```

Useful for:
- security
- restricting commands
- utility containers

---

# Dockerfile (Works Fine for npm and node Commands)

```dockerfile
FROM node:14-alpine

WORKDIR /app
```

---

# Bind Mount Example

```bash
docker run -it -v local_path:/app node-util npm init
```

Example:

```bash
docker run -it -v $(pwd):/app node-util npm init
```

Now you can run npm locally without installing Node.js on your system.

Bind mount connects:
- local folder
- container folder

So you can see `package.json` inside your local folder also.

---

# Dockerfile with ENTRYPOINT

```dockerfile
FROM node:14-alpine

WORKDIR /app

ENTRYPOINT ["npm"]
```

---

# Run npm Commands Directly

```bash
docker run -it -v $(pwd):/app node-util install express
```

No need to write `npm`

Because ENTRYPOINT already contains:

```dockerfile
ENTRYPOINT ["npm"]
```

So command becomes:

```bash
npm install express
```

---

# docker-compose run

Helps to run a single service by service name

```bash
docker-compose run service_name
```

Useful for short commands

---

# docker-compose.yml

```yaml
version: "3.8"

services:
  npm:
    build: ./
    stdin_open: true
    tty: true
    volumes:
      - ./:/app
```

---

# Explanation

## stdin_open: true

Equivalent to:

```bash
-i
```

Keeps STDIN open

---

## tty: true

Equivalent to:

```bash
-t
```

Allocates terminal

---

## volumes

```yaml
volumes:
  - ./:/app
```

Bind mounts current directory to `/app`

---

# Run Commands using Docker Compose

```bash
docker-compose run --rm npm init
```

- `run` → runs one-time container
- `--rm` → removes container automatically after execution

---

# Install Package using Docker Compose

```bash
docker-compose run --rm npm install express
```

---

# CMD vs ENTRYPOINT

| CMD | ENTRYPOINT |
|---|---|
| Default command | Fixed executable |
| Can be overridden | Cannot be overridden directly |
| Replaced completely | Appends additional commands |

---

# Common Commands

## Start Node Container

```bash
docker run -it -d node
```

---

## Execute Command Inside Running Container

```bash
docker exec -it container_name npm init
```

---

## Override CMD

```bash
docker run -it node npm init
```

---

## Bind Mount

```bash
-v $(pwd):/app
```

---

## Docker Compose Run

```bash
docker-compose run --rm npm init
```

---

# Advantages of Utility Containers

- No local Node.js installation required
- Same environment everywhere
- Clean system
- Easy dependency management
- Useful in teams and CI/CD

---

# Recommended Structure

```text
project/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── src/
```

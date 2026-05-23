# Docker Notes - Day 1

## Commands Learned

### Show All Containers
```bash
docker ps -a
```
Shows all containers including stopped ones.

---

### Pull Node Image
```bash
docker pull node
```
Downloads the official Node.js Docker image.

---

### Run Node Container
```bash
docker run node
```
Creates and starts a new container instance using the Node image.

---

---

### Run Node Container in Interactive Terminal Mode
```bash
docker run -it node
```
Runs the Node container with an interactive terminal.

---


### Build Docker Image from Dockerfile
```bash
docker build -t myapp .
```
Builds a Docker image using the Dockerfile present in the current directory.

- `-t` → Tags/names the image
- `.` → Current directory

---

### Run Container with Port Mapping
```bash
docker run -p 3000:3000 myapp
```
Runs the container and maps ports between host and container.

- First `3000` → Host machine port
- Second `3000` → Container port

Example:
```bash
docker run -p 3000:3000 myapp
```

Application becomes accessible at:
```bash
http://localhost:3000
```

---

### Expose Port in Dockerfile
```dockerfile
EXPOSE 3000
```
Tells Docker that the container listens on port `3000`.

Example Dockerfile:
```dockerfile
FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
```
---


## Key Learnings
- Images are templates
- Containers are running instances of images
- `docker pull` downloads images
- `docker run` creates and starts container instances






# Docker Notes

## Build Image
```bash
docker build .
```

Builds Docker image from Dockerfile.

---

## Run Container
```bash
docker run image_id
```

Creates and starts a NEW container from image.

---

## Run with Port Mapping
```bash
docker run -p 3000:80 image_id
```

- Host Port → 3000
- Container Port → 80

Access app:
```txt
localhost:3000
```

---

## Attached vs Detached Mode

### Attached Mode
```bash
docker run image_id
```

- Shows logs directly
- Blocks terminal

### Detached Mode
```bash
docker run -d image_id
```

- Runs in background
- Terminal remains free

---

## Start Stopped Container

### Detached (Default)
```bash
docker start container_id
```

Starts existing stopped container in background.

### Attached
```bash
docker start -a container_id
```

Starts container and attaches terminal/logs.

---

## Attach Running Container
```bash
docker attach container_id
```

Reconnect terminal to running container.

---

## Stop Container
```bash
docker stop container_name
```

Gracefully stops running container.

---

## View Containers

### Running Containers
```bash
docker ps
```

### All Containers
```bash
docker ps -a
```

---

## View Logs

### Normal Logs
```bash
docker logs container_name
```

### Live Logs
```bash
docker logs -f container_name
```

Streams logs continuously.

---

# Important Concepts

## Image
- Read-only blueprint
- Contains:
  - Code
  - Dependencies
  - Environment
  - Configuration

## Container
- Running instance of image
- Adds writable layer on top of image
- Runs application process

---

# Image vs Container

| Image | Container |
|---|---|
| Blueprint | Running application |
| Read-only | Writable |
| Can create many containers | Created from image |

---

# Real-World Analogy

- Image = Cake recipe
- Container = Actual cake

One image can create many containers.

If image changes:
- Old containers stay same
- New containers use updated image

---

# Docker Layer Architecture

Each Dockerfile command creates a separate layer.

Example:
```Dockerfile
COPY . /app
```

---

# Docker Cache Optimization

Better Dockerfile:
```Dockerfile
COPY package.json /app

RUN npm install

COPY . /app
```

Benefits:
- Faster builds
- `npm install` runs only when `package.json` changes

---

# Important Layer Rule

If one layer changes:
- Docker rebuilds that layer
- All layers after it rebuild again

Docker builds layers from top → bottom.

---

# EXPOSE vs Port Mapping

## EXPOSE
```Dockerfile
EXPOSE 80
```

- Documentation purpose
- Tells Docker app listens on port 80
- Does NOT publish port

## Publish Port
```bash
docker run -p 3000:80 image_id
```

Actually exposes container port to host machine.

---

# Important Difference

## docker run
```bash
docker run nginx
```

- Creates NEW container
- Starts container

## docker start
```bash
docker start container_id
```

- Starts EXISTING stopped container
- Does NOT create new container

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


# Docker Additional Notes

## View Images
```bash
docker images
```

Shows all locally available Docker images.

---

## Inspect Image
```bash
docker image inspect image_id
```

Shows detailed information about image:
- OS
- Architecture
- Layers
- Environment variables
- Metadata

---

# Interactive Mode

## Run Container Interactively
```bash
docker run -it image_name
```

Flags:
- `-i` → Interactive input
- `-t` → Terminal

Example:
```bash
docker run -it ubuntu
```

---

# Restart Container with Terminal Attached
```bash
docker start -a -i container_name
```

Flags:
- `-a` → Attach terminal/logs
- `-i` → Interactive mode

---

# Execute Command Inside Running Container
```bash
docker exec -it container_name bash
```

Runs bash shell inside running container.

---

# Remove Containers

## Remove Single Container
```bash
docker rm container_name
```

## Remove Multiple Containers
```bash
docker rm name_1 name_2 name_3
```

Important:
- Cannot remove running container
- Stop container first

Example:
```bash
docker stop mycontainer
docker rm mycontainer
```

---

# Remove Images
```bash
docker rmi image_id
```

Important:
- Containers using image must be removed first
- Even stopped containers block image deletion

---

# Remove Unused Images
```bash
docker image prune
```

Removes unused/dangling images.

---

# Automatically Remove Container After Stop
```bash
docker run --rm image_id
```

Behavior:
- Container gets deleted automatically after stopping
- Useful for temporary/testing containers
- Not commonly used for long-running servers

# Docker Hub & Image Management Notes

## Copy Files Between Container and Host
```bash
docker cp container_name:/test/. dummy
```

Copies files from running container to local machine.

Useful for:
- Logs
- Generated files
- Debugging

---

# Name a Container
```bash
docker run --name myapp image_id
```

Assigns custom name to container.

---

# Build Image with Name and Tag
```bash
docker build -t goals:version12 .
```

Format:
```txt
name:tag
```

- Name → Image name
- Tag → Version/unique identifier

---

# Run Named Image
```bash
docker run goals:version12
```

Runs image using name and tag.

---

# Sharing Images

Usually only images are shared:
- Docker Hub
- AWS ECR
- Google Artifact Registry
- Other container registries

Containers themselves are not shared.

---

# Push Image to Docker Hub
```bash
docker push rishu89656/node-hello-world
```

Pushes image to Docker Hub repository.

---

# Local Image Name Must Match Docker Hub Repository
```bash
docker build -t rishu89656/node-hello-world .
```

Builds image with Docker Hub repository name.

---

# Build with Tag
```bash
docker build -t rishu89656/node-hello-world:v1 .
```

Creates tagged image.

---

# Tag Existing Image
```bash
docker tag old_name:tag new_name:tag
```

Creates another reference/tag for same image.

---

# Login to Docker Hub
```bash
docker login
```

Authenticates Docker client with Docker Hub.

---

# Pull Image from Docker Hub
```bash
docker pull rishu89656/node-hello-world:v1
```

Downloads image from Docker Hub.

If tag is omitted:
```bash
docker pull rishu89656/node-hello-world
```

Docker pulls:
```txt
latest
```
tag by default.

---

# Automatic Pull Behavior

```bash
docker run node
```

If image does not exist locally:
- Docker automatically pulls image from Docker Hub
- Then starts container

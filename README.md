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

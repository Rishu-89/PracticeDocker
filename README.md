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

## Key Learnings
- Images are templates
- Containers are running instances of images
- `docker pull` downloads images
- `docker run` creates and starts container instances

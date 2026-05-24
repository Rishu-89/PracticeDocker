# Docker Volumes & Data Persistence

## Read-Write Layer in Containers

Every Docker container has a read-write layer where temporary data is stored.

- If you stop a container and restart the same container, data is still available.
- If you delete/remove the container, all data stored in that layer is lost.

Because of this, Docker provides external data storage mechanisms.

---

# External Data Storage in Docker

## 1. Volumes (Managed by Docker)

Types of volumes:
- Anonymous Volumes
- Named Volumes

Docker manages the storage location automatically.

---

## Anonymous Volume

### Dockerfile
```Dockerfile
VOLUME ["/app/feedback"]
```

This creates an anonymous volume for `/app/feedback`.

### Characteristics
- Created automatically by Docker.
- Hard to manage because Docker gives it a random name.
- Stored inside Docker-managed storage.
- Used to persist container data.

### Check Volumes
```bash
docker volume ls
```

---

## Named Volume

### Run Container with Named Volume
```bash
docker run -p 3000:80 --rm --name myapp -v feedback:/app/feedback image_name
```

### Explanation

```bash
feedback
```
Volume name.

```bash
/app/feedback
```
Path inside the container.

### Characteristics
- Easy to manage.
- Data persists even after container removal.
- Can be reused across containers.

---

## 2. Bind Mounts (Managed by You)

Bind mounts map a local machine folder directly into the container.

### Example
```bash
docker run -v /path/on/your/machine:/app/feedback image_name
```

### Characteristics
- Storage location controlled by you.
- Useful during development.
- Changes reflect instantly between host and container.

---

# Remove Unused Volumes

```bash
docker volume prune
```

Removes all unused Docker volumes.

---

# Important Notes

- Container read-write layer is temporary.
- Volumes are used for persistent data.
- Anonymous volumes are auto-created by Docker.
- Named volumes are better for persistent application data.
- Bind mounts are mainly used during development.
- Anonymous volumes are not deleted when container stops.
They remain until removed manually or removed with container using --rm.
VOLUME ["/app/feedback"]
-Creates an anonymous volume stored in Docker-managed storage.
-It is not "unfindable", just harder to manage due to random naming.






# Docker Bind Mounts, Named Volumes & Anonymous Volumes

## Bind Mount

```bash
-v "/home/rishu/data-volumes-01-starting-setup:/app"
```

Connects local folder with container folder.

| Local Machine | Container |
|---|---|
| /home/rishu/data-volumes-01-starting-setup | /app |

Used in development so local code changes instantly reflect inside container without rebuilding image.

---

## Named Volume

```bash
-v feedback:/app/feedback
```

Stores persistent data managed by Docker.

| Volume Name | Container Path |
|---|---|
| feedback | /app/feedback |

Data remains even if container is deleted.

---

## Anonymous Volume

```bash
-v /app/node_modules
```

or

```dockerfile
VOLUME ["/app/node_modules"]
```

Creates anonymous volume for `node_modules`.

Used because bind mount can overwrite container `node_modules`.

This keeps container dependencies safe and Linux-compatible.

---

## Example Using All Types of Volumes

```bash
docker run -d \
-p 3000:80 \
--name feedback-app \
-v feedback:/app/feedback \
-v "/home/rishu/data-volumes-01-starting-setup:/app" \
-v /app/node_modules \
feddback-node
```

---

## Explanation

| Volume Type | Purpose |
|---|---|
| Named Volume | Persistent feedback data |
| Bind Mount | Sync local project files with container |
| Anonymous Volume | Protect container `node_modules` |




# Docker Volumes, Bind Mounts & Environment Variables

---

# Access Data Inside a Volume

```bash
docker run --rm -it -v feedback:/data alpine sh
```

### Explanation
- `--rm` → removes container after exit
- `-it` → interactive terminal
- `-v feedback:/data` → mounts named volume `feedback` to `/data`
- `alpine` → lightweight Linux image
- `sh` → opens shell

### Check Files
```bash
ls /data
```

---

# Complex Volume Setup

```bash
docker run -d -p 3000:80 --name feedback-app --rm \
-v feedback:/app/feedback \
-v "/home/rishu/data-volumes-01-starting-setup/:/app:ro" \
-v /app/node_modules \
-v /app/temp \
feedback-node
```

---

# Explanation

## Named Volume
```bash
-v feedback:/app/feedback
```

- `feedback` → named volume
- `/app/feedback` → container path
- Used for persistent data

---

## Bind Mount (Read Only)

```bash
-v "/home/rishu/data-volumes-01-starting-setup/:/app:ro"
```

### Explanation
```bash
/home/rishu/data-volumes-01-starting-setup/
```
Path on local machine.

```bash
/app
```
Path inside container.

```bash
:ro
```
Read-only access.

Container can read files but cannot modify them.

---

## Anonymous Volume

```bash
-v /app/node_modules
```

Creates anonymous volume for `node_modules`.

Used so bind mount does not overwrite container dependencies.

---

# Docker Volume Commands

## Create Volume

```bash
docker volume create feedback-files
```

If volume does not exist, Docker can also create it automatically.

---

## Inspect Volume

```bash
docker volume inspect volume_name
```

Shows:
- mount location
- driver
- metadata

---

## Remove Volume

```bash
docker volume rm volume_name
```

---

# COPY vs Bind Mount

## COPY

```Dockerfile
COPY . .
```

- Copies project files into image during build.
- Mostly used in production.
- Changes in local files do NOT reflect automatically.

---

## Bind Mount

```bash
-v "/local/path:/app"
```

- Links local folder directly with container.
- Changes reflect instantly.
- Mainly used during development.

---

# .dockerignore

Used to exclude files/folders from Docker build context.

### Example

```dockerignore
node_modules
.git
Dockerfile
```

Benefits:
- Faster builds
- Smaller images
- Better security

---

# Environment Variables

## Default Environment Variable

```Dockerfile
ENV PORT 80
```

Sets default value of `PORT`.

---

## Use Environment Variable

```Dockerfile
EXPOSE $PORT
```

Exposes port using environment variable.

---

## Override Environment Variable

```bash
docker run --env PORT=8000 image_name
```

or

```bash
docker run -e PORT=8000 image_name
```

Multiple `-e` can be added.

---

## Using Environment File

```bash
docker run -d --env-file ./.env image_name
```

Better than writing variables directly in command.

---

# Build Arguments (ARG)

Arguments are available only during image build process.

---

## Dockerfile

```Dockerfile
ARG DEFAULT_PORT=80

ENV PORT=$DEFAULT_PORT
```

---

## Build Image with Argument

```bash
docker build --build-arg DEFAULT_PORT=8000 .
```

---

# Difference Between ARG and ENV

| ARG | ENV |
|---|---|
| Available only during build | Available during container runtime |
| Used in Dockerfile build process | Used by running application |
| Cannot be accessed after container starts | Accessible inside container |


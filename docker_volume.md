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

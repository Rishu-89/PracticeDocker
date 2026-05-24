# Docker Networking

Docker networking allows containers to communicate:
- with the internet
- with the host machine
- with other containers

---

# Types of Docker Communication

## 1. Container to Internet

By default, Docker containers can communicate with the outside world (internet).

Example:
- accessing APIs
- downloading packages
- connecting to external websites

But containers cannot access the host machine using `localhost`.

Inside a container:
```bash
localhost
```

refers to:
```bash
the container itself
```

not the host machine.

---

# 2. Container to Host Machine

To access services running on the host machine from inside a container:

```bash
host.docker.internal
```

### Example

Instead of:
```bash
localhost:3000
```

use:
```bash
host.docker.internal:3000
```

This allows:
```bash
container -> host machine communication
```

---

# 3. Container to Container Communication

Containers can communicate with each other in two ways.

---

## Method 1: Using Container IP Address

### Inspect Container

```bash
docker inspect CONTAINER_NAME
```

Check:
```bash
NetworkSettings
```

Find:
```bash
IPAddress
```

Then use:

```bash
container_ip_address
```

instead of:
```bash
localhost
```

### Problem
Container IPs can change when containers restart.

So this method is not recommended.

---

# Method 2: Using Docker Networks (Recommended)

---

## Create Network

```bash
docker network create favorites-net
```

Unlike volumes, Docker networks are NOT automatically created manually for custom names.

---

## List Networks

```bash
docker network ls
```

---

# Run Containers in Same Network

## MongoDB Container

```bash
docker run -d --name mongodb --network favorites-net mongo
```

---

## Node App Container

```bash
docker run -d --name movies-node --network favorites-net nodeApp
```

---

# Communication Between Containers

If two containers are in the same Docker network:

```bash
container_name
```

can be used as hostname.

Example:

Instead of:
```bash
localhost
```

or:
```bash
IP address
```

use:
```bash
mongodb
```

inside the Node.js app.

Docker automatically resolves container names.

---

# Default Docker Network Type

By default, Docker creates networks using:

```bash
bridge
```

network driver.

Bridge network allows containers in the same network to communicate with each other.

---

# Important Notes

- `localhost` inside container refers to the container itself.
- `host.docker.internal` refers to the host machine.
- Custom Docker networks are preferred for container-to-container communication.
- Container names can act as hostnames inside same network.
- Using container IP directly is not recommended because IPs can change.

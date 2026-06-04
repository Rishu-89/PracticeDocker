# Docker, AWS ECS, ECS Deployment & Load Balancer Notes

## Manual Deployment

### Docker Compose

```bash
docker compose up -d --build server
```

* `--build` forces Docker Compose to rebuild the image before starting containers.
* Useful when code changes are made.
* Docker uses layer caching, so unchanged layers are reused.

### Volume Mounts

Development:

```yaml
volumes:
  - .:/app:delegated
```

* `delegated` improves performance.
* File synchronization happens in chunks instead of instantly.
* Container performance is prioritized.

Production:

```dockerfile
COPY . .
```

* Code is copied into the image during build.
* No bind mounts are used.

---

# Deploying Docker Application on AWS EC2

## Install Docker

```bash
sudo apt update
sudo apt install docker.io -y

sudo systemctl start docker
sudo systemctl enable docker

docker --version
```

## Build Image on EC2

1. Connect to EC2 instance.
2. Install Docker.
3. Build your Docker image.
4. Run the container.
5. Add inbound rules in Security Group:

* HTTP (80)
* HTTPS (443)
* Custom application ports if needed

---

# Stress Testing

## Install Apache Benchmark

```bash
sudo apt update
sudo apt install apache2-utils -y
```

## Send 1000 Requests with 50 Concurrent Users

Local:

```bash
ab -n 1000 -c 50 http://localhost/
```

Using EC2 Public IP:

```bash
ab -n 1000 -c 50 http://3.84.241.134/
```

---

## Stress Testing Using Curl Loop

```bash
for i in {1..1000}; do
  curl -s http://3.84.241.134/ > /dev/null &
done

wait
```

---

# Pull Updated Docker Images

```bash
docker pull image_name
```

Used when a newer image version is pushed to Docker Hub.

---

# AWS ECS (Elastic Container Service)

## ECS Layers

1. Container
2. Task
3. Service
4. Cluster

### Flow

```text
Cluster
   ↓
Task Definition
   ↓
Service
```

### Fargate

AWS Fargate is a serverless compute engine for containers.

Benefits:

* No server management
* Automatic scaling
* Pay only for resources used

---

# ECS Deployment Steps

## Step 1: Create Cluster

Container infrastructure.

## Step 2: Create Task Definition

Defines:

* Docker image
* CPU
* Memory
* Networking
* Environment variables

## Step 3: Create Service

Maintains desired number of running tasks.

---

# ECS Networking

If multiple containers are inside the same ECS Task:

```text
Container A ---> localhost ---> Container B
```

They can communicate using `localhost`.

Example:

```javascript
http://localhost:5000/api
```

---

# Persistent Storage

## EFS (Elastic File System)

Used for:

* Shared storage
* Persistent volumes
* Multi-container access

Can be mounted by multiple ECS tasks.

---

# Updating ECS Application

After pushing a new image:

1. Push image to Docker Hub.
2. Open ECS Service.
3. Click:

```text
Force New Deployment
```

This pulls the latest image and redeploys containers.

---

# Frontend Deployment Problem

## Development Mode

Frameworks like:

* React
* Angular
* Vue

Run their own development server.

Example:

```bash
npm start
```

Browser directly communicates with the dev server.

---

## Production Solution

Use a Multi-Stage Docker Build.

---

# Multi-Stage Docker Build

## Build Command

```bash
docker build -f frontend/Dockerfile.prod -t image_name ./frontend
```

### Flags

`-f`

Specify Dockerfile path.

`-t`

Tag image name.

---

# React Production Dockerfile

```dockerfile
FROM node:14-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## Build Only First Stage

```bash
docker build \
  --target build \
  -f frontend/Dockerfile.prod \
  -t image_name \
  ./frontend
```

### Purpose

Runs only the build stage without creating the final Nginx image.

Useful for debugging build issues.

---

# Load Balancer

A Load Balancer distributes incoming traffic across multiple application instances.

Benefits:

* High Availability
* Fault Tolerance
* Scalability

Users always access the same URL regardless of deployment version.

---

# Target Group

A Target Group is a collection of backend resources that receive traffic from a Load Balancer.

## Supported Targets

* Amazon EC2 Instances
* IP Addresses
* AWS Lambda Functions

### Request Flow

```text
User
  ↓
Load Balancer
  ↓
Target Group
  ↓
Backend Servers
```

---

# Final Application Architecture

```text
                    AWS ECS Cluster

               ┌─────────────────────┐
               │     Load Balancer   │
               └──────────┬──────────┘
                          │
         ┌────────────────┴────────────────┐
         │                                 │

   ECS Task 1                        ECS Task 2

 ┌──────────────┐                 ┌──────────────┐
 │ React SPA    │                 │ React SPA    │
 └──────┬───────┘                 └──────┬───────┘
        │                                │
        ▼                                ▼

             Internal AWS Load Balancer
                       │
                       ▼

               Node.js REST API
                       │
                       ▼

                 MongoDB Atlas
```

---

# Quick Revision

### Docker

```bash
docker compose up -d --build
docker pull image_name
```

### EC2

```bash
sudo apt install docker.io -y
```

### Stress Testing

```bash
ab -n 1000 -c 50 http://localhost/
```

### ECS Hierarchy

```text
Container
   ↓
Task
   ↓
Service
   ↓
Cluster
```

### Persistent Storage

```text
EFS
```

### Production Frontend

```text
React Build
    ↓
Nginx
    ↓
Serve Static Files
```

### ECS Update

```text
Force New Deployment
```

### Load Balancer

```text
User
 ↓
Load Balancer
 ↓
Target Group
 ↓
Application
```

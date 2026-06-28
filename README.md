# Car Inspection Management System

A full-stack web application for managing vehicles and their inspections. The system allows users to register vehicles, perform inspections, upload inspection photos, and track inspection status through a clean React frontend backed by a Spring Boot REST API.

## Features

### Vehicle Management

* Create, Read, Update and Delete (CRUD) vehicles
* Search vehicles by VIN, Make, Model or Status
* Client-side form validation
* Material UI based interface

### Inspection Management

* Create, Read, Update and Delete (CRUD) inspections
* Associate inspections with vehicles
* Upload inspection photos
* View inspection details
* Submit inspections (Draft → Submitted workflow)

### Backend

* RESTful API using Spring Boot
* Layered Architecture (Controller → Service → Repository)
* DTO based request/response handling
* Validation using Jakarta Bean Validation
* PostgreSQL database
* JPA/Hibernate ORM

### Cloud Deployment

* Dockerized Spring Boot application
* Amazon ECS Fargate
* Amazon ECR
* Amazon RDS PostgreSQL
* Application Load Balancer (ALB)
* Amazon S3
* Amazon CloudFront

---

# Tech Stack

## Backend

* Java 21
* Spring Boot 3
* Spring Web
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven

## Frontend

* React
* Vite
* React Router
* Axios
* Material UI

## Cloud

* Amazon ECS (Fargate)
* Amazon ECR
* Amazon RDS
* Amazon S3
* Amazon CloudFront
* Application Load Balancer (ALB)

## DevOps

* Docker
* Git
* GitHub

---

# Project Structure

```
CarInspection/
│
├── src/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api/
│
├── Dockerfile
├── pom.xml
└── README.md
```

---

# Architecture

```
React
      │
CloudFront
      │
Application Load Balancer
      │
Amazon ECS (Fargate)
      │
Spring Boot REST API
      │
PostgreSQL (Amazon RDS)

Inspection Photos
      │
Amazon S3
```

---

# REST APIs

## Vehicle APIs

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /api/vehicles        |
| GET    | /api/vehicles/{id}   |
| POST   | /api/vehicles        |
| PUT    | /api/vehicles/{id}   |
| DELETE | /api/vehicles/{id}   |
| GET    | /api/vehicles/search |

## Inspection APIs

| Method | Endpoint                     |
| ------ | ---------------------------- |
| GET    | /api/inspections             |
| GET    | /api/inspections/{id}        |
| POST   | /api/inspections             |
| PUT    | /api/inspections/{id}        |
| DELETE | /api/inspections/{id}        |
| PATCH  | /api/inspections/{id}/submit |
| POST   | /api/inspections/{id}/photo  |
| GET    | /api/inspections/{id}/photo  |

---

# Getting Started

## Backend

```bash
mvn clean package
mvn spring-boot:run
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Deployment

The backend is containerized using Docker and deployed to Amazon ECS Fargate.

Deployment workflow:

```
Spring Boot
      │
Docker
      │
Amazon ECR
      │
Amazon ECS Fargate
      │
Application Load Balancer
      │
Amazon RDS PostgreSQL
```

The frontend is built using Vite and deployed through Amazon S3 and CloudFront.


# Author

**Shivam Pandey**

# Agora Microservices - Project Overview

A modern social media platform (Twitter/X clone) built with a microservices architecture.

## 🏗 Architecture & Technologies

### Backend
- **Framework:** Spring Boot 3.5.7, Spring Cloud (2025.0.0)
- **Service Discovery:** Netflix Eureka
- **Configuration:** Spring Cloud Config (externalized in `config-repo`)
- **API Gateway:** Spring Cloud Gateway with JWT authentication
- **Communication:**
  - Synchronous: OpenFeign
  - Asynchronous: RabbitMQ (for likes, comments, and notifications)
  - Real-time: WebSockets (STOMP over SockJS)
- **Persistence:** PostgreSQL (Primary DB), Spring Data JPA, Flyway (Migrations)
- **Storage:** Minio (Object Storage for images)
- **Security:** JWT-based stateless authentication
- **Monitoring & Tracing:**
  - Prometheus & Grafana (Metrics)
  - Zipkin (Distributed Tracing)
  - Micrometer
- **Documentation:** SpringDoc / OpenAPI (Swagger)

### Frontend
- **Framework:** Next.js (React 19)
- **Styling:** Tailwind CSS, Radix UI components
- **State Management:** TanStack Query (React Query)
- **API Client:** Axios
- **Real-time:** @stomp/stompjs, sockjs-client

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Logging:** Dozzle (Log viewer)

---

## 🚀 Building and Running

### Prerequisites
- Java 21+
- Node.js (v20+)
- Docker & Docker Compose

### 1. Infrastructure Setup
Launch the core infrastructure (DB, RabbitMQ, Eureka, Config Server, etc.):
```bash
docker-compose up -d
```

### 2. Backend Services
Build all services using Maven:
```bash
mvn clean install
```
Individual services can be run via IDE or:
```bash
mvn spring-boot:run -pl <module-name>
```
*Order of startup: Eureka -> Config Server -> Other Services.*

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Accessible at `http://localhost:3000`.

---

## 🛠 Development Conventions

### Code Style
- **Backend:** Java 21, Lombok for boilerplate reduction, Controller-Service-Repository pattern.
- **Frontend:** TypeScript, Functional Components with React Hooks, Zod for validation.

### API Standards
- **RESTful API:** Standard HTTP methods (GET, POST, PUT, DELETE).
- **Versioning:** API endpoints are prefixed with `/api/v1/`.
- **Documentation:** Swagger UI is available at `http://localhost:9000/swagger-ui.html` (via Gateway).

### Messaging Patterns
- **Events:** Asynchronous events are used for non-blocking operations like Like and Comment creation.
- **WebSocket:** Real-time notifications and updates are pushed via `/ws` endpoint.

### Database Migrations
- Flyway is used for database schema management. Migration scripts are located in `src/main/resources/db/migration` of each service.

---

## 📂 Project Structure

- `agora-api`: Core business logic (Users, Posts, Subscriptions, Notifications).
- `agora-comments`: Specialized service for managing comments.
- `agora-likes`: Specialized service for managing likes.
- `agora-stats`: Statistics and analytics.
- `eureka-server`: Service registry.
- `config-server`: Centralized configuration server.
- `gateway-api`: Entry point for all requests.
- `frontend`: Next.js web application.
- `config-repo`: Configuration properties files for all services.
- `postgres-init`: Database initialization scripts.

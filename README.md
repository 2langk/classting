### 개발 환경

- IDE: VSCode
- Language: Node.js(20.11.1)
- Database: Mysql(v8.2.0)
- Web application framework: Nest.js(express)
- ORM: Prisma

### 실행 방법

- `config/dotenv/.env.*`의 mysql 연결 정보를 수정해주세요.
- `npm i --force`, `npm run prepare`, `npm run init:db`, `npm run gen:prisma`를 순서대로 실행해주세요.
- `npm run dev`로 서버를 실행해주세요. ("Server is running on 4000"가 출력되면 정상입니다.)
- `http://localhost:4000/docs`로 swagger document 확인 가능합니다.

### ERD

```mermaid
erDiagram
"config" {
  Int id PK
  config_type type
  String name
  String description
  Int parent_id "nullable"
  DateTime createdAt
  DateTime updatedAt
}
"domainEvent" {
  Int id PK
  domainEvent_aggregate aggregate
  Int aggregate_id
  Int config_id FK
  domainEvent_status status
  String errorLog "nullable"
  DateTime processedAt "nullable"
  DateTime createdAt
}
"news" {
  Int id PK
  String title
  String contents
  Int school_id
  Int admin_id
  DateTime createdAt
  DateTime updatedAt
}
"school" {
  Int id PK
  String name
  String region
  DateTime createdAt
  DateTime updatedAt
}
"subscribe" {
  Int id PK
  Int school_id
  Int user_id
  DateTime createdAt
  DateTime updatedAt
}
"subscribe_status" {
  Int id PK
  Int subscribe_id FK
  Int config_id FK
  DateTime processedAt
}
"user" {
  Int id PK
  String email UK
  String password
  String name
  DateTime createdAt
  DateTime updatedAt
}
"user_role" {
  Int id PK
  Int user_id FK
  Int config_id FK
}
"domainEvent" }o--|| "config" : config
"subscribe_status" }o--|| "config" : config
"subscribe_status" |o--|| "subscribe" : subscribe
"user_role" }o--|| "config" : config
"user_role" }o--|| "user" : user
```

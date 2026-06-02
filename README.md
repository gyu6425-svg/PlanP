# PlanP

PlanP는 여행자가 도시별 교통, 맛집, 관광, 숙소 정보를 한 화면에서 탐색하고 예약 플랫폼으로 빠르게 이동할 수 있도록 만든 여행 정보 통합 서비스입니다. 프론트엔드 중심 프로젝트이지만, 로그인 사용자별 데이터 저장, 예약 클릭 로그, 관리자 통계까지 백엔드와 DB를 연결해 실제 서비스 흐름을 구현했습니다.

## Tech Stack

- Frontend: React, TypeScript, Vite, Redux Toolkit, React Router
- Styling: Tailwind CSS, custom CSS
- Backend: Node.js, Express
- Database: SQLite, better-sqlite3
- Auth: JWT, bcrypt
- API Client: Axios

## Main Features

- 도시 검색 및 도시별 설문
- 설문 결과 저장 및 복원
- 교통, 맛집, 관광, 숙소 추천 결과 표시
- 찜한 항목 보관함 저장
- 상세 페이지 최근 본 항목 저장
- 외부 예약 링크 클릭 로그 저장
- 관리자 통계 페이지
- 쇼핑 카테고리 준비중 화면

## User Flow

```txt
홈에서 도시 선택
→ 설문 진행
→ 결과 페이지에서 이동수단/맛집/관광/숙소 추천 확인
→ 관심 항목 저장
→ 외부 예약 링크 클릭
→ 클릭 기록이 DB에 저장
```

로그인 사용자는 도시별 설문 결과가 DB에 저장됩니다. 같은 도시 설문을 다시 진행하면 기존 결과가 갱신됩니다.

```txt
로그인
→ 도쿄 설문 완료
→ survey_results 저장
→ 다시 도쿄 선택
→ 이전 기록 복구 또는 새로 작성 선택
```

## Admin Flow

관리자 페이지는 admin 권한이 있는 사용자만 접근할 수 있습니다.

```txt
/admin
→ 비로그인: 로그인 페이지 이동
→ 일반 사용자: 홈 이동
→ 관리자: 통계 페이지 접근
```

관리자 페이지에서 확인할 수 있는 데이터:

- 가장 많이 선택한 도시
- 도시 선택 순위
- 도시별 예약 클릭 수
- 이동수단, 맛집, 관광, 숙소별 클릭 수
- 많이 클릭한 예약 상품
- 도시, 카테고리, 기간 필터

## Test Accounts

로컬 DB에 생성된 테스트 계정입니다.

```txt
일반 사용자
ID: testuser01
PW: test1234

관리자
ID: admin01
PW: admin1234
```

관리자 계정은 `users.role = admin`으로 저장됩니다.

## Project Structure

```txt
PlanP
├─ docs
│  └─ qa-checklist.md
├─ src
│  ├─ components
│  ├─ data
│  │  └─ generated/details
│  ├─ lib
│  ├─ pages
│  ├─ routes
│  ├─ services
│  └─ store
├─ server
│  ├─ migrations
│  ├─ scripts
│  ├─ src
│  │  ├─ auth.js
│  │  ├─ db.js
│  │  ├─ routes
│  │  ├─ validation.js
│  │  └─ index.js
│  └─ planp.db
├─ public
└─ README.md
```

## Environment

루트 `.env` 예시:

```txt
VITE_API_BASE_URL=http://localhost:4000
```

서버 `.env` 예시:

```txt
PORT=4000
HOST=127.0.0.1
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=replace-this-with-a-long-random-secret
JWT_EXPIRES_IN=1d
DB_PATH=./planp.db
```

실제 API 키는 README나 Git 저장소에 포함하지 않습니다.

## Getting Started

의존성 설치:

```bash
npm install
npm --prefix server install
```

백엔드 실행:

```bash
npm run server:dev
```

관리자 계정 생성 또는 갱신:

```bash
npm --prefix server run seed:admin
```

관리자 계정 값은 환경변수로 변경할 수 있습니다.

```bash
ADMIN_LOGIN_ID=admin01 ADMIN_PASSWORD=admin1234 npm --prefix server run seed:admin
```

프론트엔드 실행:

```bash
npm run dev
```

기본 주소:

```txt
Frontend: http://localhost:5173
Backend: http://127.0.0.1:4000
Admin: http://localhost:5173/admin
```

`5173` 포트가 이미 사용 중이면 Vite가 `5174` 같은 다른 포트를 자동으로 사용합니다.

## Database

SQLite DB 파일:

```txt
server/planp.db
```

현재 테이블:

```txt
schema_migrations
users
favorites
survey_results
booking_clicks
recent_views
```

DB 스키마는 `server/migrations`의 SQL 파일로 관리합니다. 서버 시작 시 `server/src/db.js`의 `migrate()`가 아직 적용되지 않은 migration을 순서대로 실행하고, 실행 이력은 `schema_migrations`에 저장합니다.

### users

회원 계정 정보입니다. 비밀번호 원문은 저장하지 않고 bcrypt 해시를 저장합니다.

```txt
id
login_id
password_hash
name
birth_year
birth_month
birth_day
email
role
created_at
```

### favorites

사용자가 저장한 관심 항목입니다.

```txt
user_id
item_id
item_type
category_label
title
subtitle
price
policy
image
brand
href
payload
created_at
```

### survey_results

로그인 사용자의 도시별 설문 결과입니다.

```txt
user_id
city_code
answers
result_type
created_at
updated_at
```

`user_id + city_code` 조합을 유니크하게 관리해 같은 도시 결과는 갱신됩니다.

### booking_clicks

외부 예약 링크 클릭 로그입니다.

```txt
user_id
city_code
item_type
item_id
item_title
platform
href
section_label
created_at
```

로그인하지 않은 사용자도 클릭 로그는 저장할 수 있도록 `user_id`는 nullable입니다.

### recent_views

로그인 사용자가 최근 본 상세 항목입니다.

```txt
user_id
item_id
item_type
category_label
title
subtitle
price
policy
image
brand
href
payload
viewed_at
```

## API

백엔드 API는 기능별 route 파일로 분리되어 있습니다.

```txt
server/src/routes/authRoutes.js
server/src/routes/favoriteRoutes.js
server/src/routes/surveyResultRoutes.js
server/src/routes/bookingClickRoutes.js
server/src/routes/recentViewRoutes.js
server/src/routes/adminRoutes.js
```

요청 body는 `server/src/validation.js`에서 zod schema로 검증합니다. 잘못된 payload는 DB 저장 전에 `400` 응답으로 차단합니다.

### Health

```txt
GET /health
```

### Auth

```txt
POST /auth/signup
POST /auth/login
GET /auth/me
```

### Favorites

```txt
GET /favorites
POST /favorites
DELETE /favorites/:itemType/:itemId
```

### Survey Results

```txt
GET /survey-results/:cityCode
POST /survey-results
```

### Booking Clicks

```txt
POST /booking-clicks
```

예약 링크 클릭 시 프론트에서 로그 저장 요청을 보내고, 사용자는 외부 예약 페이지로 이동합니다.

### Recent Views

```txt
GET /recent-views
POST /recent-views
```

상세 페이지 진입 시 로그인 사용자 기준으로 최근 본 항목을 저장합니다.

### Admin

```txt
GET /admin/stats
GET /admin/stats?cityCode=tokyo&itemType=transport&range=30d
```

필터:

```txt
cityCode: tokyo | taipei | osaka | fukuoka | bangkok
itemType: transport | food | tour | stay
range: all | 7d | 30d
```

관리자 권한이 필요합니다.

## Verification

수동 QA 체크리스트:

```txt
docs/qa-checklist.md
```

프론트 빌드:

```bash
npm run build
```

서버 API 테스트:

```bash
npm --prefix server test
```

테스트는 임시 SQLite DB와 임시 로컬 서버를 사용합니다.

백엔드 health check:

```bash
curl http://127.0.0.1:4000/health
```

DB 테이블 확인:

```bash
cd server
node --input-type=module -e "import Database from 'better-sqlite3'; const db = new Database('./planp.db'); console.log(db.prepare(\"SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name\").all().map((row) => row.name).join('\\n')); db.close();"
```

## Implementation Notes

- 로그인 상태는 브라우저 `localStorage`의 `planp.accessToken`에 저장됩니다.
- 인증이 필요한 API는 `Authorization: Bearer <token>` 헤더를 사용합니다.
- 관리자 접근은 프론트 라우트와 백엔드 API 양쪽에서 제한합니다.
- 설문 결과는 `sessionStorage`로 즉시 표시하고, 로그인 사용자는 DB에도 저장합니다.
- 결과 페이지 직접 진입 시 저장된 설문 결과를 DB에서 복원합니다.
- 예약 클릭 로그는 저장 실패 여부와 관계없이 외부 링크 이동을 막지 않습니다.
- 대용량 장소 상세 데이터는 `src/data/generated/details`에서 도시/타입 단위로 분리하고, 상세 페이지 진입 시점에 동적으로 로딩합니다.

## Portfolio Highlights

### Auth and Authorization

JWT 기반 로그인 구조를 적용하고, 관리자 권한은 `users.role`로 구분합니다. `/admin` 페이지는 프론트 라우트에서 1차로 제한하고, `/admin/stats` API는 백엔드에서 다시 권한을 검증합니다.

### User Data Persistence

로그인 사용자의 관심 항목, 최근 본 항목, 도시별 설문 결과를 SQLite DB에 저장합니다. 설문 결과는 `user_id + city_code` 기준으로 관리해 같은 도시를 다시 저장하면 기존 기록을 갱신합니다.

### Booking Analytics

외부 예약 링크 클릭 시 `booking_clicks` 테이블에 도시, 카테고리, 상품명, 플랫폼, 링크를 기록합니다. 관리자 페이지는 이 데이터를 기반으로 도시별/카테고리별 예약 클릭 통계를 제공합니다.

### API Validation and Backend Structure

Express API를 기능별 route로 분리하고, zod 기반 request validation을 적용했습니다. 잘못된 요청은 DB에 접근하기 전에 차단해 API 입력 안정성을 높였습니다.

### Database Migration

DB 스키마는 `server/migrations`의 SQL 파일로 관리합니다. 서버 시작 시 아직 실행되지 않은 migration만 적용하고, 적용 이력은 `schema_migrations`에 저장합니다.

### Frontend Performance

상세 페이지는 route 단위 lazy loading을 사용하고, 대용량 장소 상세 데이터는 도시/타입별 동적 import로 분리했습니다. 기존 단일 `cityPlaceDetails` 청크 약 1MB를 여러 개의 작은 청크로 나눠 초기 로딩 부담을 줄였습니다.

## Deployment Plan

현재 프로젝트는 로컬 개발 기준으로 구성되어 있습니다. 배포 시 권장 구조는 다음과 같습니다.

```txt
Frontend: Vercel
Backend: Render, Railway, Fly.io 중 하나
Database: 초기에는 SQLite, 운영 확장 시 PostgreSQL 전환
```

배포 시 필요한 작업:

- 프론트 배포 환경변수 `VITE_API_BASE_URL`을 백엔드 URL로 설정
- 백엔드 환경변수 `JWT_SECRET`, `CLIENT_ORIGIN`, `DB_PATH` 설정
- 백엔드 CORS origin을 실제 프론트 도메인으로 제한
- 관리자 계정은 배포 후 `seed:admin` 스크립트로 생성
- 운영 DB는 SQLite 파일 영속성이 보장되는 환경이 아니면 PostgreSQL로 전환
- 실제 API 키는 Vercel/백엔드 플랫폼 환경변수에만 저장

## Current Limitations

- 백엔드는 로컬 SQLite 기반이며, 배포용 DB 구조는 별도 정리가 필요합니다.
- 쇼핑 카테고리는 준비중 화면만 제공합니다.

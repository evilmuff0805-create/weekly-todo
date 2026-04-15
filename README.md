# Weekly Todo

주간 단위로 할일을 관리하는 웹 애플리케이션입니다.

## 기능

### 현재 기능
- **주간 뷰**: 월~일 7일을 한눈에 보여주는 그리드 레이아웃
- **Todo CRUD**: 할일 추가, 완료 체크, 삭제
- **시간 설정**: Todo에 선택적으로 시간 추가
- **오늘 하이라이트**: 오늘 날짜 컬럼 시각적 강조
- **주간 네비게이션**: 이전/다음 주 이동
- **오전 9시 알림**: 하루 한 번 오늘의 할일 모달 알림
- **데이터 영속**: PostgreSQL에 저장, 30초 폴링으로 최신 상태 유지

### 추가 예정 기능
- **다크모드**: 라이트/다크 모드 토글 버튼
- **모바일 반응형**: 스마트폰 최적화 (1열 레이아웃, 터치 UI)
- **우선순위**: Todo에 높음/중간/낮음 우선순위 설정

## 기술 스택

| 구분 | 기술 |
|------|------|
| **Backend** | Node.js, Express 4 |
| **Database** | PostgreSQL |
| **Frontend** | React 18, Vite 4 |
| **Styling** | 순수 CSS (CSS 변수) |
| **배포** | Railway |

## 로컬 실행 방법

### 사전 요구사항
- Node.js 18 이상
- PostgreSQL 데이터베이스

### 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/weekly_todo
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3001
```

### Backend 실행

```bash
cd backend
npm install
npm run dev   # 개발 모드 (nodemon 자동 재시작)
# 또는
npm start     # 일반 실행
```

백엔드 서버: `http://localhost:3001`

### Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드: `http://localhost:5173`

> Vite 개발 서버가 `/api` 요청을 자동으로 `http://localhost:3001`로 프록시합니다.

## 디렉토리 구조

```
weekly-todo/
├── backend/
│   ├── db/
│   │   └── schema.sql          # PostgreSQL 스키마
│   ├── routes/
│   │   └── todos.js            # Todo API 라우터
│   ├── database.js             # DB 연결 풀
│   ├── server.js               # Express 서버
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeekView.jsx        # 주간 그리드 레이아웃
│   │   │   ├── DayColumn.jsx       # 요일별 카드
│   │   │   ├── DayHeader.jsx       # 요일/날짜 헤더
│   │   │   ├── TodoItem.jsx        # 개별 Todo 항목
│   │   │   ├── AddTodoForm.jsx     # Todo 추가 폼
│   │   │   ├── WeekNavigation.jsx  # 주간 네비게이션
│   │   │   └── NotificationModal.jsx # 9시 알림 모달
│   │   ├── hooks/
│   │   │   ├── useTodos.js         # Todo 상태 관리
│   │   │   └── useNotification.js  # 알림 트리거
│   │   ├── styles/
│   │   │   └── index.css           # 전체 스타일
│   │   ├── api.js                  # API 클라이언트
│   │   ├── App.jsx                 # 루트 컴포넌트
│   │   └── main.jsx                # React 엔트리
│   ├── index.html
│   └── vite.config.js
│
├── .harness/                   # 프로젝트 하네스 설정
│   ├── feature_list.json       # 기능 정의 목록
│   ├── claude-progress.txt     # 개발 진행 기록
│   └── prompts/                # AI 에이전트 프롬프트
│
└── README.md
```

## API 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/todos?week=YYYY-MM-DD` | 주간 Todo 조회 |
| POST | `/api/todos` | Todo 생성 |
| PUT | `/api/todos/:id` | Todo 수정 |
| DELETE | `/api/todos/:id` | Todo 삭제 |

## 데이터 모델

```json
{
  "id": 1,
  "title": "할일 제목",
  "time": "14:30",
  "todoDate": "2026-04-14",
  "completed": false,
  "priority": "medium",
  "createdAt": "2026-04-14T00:00:00Z",
  "updatedAt": "2026-04-14T00:00:00Z"
}
```

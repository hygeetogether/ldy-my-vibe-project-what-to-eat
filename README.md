# 오늘 뭐 먹지? - 메뉴 추천 웹 앱 (바이브 코딩 기말 프로젝트)

## 1. 프로젝트 설명

"오늘 뭐 먹지?"는 사용자의 현재 기분, 식사 시간(점심/저녁), 그리고 보유한 재료를 기반으로 맞춤형 메뉴와 간단한 레시피를 추천해 주는 웹 애플리케이션입니다. 바이브 코딩 실습 기말 과제로 제작되었습니다.

## 2. 주요 기능

- **Google 간편 로그인**: Firebase Authentication을 통한 사용자 인증
- **맞춤형 메뉴 추천**: 기분, 식사, 재료 기반의 메뉴 추천 요청
- **동적 결과 표시**: 추천 메뉴의 레시피(재료, 조리법)를 shadcn/ui 카드로 표시
- **'내 레시피' 저장**: 추천받은 레시피를 Firebase Firestore에 저장 (Create)
- **저장된 레시피 조회**: /my-recipes 페이지에서 본인이 저장한 레시피 목록 확인 (Read)
- **개인 메모 수정**: 저장된 레시피에 대한 개인 메모 수정 (Update)
- **레시피 삭제**: 저장된 레시피 목록에서 삭제 (Delete)

## 3. 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **데이터베이스**: Firebase (Firestore)
- **인증**: Firebase Authentication
- **개발 도구**: Gemini CLI

## 4. 설치 및 실행 방법

```bash
# GitHub 저장소 복제
git clone [Your-Repo-URL]
cd what-to-eat

# npm 패키지 설치
npm install

# .env.local 파일 생성 및 Firebase 설정 추가
# (프로젝트 루트에 .env.local 파일을 만들고 아래 내용을 채워주세요)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# 로컬 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000으로 접속합니다.

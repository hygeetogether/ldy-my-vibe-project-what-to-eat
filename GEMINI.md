🚀 프로젝트: "오늘 뭐 먹지?" 메뉴 추천 웹 앱 (기말시험 버전)

## 1. 프로젝트 개요 및 목표

사용자가 자신의 기분, 식사 시간, 현재 가지고 있는 재료를 기반으로 맞춤형 메뉴와 간단한 레시피를 추천받을 수 있는 동적 웹 애플리케이션을 제작한다. 사용자는 추천받은 레시피를 자신의 계정에 저장하고 언제든지 다시 찾아볼 수 있다.

**목표**: 최신 웹 기술 스택을 활용하여 모던하고 사용자 친화적인 UI/UX를 갖춘 빠르고 안정적인 서비스 구축. (기말시험 CRUD 요구사항 충족)

## 2. 기술 스택 (Technical Stack)

- **프레임워크**: Next.js 14+ (App Router 사용)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **데이터베이스**: Firebase (Firestore)
- **인증**: Firebase Authentication (Google 소셜 로그인)

## 3. 핵심 기능 (Core Features)

- **사용자 인증**: Firebase를 이용한 간편한 Google 로그인 기능.
- **메뉴 추천 요청**: 메인 페이지에서 사용자가 식사 종류, 기분, 재료를 입력하여 메뉴 추천을 요청하는 폼.
- **결과 표시**: 추천된 메뉴의 이름, 설명, 재료, 레시피를 보기 좋은 카드 형태로 동적 표시.
- **레시피 저장 (Create)**: 사용자가 추천받은 레시피를 자신의 계정에 저장하는 기능.
- **내 레시피 목록 (Read)**: 사용자가 저장한 레시피들을 모아볼 수 있는 별도의 페이지 (/my-recipes).
- **레시피 수정 (Update)**: 저장된 레시피에 개인 메모를 추가하거나 수정하는 기능.
- **레시피 삭제 (Delete)**: 저장된 레시피를 목록에서 삭제하는 기능.

## 4. 페이지 및 라우트 구조 (Next.js App Router)

- **/layout.tsx**: 전체 페이지의 기본 레이아웃. Navbar 컴포넌트를 포함한다.
- **/page.tsx**: 메인 페이지. 메뉴 추천을 위한 입력 폼(RecommendationForm)과 결과(RecipeCard)가 표시된다.
- **/my-recipes/page.tsx**: 사용자가 저장한 레시피 목록이 표시되는 페이지. 각 레시피를 수정(메모 등)하거나 삭제할 수 있는 기능이 포함된다.
- **/auth/page.tsx**: 로그인 페이지.

## 5. 컴포넌트 설계 (shadcn/ui 기반)

- **components/Navbar.tsx**: 웹사이트 로고/이름, '내 레시피' 링크, 로그인/로그아웃 상태를 표시하는 사용자 프로필 버튼/아바타.
- **components/RecommendationForm.tsx**: Card 컴포넌트로 전체 폼을 감싼다. Select, ToggleGroup, Input 컴포넌트를 사용한다.
- **components/RecipeCard.tsx**: 추천 결과를 표시하는 Card 컴포넌트. 메인 페이지에서는 '저장' 버튼, '내 레시피' 페이지에서는 '수정'/'삭제' 버튼을 표시한다.
- **components/EditRecipeDialog.tsx**: 레시피의 메모를 수정하기 위한 Dialog 컴포넌트. Textarea를 포함한다.

## 6. Firebase 설정 및 데이터 모델

- **Firebase 초기화**: `lib/firebase/config.ts` 파일에서 Firebase 앱을 초기화한다.
- **Firestore 데이터 모델**:
  - `users/{uid}/recipes`
    - `name`: (string) 메뉴 이름
    - `description`: (string) 메뉴 한 줄 설명
    - `ingredients`: (array) 재료 목록
    - `instructions`: (array) 단계별 레시피 설명
    - `createdAt`: (timestamp) 저장된 시간
    - `memo`: (string, optional) 사용자가 추가하는 개인 메모
- **보안 규칙**: 사용자는 자신의 `recipes` 하위 컬렉션에 대해서만 CRUD 작업을 수행할 수 있도록 설정한다.

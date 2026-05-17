# react-emotion-diary (감정 일기장)

사용자의 감정 상태와 일상을 기록할 수 있는 웹 기반 다이어리 애플리케이션입니다. React Router를 활용한 매끄러운 단일 페이지 애플리케이션(SPA) 환경을 구축했으며, Context API와 useReducer를 도입하여 복잡한 상태 관리 로직을 체계적으로 분리하는 데 집중한 프로젝트입니다.

## Links
- 배포 주소: https://react-emotion-diary-rho.vercel.app/
- GitHub 저장소: https://github.com/seokhyeon09/react-emotion-diary

## Tech Stack (사용 기술)
- Framework & Build Tool: React 19, Vite
- Language: JavaScript
- Routing: React Router DOM
- State Management: Context API, useReducer
- Storage & Hooks: LocalStorage, Custom Hooks (useTitle, useDiary)
- SEO: HTML5 Meta Tags (Open Graph)

## Key Features (주요 기능)
- 전역 상태 관리 및 로직 분리: 컴포넌트 간 복잡한 Props 전달을 방지하기 위해 Context API를 도입하여 일기 데이터를 전역에서 접근할 수 있도록 설계했습니다. 또한 useReducer를 활용해 일기의 생성(CREATE), 수정(UPDATE), 삭제(DELETE) 로직을 App 컴포넌트 외부로 완전히 분리하여 유지보수성을 극대화했습니다.
- 비휘발성 데이터 저장 (LocalStorage): 브라우저의 로컬 스토리지를 데이터베이스처럼 활용했습니다. 앱이 실행될 때 저장된 JSON 데이터를 파싱하여 초기 상태로 불러오며, 배열 형태가 아니거나 데이터가 없는 예외 상황까지 안전하게 처리하여 새로고침 후에도 데이터가 영구적으로 보존되도록 구현했습니다.
- 월별 데이터 필터링 및 시간순 정렬: 자바스크립트의 Date 객체를 세밀하게 다루어, 사용자가 선택한 해당 연도와 월(1일 0시부터 마지막 날 23시 59분까지)의 데이터만 추출하여 화면에 보여주는 필터링 기능을 구현했습니다. 또한 최신순과 오래된 순으로 일기 목록을 나열하는 정렬 로직을 추가해 사용 편의성을 높였습니다.
- 동적 라우팅 및 예외 처리 로직: useParams와 useNavigate를 활용하여 선택한 일기의 고유 ID에 따라 상세 페이지와 수정 페이지로 이질감 없이 이동합니다. 만약 존재하지 않는 일기 ID로 접근할 경우, 직접 제작한 커스텀 훅(useDiary) 내부에서 이를 감지하고 에러 메시지와 함께 홈으로 리다이렉트 시키는 방어 로직을 구축했습니다.
- 커스텀 훅(useTitle) 및 SEO 메타 태그: 페이지가 이동할 때마다 브라우저 탭의 제목이 '다이어리 홈', '새 일기 쓰기', 'N번째 다이어리' 등으로 동적으로 변하도록 useTitle 커스텀 훅을 제작했습니다. 또한 index.html에 Open Graph 메타 태그를 적용하여 소셜 공유 시 썸네일과 설명이 예쁘게 노출되도록 디테일을 살렸습니다.

## 느낀점 / 개선할 점
- 느낀점: 이전 프로젝트들에서는 useState만으로 상태를 관리했다면, 이번에는 useReducer와 Context API를 결합하여 상태 변화 로직을 따로 관리하는 진정한 의미의 '전역 상태 관리 아키텍처'를 경험해 볼 수 있었습니다.
- 개선할 점: 현재는 일기 데이터와 이미지가 모두 프론트엔드 환경과 브라우저 로컬 스토리지에 묶여 있어, 다른 PC에서 접속하면 내가 쓴 일기를 볼 수 없다는 아쉬움이 있습니다. 소셜 로그인 기능을 추가하고, 백엔드를 연결해 기기의 데이터가 실시간으로 동기화되도록 서비스의 규모를 확장해 보고 싶습니다.

## Getting Started (로컬 실행 방법)

1. 저장소 클론 (Clone the repository)
git clone https://github.com/seokhyeon09/react-emotion-diary

2. 패키지 설치 (Install dependencies)
npm install

3. 개발 서버 실행 (Run the dev server)
npm run dev

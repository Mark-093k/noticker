# noticker

Notion의 정보를 Windows 데스크톱 위젯으로 보여 주기 위한 프로젝트입니다.

## 현재 상태

- Figma Make에서 만든 UI 프로토타입을 React + TypeScript 소스로 보존합니다.
- Focus Tasks, Calendar, Recent Pages 위젯의 라이트/다크·전체/컴팩트·상태별 화면이 포함되어 있습니다.
- 아직 실제 Notion API 연동이나 Windows 네이티브 위젯 컨테이너는 구현되지 않았습니다.

## 프로젝트 구조

- `src/app/App.tsx` — 위젯 UI 프로토타입
- `src/styles/` — Tailwind CSS와 테마 토큰
- `src/imports/` — 프로토타입 이미지 자산
- `guidelines/` — Figma 디자인 시스템 가이드
- `vite.config.ts` — 현재 UI 패키지 빌드 설정

원본 `src.zip`, `guidelines.zip`과 GitHub Desktop 설치 파일은 소스 저장소에 올리지 않습니다. 압축을 푼 실제 소스와 필요한 이미지 자산만 추적합니다.

## 개발 준비

```bash
npm install --include=dev
npm run build
```

`NODE_ENV=production`인 환경에서도 빌드 도구가 설치되도록 `--include=dev`를 사용합니다.

## 다음 개발 단계

1. UI 프로토타입을 실행 가능한 Windows 앱 셸(Tauri, Electron 등)에 연결
2. Notion OAuth 및 API 데이터 계층 구현
3. 위젯별 설정, 새로고침, 오프라인 캐시 구현
4. Windows 시작 프로그램·창 위치 저장·패키징 지원

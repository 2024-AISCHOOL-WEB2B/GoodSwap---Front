# GoodSwap---Front

"K-pop 팬들이 다른 팬들과 즐겁게 소통하고, 독특한 팬메이드 상품을 발견하며 안전한 환경에서 구매할 수 있는 커뮤니티 기반 플랫폼입니다."

## GoodSwap: React + TypeScript + Vite + Jotai + Tailwind CSS

## **주의**

이 프로젝트는 웹개발을 막시작한 햇병아리가 작성한 문서이기 때문에 수많은 내용들이 오류가 있거나 전문가들이 보시기에 부족한 내용이 있을 수 있음을 미리 알려드리오니 그 점 감안해주시고 읽어주시기를 부탁합니다. 틀린 내용이나 첨언해주실 내용이 있다면 피드백 언제나 적극 환영입니다. 감사합니다.

해당문서는 GoodSwap 프로젝트에서 **React**, **TypeScript**, **Vite**를 사용하여 구성된 프론트엔드 환경에 관한 것으로, 상태 관리를 위해 **Jotai**를, 스타일링을 위해 **Tailwind CSS**를 사용합니다. 협업 개발 워크플로우에 최적화되어 있으며, 의존성 관리를 위해 **PNPM**을 사용합니다.

## 시작하기

### 사전 준비 사항

프로젝트를 시작하기 전, 로컬 환경에 **Node.js** (버전 16 이상)와 **PNPM**이 설치되어 있어야 합니다:

- **Node.js**: [Node.js 설치 가이드](https://nodejs.org/)
- **PNPM**: [PNPM 설치 가이드](https://pnpm.io/installation)

### 프로젝트 설정

1. **레포지토리 클론**:

   ```bash
   git clone <your-repo-url>
   cd goodswap
   ```

2. **의존성 설치**:

   ```bash
   pnpm install
   ```

3. **개발 서버 실행**:

   ```bash
   pnpm run dev
   ```

4. **프로젝트 빌드**:

   ```bash
   pnpm run build
   ```

5. **빌드 결과 미리보기**:

   ```bash
   pnpm run preview
   ```

### 개발 노트

- 이 프로젝트는 Vite를 빌드 도구로 사용하여 빠른 개발 속도를 제공합니다.
- 상태 관리는 Jotai를 사용하며, 관련된 상태 관리는 src/atoms 디렉토리에 정의되어 있습니다.
- Tailwind CSS가 설정되어 있으며, tailwind.config.js 파일을 통해 커스터마이징 할 수 있습니다.
- ESLint는 코드 린팅을 위해 설정되어 있으며, TypeScript, React, Tailwind CSS에 대한 추천 규칙을 따릅니다. VSCode의 ESLint 확장 프로그램을 설치하면 더 나은 개발 경험을 얻을 수 있습니다.

### 환경변수

API 키와 같은 민감한 정보를 관리하기 위해 환경 변수를 사용하는 것이 좋습니다. 프로젝트 루트에 .env 파일을 생성하고 .env.example 파일을 참고하여 설정하세요:

VITE_API_URL=<https://your-api-url.com>

VITE_ANOTHER_KEY=your-key-here

### ESLint 설정

ESLint는 eslint.config.js 파일에서 설정되어 있으며, TypeScript, React, Tailwind CSS에 대한 추천 규칙을 포함합니다. Prettier를 사용하여 코드 포맷팅과 린팅을 일관되게 유지하고 있습니다.
**코드 린트**:

```bash
pnpm run lint
```

### 추가 명령어

**CSS 빌드**:

```bash
pnpm run build:css
```

Tailwind와 autoprefixer를 사용하여 CSS 파일을 컴파일합니다.

### 권장 VS Code 확장 프로그램

팀의 코드 일관성을 위해 다음 VS Code 확장 프로그램 설치를 권장합니다.

1. **ESLint**:
   - 코드 내에서 자동으로 ESLint 규칙을 검사하여 코드 품질을 유지합니다.
   - 프로젝트에 맞는 ESLint 설정을 활용하여 TypeScript와 React 코드의 일관성을 유지합니다.
2. **Prettier - Code formatter**:
   - 코드 포맷팅을 자동화하여 일관된 코드 스타일을 유지합니다.
   - Tailwind CSS와 함께 사용할 때 유용하며 코드 스타일을 자동으로 맞춰줍니다.
3. **Tailwind CSS IntelliSense**:
   - Tailwind CSS 유틸리티 클래스의 자동 완성과 문서화 기능을 제공하여 빠르고 정확하게 스타일을 적용할 수 있도록 도와줍니다.
4. **Jotai** 관련 설정:
   - Jotai를 사용하는 프로젝트에서는 별도의 타입 정의가 필요 없으므로 추가 확장 프로그램이 필요하지 않습니다.
5. **React** (ES7+ React/Redux/React-Native snippets):
   - React와 관련된 다양한 코드 스니펫을 제공하여 코드 작성을 빠르게 도와줍니다.
6. **Auto Rename Tag**:
   - HTML/JSX 태그의 이름을 변경할 때 시작 태그와 종료 태그가 자동으로 함께 변경되도록 도와줍니다.
7. **Auto Close Tag**:
   - HTML/JSX 태그를 작성할 때 자동으로 닫는 태그를 생성해줍니다.
8. **GitLens**:
   - 코드 변경 내역을 추적하고 Git 히스토리를 확인할 수 있어, 협업 시에 유용합니다.
9. **Path Intellisense**:
   - 파일 경로를 자동으로 완성해주는 기능을 제공하여, 빠르고 정확한 파일 접근을 도와줍니다.
10. **EditorConfig for VS Code**:
    - 팀 내의 코드 스타일을 유지하기 위해 EditorConfig 파일을 기반으로 코드 스타일을 자동으로 적용합니다.
11. **GitHub Theme (선택사항)**:
    - GitHub 스타일의 테마를 적용하여, 프로젝트 작업 시 익숙한 환경을 제공합니다.

### 중요사항

- 작업을 시작하기 전에 항상 레포지토리에서 최신 변경 사항을 가져와 충돌을 방지하세요.
- 새로운 의존성이 추가되었을 때는 pnpm install을 실행하여 환경을 최신 상태로 유지하세요.

## FSD (Feature-Sliced Design) 규칙 정리

FSD 아키텍처는 기능과 데이터 구조를 명확하게 분리하여 유지보수와 확장성을 높이는 것을 목표로 하는 아키텍처 패턴입니다. 이 패턴을 적용하여 팀 프로젝트를 관리할 때 다음과 같은 규칙과 폴더 구조를 따릅니다

## 메인 폴더 구조

프로젝트의 메인 폴더 구조는 다음과 같이 나눕니다:

- **app**
- **pages**
- **widgets**
- **features**
- **entities**
- **shared**
  각 폴더는 명확한 역할을 가지고 있으며, 임포트 규칙을 통해 계층적 의존성을 관리합니다.

### 1. `app`

- `app`은 프론트엔드 애플리케이션의 **전체적인 설정**을 담당하는 디렉토리입니다.
- 예를 들어 **브라우저 라우터**, **Jotai의 프로바이더**와 같이 애플리케이션 전반에서 필요한 전역적인 설정이나 감싸주는 컴포넌트들이 여기에 위치합니다.
- `app`은 전역 컴포넌트로서, **루트 설정**을 관리하며 애플리케이션의 **root**로 감싸주는 역할을 합니다.

### 2. `pages`

- `pages`는 **브라우저 주소 단위**의 컴포넌트를 의미합니다.
- 페이지 단위의 컴포넌트를 다루며, 브라우저 라우팅에 따라 전환되는 각각의 페이지를 정의합니다. 각 페이지는 `features`, `widgets`, `entities`, `shared`에서 정의된 요소들을 조합하여 구현합니다.

### 3. `widgets`

- `widgets`는 **UI 레이아웃과 공통된 UI 패턴**을 담당합니다.
- 로그인 폼, 회원가입 폼, 비밀번호 재설정 폼 등 **동일한 구조**를 가지며 내용물만 바뀌는 UI를 `widgets`로 분류할 수 있습니다. 이때, **공통 레이아웃**은 `widgets`에, 구체적인 내용물과 동작은 `features`로 나눕니다.
- `widgets`는 `features`의 **구성 요소**가 되거나, 특정 레이아웃이나 페이지에서 재사용될 수 있는 **공통된 UI 레이아웃**으로 사용됩니다. **예시로 로그인 폼의 레이아웃**을 `widgets`로 정의하고, API 호출 로직은 `features`에 정의합니다.
- 이 디렉토리는 `pages` 다음 계층에 위치하며, **UI의 구조적 패턴**을 관리합니다.

### 3. `entities`

- `entities`는 **데이터와 명사**에 해당하는 요소들을 다루는 디렉토리입니다.
- 예를 들어 **재사용 가능한 데이터 모델**, **API와의 연동을 통해 불러오는 데이터**, 또는 해당 데이터에 맞는 **UI 컴포넌트**가 위치합니다.
- `entities`는 데이터에 의존적이며, 주로 **상태와 데이터 중심의 UI 요소**를 정의합니다. 예를 들어, 깃허브의 `Pin` 버튼에서 **아이콘과 텍스트**는 `entities`에 속합니다.
- `entities`는 기존의 `components`와 유사하지만, **데이터 모델과 구조적 요소**에 더 초점을 맞춥니다.

### 4. `features`

- `features`는 **기능 중심**의 디렉토리입니다. 특정 액션을 수행하는 **기능 모듈**들이 이곳에 위치합니다.
- 예를 들어, 사용자가 버튼을 클릭했을 때 발생하는 동작이나 API 호출, 입력 검증 로직 등이 여기에 포함됩니다.
- **기능별로 독립적**이며 재사용성이 높아야 합니다. 예를 들어, 깃허브의 `Pin` 버튼에서 **핀 동작을 처리하는 로직**은 `features`에 위치합니다.
- `features`는 UI 레이아웃과 기능을 조합하여, 특정 **비즈니스 로직**을 구현하는 부분으로 구성됩니다.

### 5. `entities`

- `entities`는 **데이터와 명사**에 해당하는 요소들을 다루는 디렉토리입니다.
- 예를 들어 **재사용 가능한 데이터 모델**, **API와의 연동을 통해 불러오는 데이터**, 또는 해당 데이터에 맞는 **UI 컴포넌트**가 위치합니다.
- `entities`는 데이터에 의존적이며, 주로 **상태와 데이터 중심의 UI 요소**를 정의합니다. 예를 들어, 깃허브의 `Pin` 버튼에서 **아이콘과 텍스트**는 `entities`에 속합니다.
- `entities`는 기존의 `components`와 유사하지만, **데이터 모델과 구조적 요소**에 더 초점을 맞춥니다.

### 6. `shared`

- `shared`는 프로젝트 전반에서 **공유되는 요소들**이 위치하는 디렉토리입니다.
- 예를 들어, **공용으로 사용하는 hooks, styles, utils, 혹은 공용 components**가 여기에 포함됩니다.
- 이 디렉토리의 요소들은 프로젝트의 어느 부분에서든 사용할 수 있도록 설계됩니다.
- `shared`는 다른 상위 모듈에서 자유롭게 임포트될 수 있으며, 전체적인 계층 구조에서 가장 아래에 위치하여 다른 모듈들이 공유 요소를 사용할 수 있게 합니다.

---

## Import Hierarchy (임포트 계층)

FSD 구조를 지키기 위해 각 디렉토리 간의 **임포트 계층**을 다음과 같이 정리합니다:

- `app` 디렉토리에서는 자신을 제외한 `pages`, `widgets`, `features`, `entities`, `shared` 폴더를 임포트할 수 있습니다.
- `pages`에서는 `app`을 제외한 `widgets`, `features`, `shared`, `entities`를 임포트할 수 있습니다.
- `widgets`에서는 `features`, `entities`, `shared`를 임포트할 수 있지만, 반대로 `features`가 `widgets`를 임포트하는 것은 불가능합니다.
- `features`에서는 `entities`와 `shared`를 임포트할 수 있지만, `widgets`를 임포트할 수 없습니다.
- `entities`와 `shared`도 `widgets`을 임포트하는 것은 불가능합니다.
  이 계층 구조를 통해 **모듈의 의존성**이 상위 계층에서 하위 계층으로만 흐르도록 하여 결합도를 낮추고 유지보수를 용이하게 합니다.

---

## Slices와 Segments

- 각 폴더는 **특성에 따라 slices로 구분**될 수 있습니다. 예를 들어 `entities`나 `features`는 프로젝트의 도메인이나 기능에 따라 세분화할 수 있습니다.
- `shared`의 경우에는 **도메인에 종속적이지 않기 때문에** slices로 구분하지 않고 **역할별로 segments**로 구분합니다. 예를 들어, `shared/hooks`, `shared/styles`, `shared/utils`와 같은 방식으로 나누어 관리합니다.

---

## `index.ts`의 적극적인 사용

- 각 디렉토리 내에서 `index.ts` 파일을 적극적으로 사용하여 모듈을 **캡슐화**합니다.
- 예를 들어, `components`라는 폴더 내에 `index.ts`를 만들어 외부로 공유하고 싶은 컴포넌트들만 `export`합니다. 이를 통해 외부에서 필요한 부분만 임포트할 수 있도록 제한합니다.
- 임포트 시에는 **`index.ts`가 암묵적으로 처리되므로** `import { eachDM } from './components/eachDM'`처럼 경로에서 `index.ts`를 생략해도 됩니다.
- 이 규칙을 통해 불필요한 노출을 방지하고, 모듈의 의존성을 명확하게 관리할 수 있습니다.

---

이렇게 정리된 FSD 구조와 규칙은 프로젝트의 유지보수성을 높이고, 모듈화된 구조를 통해 협업 시 의존성 문제를 최소화합니다.
하지만 이런 FSD 구조는 규모가 점점 확장되는 프로젝트에 적합할 수 있다고 볼 수 있어 저희 팀프로젝트에서는 다음과 같이 축소된 구조를 사용하려고 합니다.

## 축소된 FSD 구조 예시

```bash
src/
│
├── app/ // 전체 설정과 전역 컴포넌트
│ ├── providers/ // Jotai, React Router 등 설정 파일들
│ ├── Router.tsx // 전체 라우팅을 담당하는 컴포넌트
│ └── index.tsx // 앱 초기화와 프로바이더 설정
│
├── pages/ // 라우트 단위 페이지 컴포넌트
│ ├── Home/ // 메인 페이지
│ │ ├── Home.tsx
│ │ └── index.ts
│ ├── Login/ // 로그인 페이지
│ │ ├── Login.tsx
│ │ └── index.ts
│ └── ArtistBoard/ // 아티스트별 게시판
│ ├── ArtistBoard.tsx
│ └── index.ts
│
├── widgets/ // 공통 UI 레이아웃 컴포넌트
│ ├── Form/ // 로그인, 회원가입 폼 레이아웃
│ │ ├── FormLayout.tsx
│ │ └── index.ts
│ ├── CommentSection/ // 댓글 섹션
│ │ ├── CommentSection.tsx
│ │ └── index.ts
│ └── index.ts // 전체 위젯들을 한곳에서 내보내기
│
├── features/ // 동작 단위 기능 컴포넌트
│ ├── Login/ // 로그인 기능 관련 로직
│ │ ├── LoginForm.tsx
│ │ └── useLogin.ts
│ ├── Register/ // 회원가입 기능
│ │ ├── RegisterForm.tsx
│ │ └── useRegister.ts
│ ├── Payment/ // 결제 기능
│ │ ├── PaymentForm.tsx
│ │ └── usePayment.ts
│ └── index.ts // 기능별 모듈을 모아 내보내기
│
├── entities/ // 데이터 관련 컴포넌트
│ ├── User/ // 유저 관련 데이터 모델
│ │ ├── User.tsx
│ │ └── index.ts
│ ├── Product/ // 굿즈 관련 데이터
│ │ ├── Product.tsx
│ │ └── index.ts
│ └── Comment/ // 댓글 데이터
│ ├── Comment.tsx
│ └── index.ts
│
├── shared/ // 공용 모듈 (hooks, utils, styles 등)
│ ├── hooks/ // 공용 React Hooks
│ │ ├── useAuth.ts
│ │ └── useLocalStorage.ts
│ ├── styles/ // 공용 스타일 및 Tailwind 설정
│ ├── utils/ // 유틸리티 함수 모음
│ └── index.ts // 공용 모듈 내보내기
│
└── atoms/ // Jotai의 전역 상태 관리
├── auth.ts // 로그인 상태 atom
└── index.ts // atoms 모듈을 한곳에서 관리
```

## License

This project is licensed under the MIT License.

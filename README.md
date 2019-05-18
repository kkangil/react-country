# 국가 정보 확인 프로젝트

## How to start
- 개발환경
```
$ yarn | $ npm i
$ yarn start | $ npm run start
```

- 배포
```
$ yarn | $ npm i
$ yarn build | $ npm build
$ node app.js
```

## webpack
- build 시 public 폴더 내부에 bundle.js 생성
- polyfill.js 에서 구 버전 브라우저 지원하지 않는 문법 polyfill 추가 (Object.entries, Array.from) -> entry 에 추가
- alias 를 사용하여 파일을 import 할때 경로 길이 최소화
- babel-loader 사용 : spread 문법, arrow function 지원을 위해 plugin 추가
- style-loader, css-loader, sass-loader 사용

## 폴더 구조
### component
- 화면을 그려주는 역할
- 단순히 데이터를 받아 화면만 그리므로 함수형 컴포넌트 사용

### container
- component(view)와 store를 이어주는 역할
- 기능 구현, store 액션을 실행하기전 처리해줘야 하는것이 있다면 처리

### fetchActions
- `axios` API 호출 함수 저장

### store
- `modules` 폴더 내에 store를 생성 -> `modules/index.js` 에서 combineReducer 처리 -> `index.js` 파일에서 불러서 사용
- `actionCreators` 파일에서 store의 액션을 가져와서 store 별로 묶어 액션 생성

### style
- `styled-components` 라이브러리 사용 style

### utils
- 프로젝트 여러곳에서 사용될 수 있는 기능들을 모아두는 폴더

## 사용 기술
### redux
- `bindActionCreators` 를 사용하여 store 액션 사용 -> store가 많아졌을때 명시적으로 사용할 수 있어 가독성이 높다고 생각함.
- `redux-actions` 라이브러리를 사용하여 액션 컨트롤
### redux middleware
- `redux-thunk`를 사용하여 비동기로 API 호출
### styled-component
- `styled-component`를 사용하여 css 구현
### axios
- API 호출에 해당 라이브러리 사용
### core-js
- 크로스브라우징을 위해 `src/index.js`에 `map`, `set`, `promise` 파일 불러옴

## 요구 사항
### 리스트 정렬
- 검색 결과를 정렬하여 해당 기능 구현
### 통합 검색
- 전체 데이터와 검색 결과 데이터를 따로 저장하여 전체 데이터를 기반으로 새로운 검색 결과 도출
- 대소문자 구분 x , 컬럼의 값과 부분적으로 일치하는 값이 있으면 검색 결과로 표시
- `lodash`의 debounce 기능을 사용하여 검색어 입력 완료시 0.3 초 후 검색
### 데이터 삭제
- 전체 데이터와 검색 결과 데이터에서 선택된 데이터 삭제
### 데이터 추가
- `Formik`과 `Yup` 라이브러리를 사용하여 구현
- custom 으로 `Yup` validation 추가(중복 코드, 수도, 이름, 전화번호 검증)
### scroll pagination
- 최초 50개의 데이터만 화면에 그려줌. 이후 스크롤이 끝나는 시점에 50개 씩 새로운 데이터를 그려줌
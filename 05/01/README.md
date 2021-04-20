# HTTP 요청

## 적합한 HTTP API를 선택하는 방법

- 호환성

IE 지원이 중요하다면 axios나 XMLHttpRequest를 사용해야한다. axios에서 IE11을 지원하지만 그 이전 버전의 경우 XMLHttpRequest를 사용하자. 또한 Fetch API를 IE에서 사용하고 싶다면 폴리필을 추가하자.

- 휴대성

FetchAPI와 XMLHttpRequest는 브라우저 환경에서만 지원한다 nodejs 및 리액트 네이티브 환경이라면 axios를 고려하자.

- 보안

axios에는 기본적으로 교차 사이트 요청위조나 CSRF에 대한 보호 시스템이 내장되어있다. FetchAPI와 XMLHttpRequest의 경우 직접 구현해줘야한다.

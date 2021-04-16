/*
  XMLHttpRequest는 W3C가 비동기 HTTP 요청의 표준 방법을 정의한 첫 번째 시도

  1. 새로운 XMLHttpRequest 객체 생성(new XMLHttpRequest는())
  2. 특정 URL로 요청 초기화(xhr.open(method, url))
  3. 요청(헤더 설정, 타임아웃) 구성
  4. 요청 전송(xhr.send(JSON.stringify(body)))
  5. 요청이 끝날 때까지 대기
    a. 요청이 성공적으로 끝나면 onload 콜백 호출
    b. 요청이 오류로 끝나면 onerror 콜백 호출
    c. 요청이 타임아웃으로 끝나면 ontimeout 콜백 호출
 */

/*
 * @params {XMLHttpRequest}
 * @params {Object}
 */
const setHeaders = (xhr, headers) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;
    xhr.setRequestHeader(name, value);
  });
};

/*
 * @params {XMLHttpRequest}
 */
const parseResponse = (xhr) => {
  // 상태코드와 결과 문자열
  const { status, responseText } = xhr;

  let data;

  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return { status, data };
};

/*
 * @params {Object}
 */
const request = (params) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const { method = "GET", url, headers = {}, body } = params;

    // xhr 준비(세팅)
    xhr.open(method, url);
    setHeaders(xhr, headers); // 헤더 설정

    xhr.send(JSON.stringify(body)); // 바디 내용을 문자열로 보내기

    // 오류
    xhr.onerror = () => {
      reject(new Error("HTTP Error"));
    };

    // 타임아웃
    xhr.ontimeout = () => {
      reject(new Error("Timeout Error"));
    };

    // 완료 요청
    xhr.onload = () => resolve(parseResponse(xhr));
  });

const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

const post = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "POST",
    body,
  });

  return response.data;
};

const put = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PUT",
    body,
  });

  return response.data;
};

const patch = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PATCH",
    body,
  });

  return response.data;
};

const deleteRequest = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "DELETE",
  });

  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};

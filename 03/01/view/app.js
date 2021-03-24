// 루트 view
let template; // 왜 별도 변수로 빼는걸까? 이유가 있겠지?

const createAppElement = () => {
  if (!template) {
    template = document.getElementById("todo-app"); // 변수에 template이 없다면 템플릿 문자열 가져오기
  }

  return template.content.firstElementChild.cloneNode(true); // 템플릿 결과(DOM 요소)
};

// root dom
export default (targetElement) => {
  const newApp = targetElement.cloneNode(true); // 복제
  newApp.innerHTML = ""; // 초기화
  newApp.appendChild(createAppElement()); // 실행 결과
  return newApp;
};

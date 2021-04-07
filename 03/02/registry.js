// 레지스트리
const registry = {};

// view function
const renderWrapper = (component) => {
  // dom / 상태 / 이벤트
  return (targetElement, state, events) => {
    // 클로저
    const element = component(targetElement, state, events);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      // target -> dom element
      const name = target.dataset.component; // component 이름 가져오기

      const child = registry[name]; // 레지스트리에서 조회
      if (!child) {
        // 레지스트리에 없으면 무시
        return;
      }

      target.replaceWith(child(target, state, events)); // 레지스트리에 view 함수에 값 전달
    });

    return element;
  };
};

// 레지스트리 등록, 이름 / view function
const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

// 기본 render 함수
const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => {
    // 루트 노드 복제
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};

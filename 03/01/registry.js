const registry = {}; // 레지스트리 객체

/*
 * @params {function}
 * @description
 입력받은 component는 아래 모양

 export default (targetElement, { todos }) => {

 });
 */
const renderWrapper = (component) => {
  return (targetElement, state) => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll("[data-component]"); // 구성 요소

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) { // 레지스터에 등록되지 않았다면 무시
        return;
      }

      target.replaceWith(child(target, state));
    });

    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component); // return 결과는 return (targetElement, state) => { }
};

// 최상위 DOM, 상태
const renderRoot = (root, state) => {
  const cloneComponent = (root) => { // 성능 향상을 위한 복제 함수
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
};

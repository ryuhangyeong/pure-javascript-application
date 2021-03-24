# 순수 자바스크립트로 구현하기

> 당신이 필요하다고 예측할 때가 아니라 실제로 필요할 때 구현하라!

## 이벤트 부착하기

1. `onclick`

동일한 이벤트를 선언하면 추가되는 것이 아닌 덮어쓴다.

2. `addEventLinster`

동일한 이벤트를 선언하면 추가된다. 이벤트를 부착한 DOM이 사라진 경우 메모리 누수 방지를 위해 `removeEventListener`을 사용한다. 이때 해당 메서드로 전달할 수 있도록 함수 참조를 저장해두어야 한다.

## 이벤트 객체

`e` 부착한 이벤트에 대한 정보를 가지고 있는 객체.

- `e.target` - 이벤트를 부착한 DOM 요소 내 클릭한 요소에 대한 정보
- `e.currentTarget` - 이벤트를 부착한 DOM 자체

## DOM 이벤트 라이프 사이클

```js
button.addEventListner("click", handler, false);
```

세 번째 매개변수는 `useCapture`라고 불리며 기본값은 false이다. 만약 **true**로 하면 무슨 일이 일어날까?

```html
<body>
  <div>
    This is a container
    <button>Click Here</button>
  </div>
</body>
```

```js
const button = document.querySelector("button");
const div = document.querySelector("div");

div.addEventListener(
  "click",
  () => {
    console.log("Div Clicked");
  },
  false
);

button.addEventListener(
  "click",
  (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    console.log("Button Clicked");
  },
  false
);
```

이 코드는 이벤트 버블 단계로 인해서 하위에서 상위로 이벤트가 전파되어 두 이벤트 모두 실행된다. 이를 앞서 말한대로 이벤트 버블이라고 한다.

이벤트 버블을 중지하려면 `e.stopPropagation` 메서드를 사용하여 방지할 수 있다.

경우에 따라 이 테크닉도 유용하지만 대부분의 경우 이벤트 버블을 이용한 `이벤트 위임 패턴`을 더 많이 사용한다. 이는 추후에 자세히 알아보자.

`useCapture`를 **true**로 하여 이벤트 전파 방향을 바깥에서 안쪽으로 변경할 수 있다. 즉, 버블 단계 대신 캡처 단계로 실행된다.

true인 경우 버블 단계 대신 캡처 단계에 이벤트 핸들러를 추가한다.
버블단계에서는 핸들러가 상향식으로 처리되는 반면 캡처 단계에서는 반대로 처리된다. 시스템은 `<html>`태그에서 핸들러 관리를 시작하고 이벤트를 트리거한 요소를 만날때 까지 내려간다. 생성된 모든 DOM 이벤트에 대해 브라우저는 캡처 단계를 실행한 다음 버블 단계를 실행한다는 것을 명심하자.

1. 캡처 단계: 이벤트가 HTML에서 목표 요소로 이동한다.
2. 목표 단계: 이벤트가 목표 오소에 도달한다.
3. 버블 단계: 이벤트가 목표 요소에서 HTML로 이동한다.

기본적으론 버블 단계 핸들러만 알아도 좋지만 복잡한 상황을 관리하기 위해 캡처 단계도 알면 좋다.

## 사용자 정의 이벤트

앞서 다양한 이벤트를 다뤘다. DOM 이벤트 API는 사용자 정의 이벤트를 정의하고 다른 이벤트처럼 DOM에 부착하여 사용할 수 있다. `CustomEvent`를 사용하자.

```js
const EVENT_NAME = "FiveCharInputValue";
const input = document.querySelector("input");

input.addEventListener("input", () => {
  const { length } = input.value;

  if (length === 5) {
    const time = new Date().getTime();
    const event = new CustomEvent(EVENT_NAME, {
      detail: {
        time,
      },
    });

    input.dispatchEvent(event);
  }
});

input.addEventListener(EVENT_NAME, (e) => {
  console.log(e.detail);
});
```

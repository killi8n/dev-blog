---
title: "Debounce vs Throttle 무엇을 써야 할까?"
spoiler: "어떤 상황에 무엇을 써야 할까?"
date: "2020-03-20"
---

목차

1. Debounce
2. Throttle
3. 결론
4. 예시
5. CodePen 설명들
6. 참고 자료들

# Debounce vs Throttle 무엇을 써야 할까?

전제: 500ms 를 시간 기준으로 잡음

### 1. Debounce

```
첫 이벤트를 트리거 시킨후,
500ms 안에 동일 이벤트가 계속 들어올시
가장 마지막에 이벤트가 트리거되는 시점을 계속 연장시킨다.
```

### 2. Throttle

```
첫 이벤트를 트리거 시킨후,
500ms 안에 동일 이벤트가 계속 들어올시
500ms 안에서 제일 마지막 이벤트가 실행이 된다.
하지만 그 이후 500ms 에 들어오는 이벤트도 순차적으로 마지막 것을 계산하여 트리거 시킨다.
```

### 3. 결론

버튼을 여러번 눌렀을때 제일 마지막것만 실행하고싶다면?

- debounce

무한스크롤링과 같은 연속적으로 사용자가 유발하는 이벤트들을 성능부하가 예상되어 <br />
일정시간마다 실행시키고싶다면?

- throttle

### 4. 예시

가령 다음과 같은 시나리오가 있다고 해봅시다.

1. 사용자가 버튼을 누를때마다 다이얼로그를 띄우고 싶은데,<br/>누르는 시간에 일정한 제한을 두고싶다.<br />
   `이럴때에는 debounce를 쓰는 것이 맞습니다.`

2. 사용자가 지도스크린에서 스와이프 할때마다 지도에 찍힌 pin을 바꿔주어야 한다.<br />성능 부하가 걱정되어 일정 시간마다만 pin을 업데이트 하고싶다.<br />
   `이럴때에는 throttle을 쓰는 것이 맞습니다.`

3. 사용자가 검색을 하는데, API를 사용자의 검색 타이핑이 모두 끝난후<br />일어나게 하고싶다.<br />
   `이럴때에도 debounce를 쓰는 것이 맞습니다.`

### 5. CodePen 설명들

https://codepen.io/jaehee/pen/XoKeRW <br/>
`이것은 debounce가 어떻게 실행되는지를 가시적으로 잘 나타낸 코드펜 자료입니다.`

https://codepen.io/jaehee/pen/GPqOaK <br />
`이것은 클라이언트의 리사이징이 일어날때 debounce를 쓴 예시 코드입니다.`

https://codepen.io/jaehee/pen/JwKMGw <br />
`이것은 검색 API를 실행할때에 debounce를 쓴 예시 코드입니다.`

https://codepen.io/jaehee/pen/jXrYQz <br />
`debounce와 throttle을 잘 비교한 예시 코드입니다.`

### 6. 참고 자료들

https://webclub.tistory.com/607

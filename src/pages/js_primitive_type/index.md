---
title: "Javascript's Primitive Type"
date: "2020-01-19"
spoiler: "Js Primitive Type"
---

# 내장 자료형

모든 언어들에는 내장 자료형이 있다.
그러나 이러한 내장 자료형은 언어마다 다르다.

# 동적 타이핑

자바스크립트는 강타입 언어가 아닌, 약타입 언어이다.
그말은 변수의 타입을 미리 선언할 필요가 없다는 것이다.
또한 같은 변수에 여러 타입을 넣을수 있다는 것.

# 기본 자료형 (Primitive Type)

JS는 7개의 기본 자료형을 소유하고있다.

1. Boolean
2. Null
3. Undefined: 값이 할당되지 않은 변수
4. Number
5. String
6. Symbol (ECMAScript 6 에 추가됨): 유일하고 변경 불가능한 기본값. 객체 속성의 key값으로도 사용 가능
7. Object

Object를 제외한 기본 자료형들은 모두 immutable 하다.

# 객체 (Object)

## 속성

1. Value: get 으로 접근되는 반환값 (default: undefined)
2. Writable: (default: false)
3. Enumerable: for...in 루프에서 열거 될 수 있는가 (default: false)
4. Configurable: false -> 제거 될수 없는 속성 (default: false)

## 접근자 속성

get, set.
값을 가져오거나,
값을 저장하거나.

1. Get
2. Set
3. Enumerable
4. Configurable

# 배열 (Arrays)

배열은 객체이다.
정수 키를 가지는 일련을 값들을 표현하기 위한 객체.

.length 속성은 Writable -> false

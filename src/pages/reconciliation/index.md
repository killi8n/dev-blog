---
title: "React - Reconciliation"
spoiler: "react reconciliation"
date: "2020-02-14"
---

# 재조정 (Reconciliation)

목차

1. virtual dom

2. virtual dom의 작동 원리

3. render 함수

4. render 함수 실행 시기

5. 재조정

## virtual dom

Virutal DOM(VDOM)

UI의 가상 적인 표현을 메모리에 저장하고, ReactDOM 과 같은 라이브러리에 의해 실제 DOM과 동기화 하는 DOM.
이러한 일련의 과정을 재조정(Reconciliation) 이라고 한다.

React에게 바꾸고자 하는 UI의 상태를 알려주면, DOM이 그 상태와 일치하도록 한다.
이러한 방식은 attribute 조작, 이벤트 처리, 수동 DOM 업데이트를 추상화 한다.

## virtual dom의 작동 원리

(webkit) 브라우저의 작동 원리

DOM -> Parse HTML -> DOM Tree -> Parse CSS -> Attachment -> Render Tree (Layout) -> Painting -> Display

1. DOM Tree 생성

HTML을 전달받은 브라우저가 HTML을 파싱하고, DOM 노드로 이루어진 트리를 만든다.

2. Render Tree 생성

CSS 파일과 각 Element들의 inline 스타일을 파싱.
스타일 정보를 참고하여 DOM Tree 에 따라 새로운 Tree와 Render Tree를 생성한다.

3. Attachment

Webkit 에서는 노드의 스타일을 처리하는 과정을 attachment 라고 부른다.
DOM Tree의 모든 노드들은 attach 라는 메서드가 있다.
이 메서드는 스타일정보를 계산해서 객체형태로 반환한다.

이 과정은 동기적 작업. DOM Tree에 새로운 노드가 추가되면 그 노드들의 attach 메서드가 실행된다.

렌더 트리를 만드는 과정에서는 각 요소들의 스타일이 계산된다.
이 계산 과정에서는 다른 요소들의 스타일 속성을 참조한다.

4. Layout (reflow)

Render Tree가 만들어지고 나면, 레이아웃 과정을 거친다.
각 노드들은 스크린의 좌표가 주어지고, 정확히 어디에 나타나야 할지 위치가 주어진다.

5. Painting

렌더링된 요소에 색을 입히는 작업이다.
트리의 각 노드들을 거쳐가며 paint() 메소드를 호출.
스크린에 원하는 정보가 나타남.

Virtual DOM은 이러한 리플로우 과정의 연산이 복잡 해질때에를 대비하여 나온 가상의 돔이다.
DOM에 변화가 생기고, 렌더를 다시 할때마다, 스타일링이 새로 계산되는 작업들이 많아 질수록 버거운 작업이 되기에,

기존 DOM에 변화가 있다면, Virtual DOM을 사용하여 변화 있는 부분을 적용하여 DOM을 새로 생성한뒤,
그 결과를 기존의 DOM에 전달 해 주는 방식이다.

이로써 브라우저의 리플로우 처리 과정이 개선되며 성능이 좋아진다.

Virtual DOM은 렌더링이 되지 않는 가상의 돔이다. 그리고 그 Virtual DOM의 최종 결과를 실제 DOM에다가 던져주는 작업이다.
딱 한번만 하는 것이다. 모든 변화를 묶어서, 한번에 적용 시킨다.
레이아웃 계산과 리 렌더링의 규모는 커지나, 연산을 한번만 하기에 성능이 좋아진다고 한다. 또한 이 일련의 과정들을 자동화 한다.

## render 함수

`render()` 함수는 React 엘리먼트 트리를 만드는 것이다.

## render 함수 실행 시기

state나 props가 갱신되면 render() 함수는 새로운 React 엘리먼트 트리를 반환할 것입니다.

## 재조정

`Reconciliation`

어떤 부분을 바꾸어야 할지 결정할때 리액트가 쓰는 트리 비교 알고리즘

`Update`

리액트 앱에서 렌더되는 데이터의 변화. 대게 `setState`의 결과물이다. 결과적으로 리렌더(다시 렌더링) 할때 나타나는 결과물.

재조정은 가상돔 이라는 것에 대해 가장 널리 이해되는 알고리즘이다.
리액트 앱을 렌더링 할때에, 앱을 구성하는 노드 트리가 생성되고, 메모리에 저장된다.
이러한 트리는 렌더링 환경으로 전달된다, 브라우저 앱의 예를들면, 하나의 돔 조작 세트로써 번역된다.
앱이 업데이트 되었을때(대게, setState로 인해서), 새로운 트리가 생성된다. 그 새로운 트리는 이전의 트리와 비교되어 어떤부분을 바꾸어야 하는지 계산된다.

- 참조: velopert.com, reactjs 공식 문서

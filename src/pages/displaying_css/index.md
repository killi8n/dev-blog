---
title: "CSS Displaying"
spoiler: "the way of visibilities"
date: "2020-02-01"
---

# css 에서의 visibility 를 표현하는 여러 방법.

## 1. display

### `display: none`

### `display: block`

display: none -> block 으로 할시, 아에 보이지 않던 것이 보여지게 된다.
공간적으로 없애거나, 생기거나 하는 차이이다.

## 2. visibility

### `visibility: hidden`

### `visibility: visible`

보이지는 않지만 해당 공간은 존재한다. 즉, width와 height 을 준만큼 해당 공간이 존재하게 된다.

## css의 display 속성

span태그는 `display: inline` 속성이 기본적으로 주어지게 된다.
div 태그 안에서는 block 속성이 기본적으로 주어진다.

# css 에서의 display 속성의 block 과 inline 그리고 inline-block

## 1. block

무조건 한 줄을 점유 하고, 다음 태그는 다음 줄로 넘어가게 됨.

## 2. inline

대표적으로 span태그의 성질로, content/text 크기만큼 점유하고, 동일 라인에 추가됨.

- width/height 적용 불가
- margin/padding-top/padding-bottom 적용 불가
- line-height을 원하는 대로 적용 불가

## 3. inline-block

block과 inline이 합쳐진 형태.
기본적으로 inline의 속성을 따른다. (한줄 점유)

- width/height 적용 가능
- margin/padding-top/padding-bottom 적용 가능
- line-height 적용 가능

- inline-block 끼리 공백이 생길때, 상위 div에 font-size: 0 속성을 추가하면 해결이 된다.
- inline-block 끼리 높이가 맞지 않을 시, 상위 공백이 생기는데, 이때는 vertical-align: --- 값으로 top을 맞출수 있다.

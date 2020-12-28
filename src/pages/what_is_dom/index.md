---
title: "What is DOM?"
spoiler: "HEHE, can you explain DOM?"
date: "2020-01-17"
---

# DOM

What the heck is DOM?

DOM: The Document Object Model

HTML, XML 문서의 programming interface.

프로그래밍 언어가 DOM 에 접근할수 있도록 도와준다. 그리하여, 프로그래밍 언어가 문서 구조, 스타일, 내용 등을 변경할수 있게 한다.

```js
var paragraphs = document.getElementsByTagName("P")
// paragraphs[0] is the first <p> element
// paragraphs[1] is the second <p> element, etc.
alert(paragraphs[0].nodeName)
```

# DOM & Javascript

`API (web or XML page) = DOM + JS (scripting language)`

DOM 자체는 프로그래밍 언어와 독립적이다.
따라서 DOM의 구현은 어떠한 언어에서도 가능하다.

```python
# Python DOM example
import xml.dom.minidom as m
doc = m.parse("C:\\Projects\\Py\\chap1.xml");
doc.nodeName # DOM property of document object;
p_list = doc.getElementsByTagName("para");
```

# DOM 에 접근하기

`<script></script>` 태그를 사용하여 DOM에 접근 가능..

```html
<script>
  window.addEventListener("load", () => {
    const divs = document.getElementByTagNames("div")
    for (let i = 0; i < divs.length; i++) {
      const p = document.createElement("p")
      const pText = document.createTextNode("Hello World!")
      p.appendChild(pText)
      div[i].appendChild(p)
    }
  })
</script>
```

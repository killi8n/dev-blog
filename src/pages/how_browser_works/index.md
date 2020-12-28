---
title: "How Browser Works?"
spoiler: "How Browser Works?"
date: "2019-01-14"
---

# 브라우저는 어떻게 작동할까?

[출처 원본](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)

In the years of IE 90% dominance there was nothing much to do but regard the browser as a "black box", but now, with open source browsers having more than half of the usage share, it's a good time to take a peek under the engine's hood and see what's inside a web browser. Well, what's inside are millions of C++ lines...

IE가 90%이상을 지배하던 시기에는 브라우저가 **블랙박스**처럼 가려져 있었기에, 딱히 주목 할것이 없었으나, 현재는, 오픈소스 브라우저들이 아주 많이 쓰이기 때문에, 엔진이 어떻게 작동하고, 웹브라우저의 내부를 볼만할것 같다. 사실, 브라우저의 내부에는 수백만줄의 C++로 이루어진 코드들이 있다...

As a web developer, learning the internals of browser operations helps you make better decisions and know the justifications behind development best practices. While this is a rather lengthy document, we recommend you spend some time digging in; we guarantee you'll be glad you did. Paul Irish, Chrome Developer Relations.

Web Developer(웹 개발자)로써, 브라우저의 내부 연산에 대해 학습하는 것은 더 나은 결정과 최적의 개발 방식을 정의 하는것에 도움이 될것이다.
이것은 매우 긴 문서이므로, 집중할 시간을 갖는것을 추천한다. 그 시간이 아깝지 않을것이다. Paul Irish, 크롬 개발자 연합.

## Introduction (소개)

Web browsers are the most widely used software. In this primer, I will explain how they work behind the scenes. We will see what happens when you type google.com in the address bar until you see the Google page on the browser screen.

웹 브라우저들은 가장 널리 쓰는 소프트웨어이다. 뒤에서 어떤 작업을 하는지 설명해줄것이다. 당신이 google.com 을 타이핑했을때, 구글 페이지가 나타나기 전까지 어떤일이 일어나는지 볼것이다.

### The browsers we will talk about

There are five major browsers used on desktop today: Chrome, Internet Explorer, Firefox, Safari and Opera. On mobile, the main browsers are Android Browser, iPhone, Opera Mini and Opera Mobile, UC Browser, the Nokia S40/S60 browsers and Chrome–all of which, except for the Opera browsers, are based on WebKit. I will give examples from the open source browsers Firefox and Chrome, and Safari (which is partly open source). According to StatCounter statistics (as of June 2013) Chrome, Firefox and Safari make up around 71% of global desktop browser usage. On mobile, Android Browser, iPhone and Chrome constitute around 54% of usage.

### 우리가 다뤄볼 브라우저들.

요즘에는 5개의 메이저한 브라우저들이 있다: 크롬, IE, 파이어폭스, 사파리 그리고 오페라. 모바일 에서는, 메인 브라우저는 Android 브라우저, 아이폰, 오페라 미니와 오페라 모바일, UCa 브라우저, 노키아 브라우저 그리고 크롬이 있다. 오페라 브라우저를 제외하고는 모두 WebKit에 기반되어있다.
파폭, 크롬, 사파리 (사파리는 부분적 오픈소스)와 같은 오픈소스들의 예제를 보여줄것이다. 2013년 6월의 리서치에 따르면, 파폭과 사파리가 71%정도의 데스크탑 브라우저 사용량을 달하고 있었다고 한다. 모바일에서는, 안드로이드 브라우저, 아이폰 그리고 크롬이 합해서 54프로의 사용량을 차지했다.

### The browser's main functionality

The main function of a browser is to present the web resource you choose, by requesting it from the server and displaying it in the browser window. The resource is usually an HTML document, but may also be a PDF, image, or some other type of content. The location of the resource is specified by the user using a URI (Uniform Resource Identifier).

The way the browser interprets and displays HTML files is specified in the HTML and CSS specifications. These specifications are maintained by the W3C (World Wide Web Consortium) organization, which is the standards organization for the web. For years browsers conformed to only a part of the specifications and developed their own extensions. That caused serious compatibility issues for web authors. Today most of the browsers more or less conform to the specifications.

Browser user interfaces have a lot in common with each other. Among the common user interface elements are:

- Address bar for inserting a URI
- Back and forward buttons
- Bookmarking options
- Refresh and stop buttons for refreshing or stopping the loading of current documents
- Home button that takes you to your home page

### 브라우저가 주되게 하는일

브라우저의 주된 업무는 당신이 선택한 web resource를 보여주는 것이다. (서버에서 요정하여 당신의 브라우저상의 창으로)
그 resource는 대개 HTML이다. PDF도 될수 있고, 이미지나 다른 컨텐트들이 될수도 있다.
URI라는 것을 통해서 유저가 그 리소스들의 위치를 알아낼수 있다.

브라우저가 해석하고 보여주는 HTML 파일들은 HTML 언어와 CSS 스펙으로 단정지을수 있다. 이러한 스펙들은 W3C에서 관리된다. (웹의 표준을 규정하는 기구). 수년동안, 브라우저는 스펙들의 단부분으로 이루어져있었고 그들의 확장을 계속 개발해 나갔다. 그것이 웹 저자들에게 심각한 적합성 이슈들을 야기했다. 오늘날 대부분의 브라우저들은 이러한 규정들에 따르고 있다.

브라우저 사용자 인터페이스들은 (Browser UI) 다른것들과 많이 공통점이 있다. 공통된 유저 인터페이스들은 다음과 같다:

- 주소를 칠수 있는 주소창
- 앞으로 뒤로가기 버튼
- 북마크(즐겨찾기) 옵션
- 새로고침과 정지 버튼
- 홈페이지로 가게하는 홈버튼

Strangely enough, the browser's user interface is not specified in any formal specification, it just comes from good practices shaped over years of experience and by browsers imitating each other. The HTML5 specification doesn't define UI elements a browser must have, but lists some common elements. Among those are the address bar, status bar and tool bar. There are, of course, features unique to a specific browser like Firefox's downloads manager.

이상하게도, 브라우저들의 유저 인터페이스는 어떠한 정해진 방법대로 규정되있지 않다, 단지 그냥 더 좋으면 그것을 적용하고 나머지들이 따라가는 방식이다. HTML5 규정은 브라우저가 반드시 갖춰야할 UI 엘리먼트들을 정의하지 않는다, 다만 그냥 공통된 요소들을 나열할 뿐이다. 주소창, 상태창, 툴바와 같은 것들을. 물론, 파이어폭스의 다운로드 매니저와 같은 특이한 기능도 있다.

### The browser's high level structure

The browser's main components are (1.1):

1 .The user interface: this includes the address bar, back/forward button, bookmarking menu, etc. Every part of the browser display except the window where you see the requested page.

2. The browser engine: marshals actions between the UI and the rendering engine.
3. The rendering engine : responsible for displaying requested content. For example if the requested content is HTML, the rendering engine parses HTML and CSS, and displays the parsed content on the screen.
4. Networking: for network calls such as HTTP requests, using different implementations for different platform behind a platform-independent interface.
5. UI backend: used for drawing basic widgets like combo boxes and windows. This backend exposes a generic interface that is not platform specific. Underneath it uses operating system user interface methods.
6. JavaScript interpreter. Used to parse and execute JavaScript code.
7. Data storage. This is a persistence layer. The browser may need to save all sorts of data locally, such as cookies. Browsers also support storage mechanisms such as localStorage, IndexedDB, WebSQL and FileSystem.

### 브라우저의 고수준 구조

브라우저의 주된 컴포넌트들은 다음과 같다 :

1. UI: 주소창, 뒤로가기 앞으로가기 버튼, 북마크 메뉴, 등등 을 포함한다. 당신이 보고있는 창에서 나타나는 모든 파트들이다.
2. 브라우저 엔진: UI와 렌더링 엔진 사이에서 액션들을 규제한다.
3. 렌더링 엔진: 요청한 컨텐트들을 보여주는 역할을 한다. 예를들면 요청된 컨텐트가 HTML 이라면, 렌더링 엔진이 HTML과 CSS를 파싱한다, 그리고 파싱된 컨텐트들을 스크린에 보여준다.
4. 네트워킹: HTTP 요청과 같은 네트워크 요청을 위해서, 다른 플랫폼에 의존하는 인터페이스들을 위해 다른 실행을 한다.
5. UI 백엔드: 기초적인 위젯(콤보박스와 창 같은)들을 그리는데에 사용된다. 이 백엔드는 플랫폼에 따라 다르지 않은 공통적인 인터페이스들을 보여준다.
6. 자바스크립트 인터프리터: 자바스크립트 코드를 파싱하고 실행하는데 쓰인다.
7. 데이터 스토리지: 영구적인 층이다. 브라우저가 어떤 일련의 데이터들을 지역적으로 저장하는것이 필요할수도있다.(예를들자면 쿠키같은것들). 브라우저는 또한 localStorage, IndexedDB, WebSQL 그리고 FileSystem과 같은 저장 메커니즘을 지원한다.

![High Level Structure of Browser Diagram](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/layers.png)

It is important to note that browsers such as Chrome run multiple instances of the rendering engine: one for each tab. Each tab runs in a separate process.

크롬과 같은 브라우저들이 렌더링 엔진의 여러개의 인스턴스들을 실행 하는것은 주목해볼만 하다: 하나의 탭에서 하나하나씩. 각 탭들은 나누어진 프로세스로 실행된다.

# The rendering engine

# 렌더링 엔진

The responsibility of the rendering engine is well... Rendering, that is display of the requested contents on the browser screen.

렌더링 엔진의 책임은.. 렌더링 이다. 브라우저의 스크린에 요청된 내용들을 보여주는 역할을 하는것이죠.

By default the rendering engine can display HTML and XML documents and images. It can display other types of data via plug-ins or extension; for example, displaying PDF documents using a PDF viewer plug-in. However, in this chapter we will focus on the main use case: displaying HTML and images that are formatted using CSS.

본래, 렌더링 엔진은 HTML과 XML과 이미지들을 보여줍니다. 다른 타입의 데이터들을 보여줄수 있습니다. (플러긴 또는 확장을 통해서); 예를들자면, PDF 다큐먼트들을 보여주는 PDF 뷰어 플러긴이 있죠. 그러나, 이 챕터에서는 주된 사용 방법에 대해서 초점을 맞출것입니다: CSS 로 포맷팅된 HTML과 이미지들을 보여주는 방법입니다.

# Rendering engines

# 렌더링 엔진들

Different browsers use different rendering engines: Internet Explorer uses Trident, Firefox uses Gecko, Safari uses WebKit. Chrome and Opera (from version 15) use Blink, a fork of WebKit.

다른 브라우저들은 서로 다른 렌더링 엔진들을 사용합니다: IE는 Trident, FireFox는 Gecko, Safari는 Webkit을 사용하죠. 크롬과 오페라 (15버전 이상) 은 Blink (웹킷의 일종) 을 사용합니다.

WebKit is an open source rendering engine which started as an engine for the Linux platform and was modified by Apple to support Mac and Windows. See webkit.org for more details.

웹킷은 오픈소스 렌더링 엔진입니다. 리눅스 플랫폼으로 나온 엔진입니다만, 애플에 의해서 맥과 윈도우를 지원하게 변경되었습니다. [webkit.org](https://webkit.org)에서 자세한 정보를 확인해보세요.

# The main flow

# 주된 흐름도

The rendering engine will start getting the contents of the requested document from the networking layer. This will usually be done in 8kB chunks.

렌더링 엔진은 요청된 다큐먼트들을 네트워크 층으로 부터 받기 시작할것입니다. 이것은 대개 8kB 청크들로 끝납니다.

After that, this is the basic flow of the rendering engine:

그후에, 이것은 렌더링 엔진의 가장 기본적인 흐름입니다.

![engine flow](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/flow.png)

The rendering engine will start parsing the HTML document and convert elements to DOM nodes in a tree called the "content tree". The engine will parse the style data, both in external CSS files and in style elements. Styling information together with visual instructions in the HTML will be used to create another tree: the render tree.

렌더링 엔진은 HTML 다큐먼트들을 파싱하기 시작할것이고, "content tree"라고 불리우는 트리 안에서 엘리먼트들을 돔 노드들로 변환 시킵니다. 그리고 엔진은 style 데이터들을 파싱할것입니다. 외부의 css 파일들이나, 스타일 요소들로 부터 말이죠. 스타일링 정보는 다른 트리를 만들곤 합니다. 렌더 트리입니다.

The render tree contains rectangles with visual attributes like color and dimensions. The rectangles are in the right order to be displayed on the screen.

렌더 트리는 색깔과 디멘젼과 같은 시각적인 요소들을 가지고 있습니다. 그 렉탱글들은 스크린에서 보여지기 위해 올바른 순서로 이뤄져 있습니다.

After the construction of the render tree it goes through a "layout" process. This means giving each node the exact coordinates where it should appear on the screen. The next stage is painting–the render tree will be traversed and each node will be painted using the UI backend layer.

렌더 트리의 구축이 완료되면, "layout" 단계를 밟습니다. 이것은 각각의 노드들을 각자가 놓여져야 할자리에 놓는 것이죠. 다음 단계는 렌더트리들을 페인팅 하는 것입니다. 렌더트리는 서로간에 가로지를것이며 각자의 노드는 UI backend layer를 이용하여 색칠됩니다.

It's important to understand that this is a gradual process. For better user experience, the rendering engine will try to display contents on the screen as soon as possible. It will not wait until all HTML is parsed before starting to build and layout the render tree. Parts of the content will be parsed and displayed, while the process continues with the rest of the contents that keeps coming from the network.

이것이 단계적인 프로세스라는 것을 이해하는것은 굉장히 중요합니다. 더나은 UX를 위해서, 렌더링 엔진은 컨텐츠들을 가능한한 빨리 보여주려고 할것입니다. 렌더트리를 빌드하고, 레이아웃을 맞추는 것 전에, HTML이 파싱되기를 기다리지 않을것입니다. 컨텐트들의 부분들은 파싱될것이며, 보여질것입니다. 네트워크를 통해서 들어온 나머지 컨텐츠들이 들어오는 동안에 말이죠.

# Main flow examples

# 메인 플로우 예시

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/webkitflow.png)

#### webkit main flow

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/image008.jpg)

#### Mozilla's Gecko rendering engine main flow

From figures 3 and 4 you can see that although WebKit and Gecko use slightly different terminology, the flow is basically the same.
위의 두 그림을 통해서 웹킷과 게코 엔진이 살짝씩 서로다르게 용어를 사용한다는것을 볼수 있습니다. 그 흐름은 물론 같습니다.

Gecko calls the tree of visually formatted elements a "Frame tree". Each element is a frame. WebKit uses the term "Render Tree" and it consists of "Render Objects". WebKit uses the term "layout" for the placing of elements, while Gecko calls it "Reflow". "Attachment" is WebKit's term for connecting DOM nodes and visual information to create the render tree. A minor non-semantic difference is that Gecko has an extra layer between the HTML and the DOM tree. It is called the "content sink" and is a factory for making DOM elements. We will talk about each part of the flow:

게코는 시각적으로 포맷된 요소들의 트리를 "Frame Tree"라고 부릅니다. 각 요소들은 frame 입니다. 웹킷은 "Render Tree"라는 용어를 사용하며, "Render 객체들"로 이루어져 있습니다. 웹킷은 "레이아웃" 이라는 용어를 엘리먼트들을 배치시키는데에 사용하고, 게코는 그것을 "Reflow" 한다고 합니다. "Attachment" 는 웹킷의 돔 노드들을 이어주고 렌더 트리를 생성하기위한 시각적 정보들을 일컫는 용어입니다. 마이너한 차이는 게코는 HTML과 돔 트리 사이에 별개의 층을 가지고 있다는 점입니다. "content sink"라고 불리웁니다. 돔 요소들을 만드는 팩토리라고 할수 있습니다. 각 흐름의 파트에 대해 이야기 해 볼것입니다.

# Parsing–general

# 일반적 파싱

Since parsing is a very significant process within the rendering engine,
we will go into it a little more deeply.
Let's begin with a little introduction about parsing.

파싱이 렌더링 엔진에서 매우 중요한 프로세스중 하나이므로, 좀더 깊게 다루어볼것이다.
파싱에 대한 작은 소개를 하겠다.

Parsing a document means translating it to a structure the code can use.
The result of parsing is usually a tree of nodes that represent the structure of the document.
This is called a parse tree or a syntax tree.

다큐먼트를 파싱한다는 것은 코드가 쓰일수 있는 구조로 해석한다는 것이다.
파싱의 결과는 대개 노드들의 트리이다. 그것은 다큐먼트의 구조를 나타낸다.
파스트리 혹은 신택스 트리라고 불리운다.

For example, parsing the expression 2 + 3 - 1 could return this tree:

예를들면, 2 + 3 - 1을 파싱하는것은 다음과 같은 트리를 가진다:

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/image009.png)

#### Figure : mathematical expression tree node

#### 주석: 트리 노드의 수학적 표현

# Grammars

# 문법

Parsing is based on the syntax rules the document obeys:
the language or format it was written in.
Every format you can parse must have deterministic grammar consisting of vocabulary and syntax rules.
It is called a context free grammar.
Human languages are not such languages and therefore cannot be parsed with conventional parsing techniques.

파싱은 다큐먼트가 지배하는 문법적인 규칙에 기초한다:
그 언어 혹은 포맷이 쓰여진 것에 기초.
당신이 파스할수 있는 모든 포맷은 단어로써의 결정적인 문법적 요소와 문법적인 규칙을 갖고 있어야 한다.
그것은 컨텍스트에 지배되지 않는 문법이라고 불리운다.
사람의 언어는 그러한 프로그래밍 언어같지 않기 때문에, 전통적인 파싱 기술로는 해석될수 없다.

# Parser–Lexer combination

# Parser-Lexer 조합

Parsing can be separated into two sub processes: lexical analysis and syntax analysis.

파싱은 두개의 하위 프로세스로 나뉜다: 어휘적인 연구와 문법적인 연구

Lexical analysis is the process of breaking the input into tokens.
Tokens are the language vocabulary: the collection of valid building blocks.
In human language it will consist of all the words that appear in the dictionary for that language.

어휘적인 측면은 입력값을 토큰들로 분해하는 과정이다.
토큰들은 언어의 단어이다: 유효한 빌딩 블락들의 집합.
사람의 언어에서 그것은 사전에서 나타나는 모든 단어들을 구성한다.

Syntax analysis is the applying of the language syntax rules.

신택스 적인 측면은 언어의 문법적인 규칙들을 적용하는 것이다.

Parsers usually divide the work between two components: the lexer (sometimes called tokenizer) that is responsible for breaking the input into valid tokens, and the parser that is responsible for constructing the parse tree by analyzing the document structure according to the language syntax rules.
The lexer knows how to strip irrelevant characters like white spaces and line breaks.

파서들은 대개 두개의 컴포넌트들로 일을 나눈다: 문장 인식기(Lexer)(혹은 토크나이저로 불리운다).
문장인식기는 들어온 입력값을 유효한 토큰들로 분해하는 역할을 한다.
또하나는 언어의 신택스에 기초하여 구조를 구성하게 하는 파스트리를 구성하는 파서로 나뉜다.
문장 인식기는 관계없는 캐릭터들, 가령 화이트 스페이스 (빈 공간) 과 뉴라인(새 줄)과 같은 것들을 어떻게 제거해야 할지를 알고있다.

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/image011.png)

#### Figure : from source document to parse trees

#### 주석: 소스 다큐먼트에서 파스 트리까지

The parsing process is iterative.
The parser will usually ask the lexer for a new token and try to match the token with one of the syntax rules.
If a rule is matched, a node corresponding to the token will be added to the parse tree and the parser will ask for another token.

파싱 프로세스는 반복적이다.
파서는 대개 문장 인식기에게 새로운 토큰을 요구하고 그 토큰이 문법적 규칙중 하나와 맞는지 확인하려 한다.
만약 규칙이 맞다면, 그 토큰에 응답하는 노드가 파스트리에 추가될것이고, 그 파서는 다른 토큰을 요구할것이다.

If no rule matches, the parser will store the token internally, and keep asking for tokens until a rule matching all the internally stored tokens is found.
If no rule is found then the parser will raise an exception.
This means the document was not valid and contained syntax errors.

만약 어떠한 규칙도 매칭되지 않는다면, 파서는 그 토큰을 내부적으로 저장할것이고, 토큰들을 위해서 계속 요구할것이다, 내부적으로 저장된 모든 토큰들이 매칭되는 규칙들이 나타날때까지.
만약 어떠한 규칙들도 발견되지 않는다면 파서는 예외를 발생시킬것이다.
이것은 다큐먼트가 유효하지 않고 신택스 적인 에러들을 포함한다는 의미이다.

# Translation

# 해석

In many cases the parse tree is not the final product.
Parsing is often used in translation:
transforming the input document to another format.
An example is compilation.
The compiler that compiles source code into machine code first parses it into a parse tree and then translates the tree into a machine code document.

많은 경우들에서 파스트리는 최종적인 결과물이 아니다.
파싱은 종종 해석에서 쓰인다:
인풋 다큐먼트들을 다른 포맷으로 변환시킨다.
하나의 예로는 컴파일이 있다.
소스코드를 기계적 코드로 컴파일하는 컴파일러는 처음으로 파스트리로 그것을 파싱하고, 그 트리를 기계코드 다큐먼트로 변환한다.

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/image013.png)

#### Figure : compilation flow

#### 주석: 컴파일 흐름

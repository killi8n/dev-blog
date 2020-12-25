---
title: "About Wallet"
spoiler: "About Wallet"
date: "2019-01-16"
---

# 콜드월렛과 핫 월렛 : Cold Wallet and Hot Wallet

## 지갑의 종류 (type of wallets)

1. cold wallet
2. hot wallet

## Difference between two wallets (두 지갑 사이의 차이점)

- 인터넷 연결의 유무
- 핫월렛은 스마트폰이나 PC로 접속가능한 앱처럼 인터넷이 연결된것.
- 콜드월렛은 USB와 같은 하드웨어 형태나 개인키를 인쇄한 종이 등 인터넷에 연결되지 않은것.

## 핫 월렛의 특징

- 인터넷 연결이 되어있다.
- 출금이 쉽고 빠르다.
- 해킹에 취약
- 소액보관에 용이하다.

## 콜드월렛의 특징

- 인터넷이 연결되어 있지 않다.
- 출금이 번거롭다.
- 해킹에 상대적으로 안전하다.
- 거액 보관에 용이하다.
- 인터넷에 절대 연결하지 않는다.

## 오프라인 사인

지갑 프로그램의 일반적 거래과정.

1. 거래내역 생성
2. 개인키로 서명
3. 전송

일반적인 전자거래와 달리 블록체인을 활용한 지갑은 실시간 통신을 주고받으면서 거래를 하지 않는다.
다 만들어두고 맨 마지막에 한번에 전송하는 방식이다.

즉, 1번과 2번은 오프라인 상에서도 가능하다.

ex) my cold wallet -> send 1000000won to person1. -> sign -> output data -> send(via hot wallet) -> done

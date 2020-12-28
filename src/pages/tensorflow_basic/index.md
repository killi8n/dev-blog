---
title: "Basic of tensorflow"
spoiler: "Basic of tensorflow"
date: "2019-01-15"
---

# Define and run

- tensor flow's running flow is "Define and run"
- 텐서플로우 같은 경우는, session을 통해 모든것을 실행하기에, 위에 변수들과 로직들을 정해놓고, 마지막으로 세션을 통해 실행 시키기 때문에, Define And Run 이라고 표현한다.
- but pytorch's running flow is "Define by run"
- 허나 pytorch 같은 경우는 정의하면서 실행을 시키기 때문에, Define by run 이라고 한다.

# Tensor

- All data of tensorflow is created by tensor.
- So you can call tensor to n-dimension of vector.
- 텐서플로의 모든 것은 텐서로 이루어진다. 따라서 n-차원 벡터라고 텐서를 불러도 무방하다.

#### Tensor has rank and shape.

# Rank, Shape And Graph

- Rank: the number of tensor's dimension (텐서의 차원 수), 차원의 수를 나타낸다. 랭크가 0이면 스칼라, 1이면 벡터, 2면 행렬, 3이면 n-Tensor 또는 n차원 텐서
- Shape: the shape of dimension, 각 차원의 요소 개수. 텐서의 구조를 설명해준다. dtype 은 해당 텐서에 담긴 요소들의 자료형, string, float, int 등.
- Data Types: int, float, double etc..
- Graph: 텐서들의 연산 모음 . 지연 실행 이라고도 한다. 그래프의 실행은 Session 안에서 이뤄져야 한다.

```
* 3 : 랭크가 0 인 텐서, 셰이프는 []
Tensor that has zero rank. Shape is [].
* [1., 2., 3.] : 랭크가 1인 텐서, 셰이프는 [3]
Tensor that has only one rank. This tensor's shape is [3].
* [[1., 2., 3.], [4., 5., 6.]] : 랭크가 2인 텐서, 셰이프는 [2, 3]
Tensor that has two ranks. Shape is [2, 3].
* [[[1., 2., 3.]], [[7., 8., 9.]]] : 랭크가 3인 텐서, 셰이프는 [2, 1, 3]
Tensor that has three ranks. Shape is [2, 1, 3]
```

# Placeholder and Variables

1. Placeholder

- 그래프에 입력할 입력값을 나중에 받기 위해 사용하는 매개변수 (parameter)

2. Variables

- 그래프를 최적화 하는 용도 텐서플로가 학습한 결과를 갱신하기 위해 사용하는 변수.

# ANN (Artificial Neural Network): 인공 신경망

1. 뇌를 구성하는 신경세포, 즉 뉴런의 동작에 기초. (based on neuron which compose our brain.)
2. 신호 (즉: 역치), 역치가 너무 약하면 전달되지 않음. 혹은 강하면 강하게 말단으로 전달. (if threshold is to minor, neuron should not pass the data. Or maybe too strong, the data can be passed strogly)
3. 입력값: X 에 가중치: W 을 곱하고, 편향: b 를 더하여 활성화 함수(Sigmoid, ReLU) 등을 거쳐 결과값: y를 만들어 내는 것이 인공 뉴런의 기본.

```python
y = Sigmoid(X * W + b)
출력 = 활성화함수(입력 * 가중치 + 편향)
W 와 b를 찾아내는것이 학습
```

# 활성화 함수 (Activation Function)

활성화 함수는 인공신경망을 통과해온 값을 최종적으로 어떤 값으로 만들지를 결정한다. 이 함수가 바로 인공 뉴런의 핵심 중에서도 가장 중요한 요소.
Activation function defines the result value which has been passed. This function is the main important element of ann.

# 종류

대표적으로 Sigmoid, ReLU, tanh(쌍곡 탄젠트) 등이 있다.

1. Sigmoid

   - Only between 0 and 1.0 (No Minus number)
   - It can be seen that 0 and 1.0 are exist, but actually they are really close to maximum and minimum value. not exactly 0 or 1.0
     ![Sigmoid](https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Logistic-curve.svg/320px-Logistic-curve.svg.png)

2. ReLU

   _ 최근 가장 대표적으로 많이 사용하는 활성화 함수.
   _ 입력값이 0보다 작으면 항상 0을, 0보다 크면 입력값을 그대로 출력.

   - ![ReLU & Sigmoid](https://www.researchgate.net/profile/Meng_Cai22/publication/261309983/figure/fig1/AS:614045627478053@1523411294935/Illustration-of-sigmoid-and-ReLU-nonlinearity.png)

3. tanh
   - 1.0과 -1.0 사이를 취급(음수 존재)
   - 그래프에서는 -1.0 혹은 1.0 으로 수렴되는 것으로 보이지만 사실상 한없이 가까워지는것일뿐이다.
   - ![Sigmoid & tanh](https://cdn-images-1.medium.com/max/1600/1*f9erByySVjTjohfFdNkJYQ.jpeg)

# 정리

인공 뉴런은 가중치와 활성화 함수의 연결로 이루어진 매우간단한 구조.
이렇게 간단한 개념의 인공 뉴런을 충분히 많이 연결해놓는 것만으로도 인간이 인지하기 어려운 매우 복잡한 패턴까지도 스스로 학습할수 있게 된다.

![ANN](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Colored_neural_network.svg/1200px-Colored_neural_network.svg.png)

은닉층에서는 인공 뉴런이 작용하여 값을 만든다. Sigmoid(X \* W + b)

# 역전파 (backpropagation)

- 역전파: 출력층이 내놓은 결과의 오차를 신경망을 따라 입력층까지 역으로 전파하여 계산하는 방식.
- 이 방식은 입력층 부터 가중치를 조절해가는 기존 방식보다 훨씬 유의미한 방식으로 가중치를 조절해주어, 최적화 과정이 훨씬 빠르고 정확해진다.

1. 기존 학습 (기본학습)방법
   - 모든 조합의 경우의 수에 대해 가중치를 대입하고 계산.
2. 역전파
   - 결과값의 오차를 앞쪽으로 전파하면서 가중치를 갱신

`tensorflow-basic.py`

```python
import tensorflow as tf

hello = tf.constant('Hello, Tensorflow!')

a = tf.constant(0)
b = tf.constant(1000)
c = tf.add(a, b)

sess = tf.Session()
print(sess.run(hello))
print(sess.run([a, b, c]))

sess.close()

X = tf.placeholder(tf.float32, [None, 3])

x_data = [[1, 2, 3], [4, 5, 6]]

W = tf.Variable(tf.random_normal([3, 2]))
b = tf.Variable(tf.random_normal([2, 1]))
expr = tf.matmul(X, W) + b

sess = tf.Session()
sess.run(tf.global_variables_initializer())

print('---x_data---')
print(x_data)
print('---W---')
print(sess.run(W))
print('---b---')
print(sess.run(b))
print('---expr---')
print(sess.run(expr, feed_dict={X: x_data}))

sess.close()

```

`linear-regression-model.py`

```python
import tensorflow as tf
import matplotlib.pyplot as plt

x_data = [1, 2, 3]
y_data = [1, 2, 3]

W = tf.Variable(tf.random_uniform([1], -1.0, 1.0))
b = tf.Variable(tf.random_uniform([1], -1.0, 1.0))

X = tf.placeholder(tf.float32, name = "X")
Y = tf.placeholder(tf.float32, name = "Y")

hypothesis = W * X + b

cost = tf.reduce_mean(tf.square(hypothesis - Y))

optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.1)
train_op = optimizer.minimize(cost)



sess = tf.Session()
sess.run(tf.global_variables_initializer())

for step in range(100):
    _, cost_val = sess.run([train_op, cost], feed_dict={X: x_data, Y: y_data})
    print(step, cost_val, sess.run(W), sess.run(b))

print("X: 5, Y:", sess.run(hypothesis, feed_dict={X: 5}))
print("X: 2.5, Y:", sess.run(hypothesis, feed_dict={X: 2.5}))


plt.figure(1)
plt.title('Linear Regression')
plt.xlabel('x')
plt.ylabel('y')
plt.plot(x_data, y_data, 'ro')
plt.plot(x_data, sess.run(W) * x_data + sess.run(b), 'b')
plt.plot([5], sess.run(hypothesis, feed_dict={X: 5}), 'go')
plt.show()


sess.close()
```

`simple-classification-model.py`

```python
import tensorflow as tf
import numpy as np

x_data = np.array([[0,0], [1,0], [1,1], [0,0], [0,0], [0,1]])

print(x_data)

y_data = np.array([
    [1, 0, 0], # 기타
    [0, 1, 0], # 포유류
    [0, 0, 1], # 조류
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 1]
])

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

W = tf.Variable(tf.random_uniform([2, 3], -1.0, 1.0))
b = tf.Variable(tf.zeros([3]))

L = tf.add(tf.matmul(X, W), b)
L = tf.nn.relu(L)

model = tf.nn.softmax(L)

cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(model), axis = 1))

optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.01)
train_op = optimizer.minimize(cost)

init = tf.global_variables_initializer()
sess = tf.Session()
sess.run(init)

for step in range(100):
    sess.run(train_op, feed_dict={X: x_data, Y: y_data})

    if (step + 1) % 10 == 0:
        print(step+1, sess.run(cost, feed_dict={X: x_data, Y: y_data}))

prediction = tf.argmax(model, axis=1)
target = tf.argmax(Y, axis=1)

print('예측값:', sess.run(prediction, feed_dict={X: x_data}))
print('실제값:', sess.run(target, feed_dict={Y: y_data}))

is_correct = tf.equal(prediction, target)
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))
print('정확도: %.2f' % sess.run(accuracy * 100, feed_dict={X: x_data, Y: y_data}))

sess.close()
```

`deep-neural-network.py`

```python
import tensorflow as tf
import numpy as np

x_data = np.array([[0,0], [1,0], [1,1], [0,0], [0,0], [0,1]])

y_data = np.array([
    [1, 0, 0], # 기타
    [0, 1, 0], # 포유류
    [0, 0, 1], # 조류
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 1]
])

X = tf.placeholder(tf.float32)
Y = tf.placeholder(tf.float32)

W1 = tf.Variable(tf.random_uniform([2, 10], -1., 1.))
W2 = tf.Variable(tf.random_uniform([10, 3], -1., 1.))

b1 = tf.Variable(tf.zeros([10]))
b2 = tf.Variable(tf.zeros([3]))

L1 = tf.add(tf.matmul(X, W1), b1)
L1 = tf.nn.relu(L1)

model = tf.add(tf.matmul(L1, W2), b2)

cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(labels=Y, logits=model))

optimizer = tf.train.AdamOptimizer(learning_rate=0.01)
train_op = optimizer.minimize(cost)

init = tf.global_variables_initializer()
sess = tf.Session()
sess.run(init)

for step in range(100):
    sess.run(train_op, feed_dict={X: x_data, Y: y_data})

    if (step + 1) % 10 == 0:
        print(step + 1, sess.run(cost, feed_dict={X: x_data, Y: y_data}))

prediction = tf.argmax(model, axis=1)
target = tf.argmax(Y, axis=1)

print('예측값:', sess.run(prediction, feed_dict={X: x_data}))
print('실제값:', sess.run(target, feed_dict={Y: y_data}))

is_correct = tf.equal(prediction, target)
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))

print('정확도: %.2f' % sess.run(accuracy * 100, feed_dict={X: x_data, Y: y_data}))
```

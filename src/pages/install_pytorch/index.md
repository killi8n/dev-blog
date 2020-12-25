---
title: "Install PyTorch"
spoiler: "Let's learn how to install pytorch through anaconda"
date: "2019-01-15"
---

# Install Anaconda

Download link(https://www.anaconda.com/download)

자신의 OS에 맞는 아나콘다를 다운받아 압축풀어 설치한다.
Install anaconda which is compatible for your computer's OS.

# Setup Anaconda Path For Mac

각자의 랩탑 혹은 데스크탑에 깔린 anaconda3의 HOME DIR을 찾아 path를 등록해준다.
Set Path for your laptop or desktop by your anaconda3's location.

`~/.zshrc` or `~/.bash_profile`

```bash
export ANACONDA_HOME=/anaconda3
export PATH=${PATH}:$ANACONDA_HOME/bin
```

### Setup Anaconda Path (Windows)

execute cmd (not recommended because this way is for once)
cmd 를 실행한다. (이 방법은 1회용 이므로 추천하지 않는다.)

```bash
set PATH=%PATH%;C:\ProgramData\Anaconda3;C:\ProgramData\Anaconda3\Scripts;
conda --version
```

in Path Setting Panel
환경 변수 패널에서

```
ANACONDA_HOME=C:\ProgramData\Anaconda3
path=%ANACONDA_HOME%;%ANACONDA_HOME%/Scripts;%ANACONDA_HOME%/Library/bin;
```

# 참고할 사항 (Notes)

현재 tensorflow는 python 3.6 대 버전까지만 지원한다.

Now, Tensorflow only support until python 3.6.\* versions.

cmd 혹은 terminal 에서 ,

so in cmd or terminal,

```bash
python --version
```

으로 설치된 파이썬의 버전을 확인한후,

check your python's version by typing that command,

만약 파이썬의 버전이 3.7 대라면,

if your python's version is on 3.7.\*,

아래의 명령을 실행하여 3.6으로 맞춰춘다.

execute bottom line of command for downgrading python from 3.7 to 3.6

```bash
conda update conda
conda update python=3.6
```

아마 3.6의 가장 마지막 버전인 3.6.8로 깔릴것이다.

maybe this commands make your python's version 3.6.8 which is latest version of 3.6.

### Install PyTorch

```bash
conda install pytorch torchvision -c pytorch
```

### Check Version

```bash
python3
import torch
print(torch.__version__)
```

## Install Pytorch on specific environment(venv in pip)

```bash
$ conda create -n your-env-name python=3.6
$ source activate your-env-name
$(your-env-name) python --version // to check your python version, 3.6.8
$(your-env-name) conda install pytorch torchvision -c pytorch
$(your-env-name) python
$(python) import torch
$(python) print(torch.__version__)
```

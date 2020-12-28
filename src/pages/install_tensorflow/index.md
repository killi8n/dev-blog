---
title: "Install Tensorflow"
spoiler: "Let's learn how to install tensorflow through anaconda"
date: "2019-01-15"
---

# Notes

Until now (2019-01-15), tensorflow only support python which is lower than 3.6.8.
So, to install tensorflow, your python version must be lower than 3.7.

## Install Globally

```bash
$ conda install -c conda-forge tensorflow
```

## Install Environmentally

```bash
$ conda create -n your-env-name python=3.6
$ source activate your-env-name
$ (your-env-name) conda install -c conda-forge tensorflow
```

---
title: "[APDKUPA] Day 2: Lasso and Ridge Regression"
date: "2025-11-25"
description: "The trade-off between different regularization"
author: "Ting-Yu Dai"
tags: ["Regression", "Machine Learning"]
coverImage: ""
---
# What is regularization?

Today, I want to start with an interview question that I encountered two years ago. What is the difference between lasso and ridge regularization?

Let's start with a linear regression:

$$
Y = aX
$$

It is a one parameter linear regression and the goal is to find the optimal $a$ that minimize the error between $Y$ and $aX$. We could set our loss fucntion as the squared loss.
$$
MSE(a) = (Y - aX)^2
$$

Save the 

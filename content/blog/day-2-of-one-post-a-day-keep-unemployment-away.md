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


## A one-parameter example
Let's start with a linear regression:

$$
Y = aX
$$

It is a one parameter linear regression and the goal is to find the optimal $a$ that minimize the error between $Y$ and $aX$. We could set our loss fucntion as the squared loss.
$$
MSE(a) = (Y - aX)^2
$$

### Gradient Descent
Let's say we want to optimize that through graduate descent. We calculate the slope i.e. the derivative of the loss function with respect to $a$ and move in the opposite direction.

1.  **Calculate Gradient:**

    $$\frac{\partial MSE}{\partial a} = 2(Y - aX) \cdot (-X) = -2x(Y - \hat{Y})$$

    *(This is roughly "Error $\times$ Input".)*

2. **Update Rule:**
    We update the weight $a$ using a learning rate $\eta$ (a small number like 0.01).

    $$a_{new} = a_{old} - \eta \cdot (\text{Gradient})$$

If the gradient is positive (slope is up), we subtract to go down. If negative, we add to go up. We keep doing this until the gradient is zero (the bottom of the valley).

### Lasso (L1) Regularization
Regularization is a concept to implement the trade-off of the bias and variance that helps to reduce the prediction error. From a equation perspective, it add a penalty to the weight to constraint the weight from having a large number of the weight. Lasso Regularization i.e. L1 regularization add the absolute value of the weight, so the new loss function turn into:

$$
MSE_{L1}(a) = (Y - aX)^2 + \lambda |a|
$$

*(Where $\lambda$ is the regularization strength.)*

After add that penalty term, what would it impact the optimization? First, the derivative of $|a|$ is either $+1$ (if $a > 0$) or $-1$ (if $a < 0$).

**The New Update Rule:**

$$
a_{new} = a_{old} - \eta \cdot (\text{Data Gradient} + \lambda \cdot \text{sign}(a))
$$

What does that mean? By observing the equation, we know we keep adding a constant subtraction (of $\eta\lambda$) pushing it toward zero. You may also notice that the force of that "push" is not determined by $a$, so even $a$ get smaller, the weight can hit exactly 0 by doing that. Once $a$ hits $0$, the gradient becomes undefined (or a "sub-gradient" interval), effectively trapping the weight at $0$ unless the data error is massive enough to push it out.

> **Result:** L1 is aggressive. It can force the parameter to become **exactly zero**.

### Ridge (L2) Regularization

On the other hand, Ridge regularization add the penalty term as the square of the weight
$$
MSE_{L1}(a) = (Y - aX)^2 + \lambda a^2
$$

The derivative of $a^2$ is $2a$.

**The New Update Rule:**

$$
a_{new} = a_{old} - \eta \cdot (\text{Data Gradient} + 2 \lambda a)
$$

Now clearly, the difference compared to L1 is that now the penalty depends on $a$ if self. If $a$ is large, the penalty is large. vise versa. Moreove, while $a$ approaching zero, the penalty force i.e. $2 \lambda a$ also approaches zero. It pushes hard at the beginning and become infinitely small as you get close to the center. As a result, you get extremely small values but never hit zero.

> **Result:** L2 is conservative. It **shrinks** the parameter to be very small, but rarely eliminates it entirely.


# Why do we need regularization?

Most of the explanation below is highly referred to [here](https://towardsdatascience.com/machine-learning-bias-variance-tradeoff-and-regularization-94846f945131/). 

## Bias and Variance
In simple term, if you image your data label as a distribution. The **bias** represent the average difference between your prediction and the true values, indicating the **ability** of our model to capture the centeroid of the true value distribution. 

On the other hand, **variance** is the measure of **variability** i.e. **spread** of the predicted values. I will image as the width of the distribution. Lower variance means the model is limited to a small space to give the prediction.

## Underfitting and Overfitting

Combining the previous example and the bias and variance concept, let's first think about: **What could happen in one-parameter example?** A very intuitive thought is that: since it only contain one changeable parameter, it must be hard to give a good generalization of the underlying trend. That would produce high errors on both **training** and **testing** dataset i.e. **the high bias** i.e.**underfitting**.

**Overfitting** occurs when a model is fitted too hard and it **start to model the noise** of the training dataset. From a metric-wise view, it commonly has a **low error in training** and **high in testing** i.e. **high variance**.

Now, the name itself basically explain it. **Under**fitting means the model is fitted badly so that have bad perfromance. **Over**fitting means the model is fitted to hard that stick hard with the training dataset.

## Regularization is used for **overfitting**

Why adding that penalty term is considered to cure overfitting? Remember we said the overall scope of doing regularization is to minimize the weight by adding the penalty term. In another way to say it, as the weight become smaller, the **variance** become smaller. With a smaller weight, even you have a highly pertubated input set, the output is controlled. 

## Lasso vs Ridge: An example with building energy

Let's say you want to predict **the energy consumption data** using a **linear regression model**. The input data is building metadata such as square feet of the space, which year does this house build, and the HVAC system effiency... etc. Including all these parameters, we happen to have two very similar variables:
1. Size in *Square Feet*
2. Size in *Square Meter*

What would happen in Lasso and Ridge Behavior?

* **L1 (Lasso) Prediction Behavior:**
    * **The Decision:** L1 sees that these two provide the same info. It effectively says, *"I don't need both."* It will arbitrarily **kill one** (set its weight to 0) and keep the other.
    * **The Impact:** The model becomes simpler. However, if the feature it kept (e.g., Square Meters) suddenly has a data collection error (the sensor breaks) in real life, the model fails completely because it ignored the "backup" signal (Square Feet).
    * **Behavior:** **"Decisive but risky."**

* **L2 (Ridge) Prediction Behavior:**
    * **The Decision:** L2 hates large weights. Instead of giving a weight of $1.0$ to *Square Feet* and $0$ to *Meters*, it prefers giving $0.5$ to *Feet* and $0.5$ to *Meters*. $0.5^2 + 0.5^2 = 0.5$, which is a smaller penalty than $1^2 + 0^2 = 1$.
    * **The Impact:** The model listens to both. If one sensor is slightly noisy, the other one balances it out. The prediction is more stable.
    * **Behavior:** **"Redundant and stable."**

### The useless noise scenario:
Imagine suddenly the input data contain one variable that is *"tea price"* in our dataset.

* **L1 Prediction Behavior:**
    * L1 shrinks the weight of the "Tea Price" variable to **exactly zero**.
    * **Prediction:** When you run the model, changes in Tea Price will have **zero effect** on your energy estimation. The model has learned to ignore the noise entirely.

* **L2 Prediction Behavior:**
    * L2 shrinks the weight of "Tea Price" to be very small (e.g., $0.00001$), but not zero.
    * **Prediction:** If the Price of Tea suddenly spikes massively (an outlier event in the noise feature), the L2 model **will** slightly change its energy prediction. It effectively "hears" the noise, even if just a whisper.
  
### The "Big Shock" Scenario (Outliers in Inputs)
Imagine a sensor glitches and sends a value of **1,000,000** for a feature that is usually between 1 and 10.

* **L1 Behavior:** Because L1 has likely zeroed out many irrelevant or semi-relevant features, there are **fewer pathways** for this bad data to enter the prediction. If the glitch happens on a feature L1 decided was useless, the model is immune.
* **L2 Behavior:** Because L2 keeps all features active (even with small weights), every single input variable has a "wire" connected to the final output. A massive glitch in *any* input variable will ripple through to the prediction.

### Visual Summary

| Scenario | **L1 (Lasso) Behavior** | **L2 (Ridge) Behavior** |
| :--- | :--- | :--- |
| **New data has noise** | **Ignores it** (if weight is 0). | **Reacts slightly** (all weights are active). |
| **Two inputs are identical** | **Picks one**, kills the other. | **Averages them** (uses both). |
| **Model "Personality"** | **Specialist:** Relies heavily on a few key factors. | **Generalist:** Relies on a weighted sum of everything. |
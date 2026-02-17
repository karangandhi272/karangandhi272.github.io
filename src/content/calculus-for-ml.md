## Why Calculus Matters in ML

Machine learning is fundamentally about optimization—finding the parameters that minimize a loss function. Calculus gives us the tools to do this efficiently.

### Derivatives: The Foundation

The derivative measures the rate of change. For a function $f(x)$:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

### Key Derivative Rules

**Power Rule:**
$$\frac{d}{dx}x^n = nx^{n-1}$$

**Chain Rule:**
$$\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$$

**Product Rule:**
$$\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$$

### Gradients

For multivariate functions, we use the **gradient**:

$$\nabla f = \begin{bmatrix} \frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{bmatrix}$$

The gradient points in the direction of steepest ascent.

### Gradient Descent

The workhorse of ML optimization:

$$\theta_{t+1} = \theta_t - \alpha \nabla L(\theta_t)$$

Where:
- $\theta$: Parameters
- $\alpha$: Learning rate
- $L$: Loss function

### Practical Example: Linear Regression

Given data points $(x_i, y_i)$, we minimize:

$$L(w, b) = \frac{1}{n}\sum_{i=1}^{n}(wx_i + b - y_i)^2$$

The gradients are:

$$\frac{\partial L}{\partial w} = \frac{2}{n}\sum_{i=1}^{n}x_i(wx_i + b - y_i)$$

$$\frac{\partial L}{\partial b} = \frac{2}{n}\sum_{i=1}^{n}(wx_i + b - y_i)$$

### Python Implementation

```python
import numpy as np

def gradient_descent(X, y, learning_rate=0.01, iterations=1000):
    n = len(X)
    w, b = 0, 0
    
    for _ in range(iterations):
        # Predictions
        y_pred = w * X + b
        
        # Gradients
        dw = (2/n) * np.sum(X * (y_pred - y))
        db = (2/n) * np.sum(y_pred - y)
        
        # Update parameters
        w -= learning_rate * dw
        b -= learning_rate * db
    
    return w, b

# Example
X = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 5, 4, 5])

w, b = gradient_descent(X, y)
print(f"w = {w:.4f}, b = {b:.4f}")
```

### The Chain Rule in Neural Networks

Backpropagation relies on the chain rule. For a network with layers:

$$\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial a_n} \cdot \frac{\partial a_n}{\partial a_{n-1}} \cdots \frac{\partial a_2}{\partial w_1}$$

This allows gradients to flow backward through the network.

## Summary

| Concept | ML Application |
|---------|---------------|
| Derivative | Measuring loss sensitivity |
| Gradient | Direction for parameter updates |
| Chain Rule | Backpropagation |
| Optimization | Training models |

Understanding these concepts deeply will make you a better ML practitioner.

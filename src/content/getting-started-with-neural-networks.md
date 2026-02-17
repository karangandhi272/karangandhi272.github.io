## What is a Neural Network?

A neural network is a computational model inspired by the way biological neural networks in the human brain work. At its core, it's a collection of connected nodes (neurons) organized in layers.

### The Perceptron

The simplest neural network is a **perceptron**, which consists of:

- Input values: $x_1, x_2, ..., x_n$
- Weights: $w_1, w_2, ..., w_n$
- Bias: $b$
- Activation function: $\sigma$

The output is computed as:

$$y = \sigma\left(\sum_{i=1}^{n} w_i x_i + b\right)$$

### Activation Functions

Common activation functions include:

1. **Sigmoid**: $\sigma(x) = \frac{1}{1 + e^{-x}}$
2. **ReLU**: $\text{ReLU}(x) = \max(0, x)$
3. **Tanh**: $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$

### A Simple Example

Here's how you might implement a basic neuron in Python:

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

class Neuron:
    def __init__(self, weights, bias):
        self.weights = weights
        self.bias = bias
    
    def forward(self, inputs):
        total = np.dot(self.weights, inputs) + self.bias
        return sigmoid(total)

# Example usage
weights = np.array([0.5, -0.5, 0.3])
bias = 0.1
neuron = Neuron(weights, bias)

inputs = np.array([1.0, 2.0, 3.0])
output = neuron.forward(inputs)
print(f"Output: {output}")
```

### Backpropagation

Training a neural network involves **backpropagation**, which uses the chain rule to compute gradients:

$$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial w}$$

This allows us to update weights to minimize the loss function.

> **Key Insight**: Neural networks learn by adjusting weights to minimize the difference between predicted and actual outputs.

## Conclusion

Understanding these fundamentals is crucial for diving deeper into deep learning. In future posts, we'll explore more complex architectures like CNNs and RNNs.

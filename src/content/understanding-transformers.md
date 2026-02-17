## The Revolution in NLP

The Transformer architecture, introduced in the seminal paper "Attention Is All You Need" (2017), has fundamentally changed how we approach sequence modeling tasks.

### Self-Attention Mechanism

The core innovation is the **self-attention** mechanism, which allows the model to weigh the importance of different parts of the input sequence.

For each position, we compute:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

Where:
- $Q$ (Query): What we're looking for
- $K$ (Key): What we have
- $V$ (Value): The actual content
- $d_k$: Dimension of the keys (for scaling)

### Multi-Head Attention

Instead of a single attention function, transformers use **multi-head attention**:

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h)W^O$$

where each head is:

$$\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

### Positional Encoding

Since transformers don't have recurrence, we add positional information:

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

### Implementation Snippet

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super(SelfAttention, self).__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads
        
        self.queries = nn.Linear(embed_size, embed_size)
        self.keys = nn.Linear(embed_size, embed_size)
        self.values = nn.Linear(embed_size, embed_size)
        self.fc_out = nn.Linear(embed_size, embed_size)
    
    def forward(self, x):
        N, seq_length, _ = x.shape
        
        Q = self.queries(x)
        K = self.keys(x)
        V = self.values(x)
        
        # Split into heads
        Q = Q.view(N, seq_length, self.heads, self.head_dim)
        K = K.view(N, seq_length, self.heads, self.head_dim)
        V = V.view(N, seq_length, self.heads, self.head_dim)
        
        # Attention scores
        energy = torch.einsum("nqhd,nkhd->nhqk", [Q, K])
        attention = F.softmax(energy / (self.head_dim ** 0.5), dim=3)
        
        out = torch.einsum("nhql,nlhd->nqhd", [attention, V])
        out = out.reshape(N, seq_length, self.embed_size)
        
        return self.fc_out(out)
```

### Why Transformers Matter

- **Parallelization**: Unlike RNNs, all positions can be computed simultaneously
- **Long-range dependencies**: Self-attention can directly connect distant positions
- **Scalability**: The architecture scales well to large datasets and model sizes

## Applications

Transformers power:
- GPT series (language generation)
- BERT (language understanding)
- Vision Transformers (image classification)
- DALL-E (image generation)

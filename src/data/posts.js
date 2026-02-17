// ============================================================
// BLOG POSTS METADATA
// ============================================================
// To add a new blog post:
// 1. Add metadata to blogPosts array below
// 2. Create a new .md file in src/content/ with the same slug name
// 3. Import it in src/content/index.js
// 4. That's it! Your post will appear on the home page
// ============================================================

export const blogPosts = [
  {
    slug: 'getting-started-with-neural-networks',
    title: 'Getting Started with Neural Networks',
    excerpt: 'A beginner-friendly introduction to neural networks, covering the basics of perceptrons, activation functions, and backpropagation.',
    date: 'February 15, 2026',
    tags: ['Machine Learning', 'Deep Learning'],
    coverImage: null, // Add image URL here, e.g., '/images/neural-nets.jpg'
    readTime: '8 min read'
  },
  {
    slug: 'understanding-transformers',
    title: 'Understanding Transformers: Attention Is All You Need',
    excerpt: 'A deep dive into the transformer architecture, self-attention mechanisms, and why they revolutionized NLP.',
    date: 'February 10, 2026',
    tags: ['NLP', 'Transformers', 'AI'],
    coverImage: null,
    readTime: '12 min read'
  },
  {
    slug: 'calculus-for-ml',
    title: 'Calculus Essentials for Machine Learning',
    excerpt: 'The mathematical foundations you need: derivatives, gradients, and chain rule explained with practical examples.',
    date: 'February 5, 2026',
    tags: ['Mathematics', 'Machine Learning'],
    coverImage: null,
    readTime: '10 min read'
  }
]

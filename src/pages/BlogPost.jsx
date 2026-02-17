import { useParams, Link } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { blogPosts } from '../data/posts'
import { blogContents } from '../content'

function BlogPost() {
  const { slug } = useParams()
  
  const post = blogPosts.find(p => p.slug === slug)
  const content = blogContents[slug]
  
  if (!post) {
    return (
      <div className="blog-post">
        <Link to="/" className="back-link">
          ← Back to all posts
        </Link>
        <h1>Post not found</h1>
        <p>Sorry, the blog post you're looking for doesn't exist.</p>
      </div>
    )
  }
  
  return (
    <article className="blog-post">
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>
      
      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime || '5 min read'}</span>
        </div>
      </header>
      
      {post.coverImage && (
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="blog-post-cover"
        />
      )}
      
      <MarkdownRenderer content={content} />
    </article>
  )
}

export default BlogPost

import { Link } from 'react-router-dom'

function BlogCard({ post }) {
  const { slug, title, excerpt, date, tags, coverImage, readTime } = post
  
  return (
    <Link to={`/blog/${slug}`} style={{ textDecoration: 'none' }}>
      <article className="blog-card">
        {coverImage && (
          <img 
            src={coverImage} 
            alt={title} 
            className="blog-card-image"
          />
        )}
        {!coverImage && (
          <div className="blog-card-image" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fef3eb 0%, #fde8d8 100%)'
          }}>
            <span style={{ fontSize: '3rem', color: '#e07a3c' }}>✦</span>
          </div>
        )}
        <div className="blog-card-content">
          {tags && tags.length > 0 && (
            <div className="blog-card-tags">
              {tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <h3>{title}</h3>
          <p>{excerpt}</p>
          <div className="blog-card-meta">
            <span>{date}</span>
            <span>{readTime || '5 min read'}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard

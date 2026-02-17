import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/posts'
import { ideas } from '../data/ideas'

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Karan's AI Blog</h1>
        <p>
          With AI growing so fast, This blog is how I keep track of my ideas/knowledge on everything AI. 
        </p>
      </section>

      <section className="ideas-section">
        <h2 className="ideas-title">🧠 What's on my mind</h2>
        <div className="ideas-grid">
          {ideas.map((idea, index) => (
            <div key={index} className={`idea-card ${idea.status}`}>
              <span className="idea-status">{idea.status === 'next' ? '→ Next' : idea.status === 'exploring' ? '🔍 Exploring' : '💭 Idea'}</span>
              <p className="idea-text">{idea.text}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="blog-grid">
        {blogPosts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>
    </>
  )
}

export default Home

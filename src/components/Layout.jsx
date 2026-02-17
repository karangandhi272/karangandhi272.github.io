import { Link } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              Karan Gandhi
            </Link>
          </div>
        </div>
      </header>
      
      <main>
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Karan Gandhi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

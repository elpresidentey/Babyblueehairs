import { Link, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="nav">
          <Link className="logo" to="/">
            Bobo Omoge
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <Link className="btn btn-primary nav-cta" to="/contact">
            Book a demo
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="footer">
        <div>
          <p className="footer-title">Bobo Omoge</p>
          <p className="footer-copy">Responsive React starter · Built with Vite</p>
        </div>
        <div className="footer-links">
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React Docs
          </a>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            Vite Docs
          </a>
        </div>
      </footer>
    </div>
  );
}

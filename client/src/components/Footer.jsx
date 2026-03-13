import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#home" className="f-logo"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          K<span>Builds</span>
        </a>
        <p className="f-copy">© 2026 Karthik V · Kumaraguru College of Technology, Coimbatore</p>
        <p className="f-right">Designed &amp; Built by Karthik</p>
      </div>
    </footer>
  )
}

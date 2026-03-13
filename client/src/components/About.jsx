import './About.css'

const INFO = [
  { icon: '🎓', title: 'MCA — 1st Year',          sub: 'Kumaraguru College of Technology, Coimbatore' },
  { icon: '📘', title: 'BCA — Completed',          sub: 'Background in Computer Applications' },
  { icon: '💻', title: 'Full Stack Interest',      sub: 'Web development front to back' },
  { icon: '📍', title: 'Open to Opportunities',    sub: 'Internships & fresher roles' },
  { icon: '📞', title: '+91 88388 60647',           sub: 'vkkarthik2005@gmail.com' },
  { icon: '🚀', title: 'Goal-Driven',              sub: 'Seeking first industry role' },
]

export default function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="about-grid">

          <div className="about-left reveal-left">
            <span className="label">01 — About Me</span>
            <h2 className="title">Building With<br /><em>Purpose.</em></h2>
            <div className="about-text">
              <p>
                I'm <strong>Karthik V</strong> — an MCA 1st year student at <strong>Kumaraguru College of Technology, Coimbatore</strong>. I completed my BCA and bring a strong academic foundation to every project I work on.
              </p>
              <p>
                I'm passionate about <strong>full stack web development</strong> and love turning ideas into clean, functional digital products. I'm actively seeking internships and fresher opportunities to grow as a developer in the industry.
              </p>
            </div>
            <a href="mailto:vkkarthik2005@gmail.com" className="btn btn-primary about-cta">
              Say Hello →
            </a>
          </div>

          <div className="about-right reveal-right">
            <div className="info-grid">
              {INFO.map(item => (
                <div className="info-card" key={item.title}>
                  <span className="ic-icon">{item.icon}</span>
                  <div className="ic-text">
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

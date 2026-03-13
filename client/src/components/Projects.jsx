import './Projects.css'

const PROJECTS = [
  {
    num:      '01',
    title:    'SocialConnect',
    desc:     'A full-stack social media CRUD application built with React. Users can create, read, update, and delete posts — with a clean modern UI and smooth state management.',
    tags:     ['React', 'JavaScript', 'CSS', 'CRUD'],
    featured: true,
  },
  {
    num:      '02',
    title:    'Rock Paper Scissors',
    desc:     'A browser-based Rock Paper Scissors game against the computer. Features score tracking, animated results, and a fully responsive layout.',
    tags:     ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <span className="label reveal">03 — Projects</span>
        <h2 className="title reveal d1">Things I've <em>Built.</em></h2>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className={`proj-card reveal d${i + 1} ${p.featured ? 'proj-feat' : ''}`}>
              <div className="proj-glow" />
              <span className="proj-num">{p.num}</span>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-foot">
                <div className="proj-tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
                <span className="parrow">↗</span>
              </div>
            </div>
          ))}
        </div>

        <p className="proj-note reveal d3">
          More projects coming soon — actively building &amp; learning every day.
        </p>
      </div>
    </section>
  )
}

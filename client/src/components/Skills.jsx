import { useEffect, useRef } from 'react'
import './Skills.css'

const BARS = [
  { name: 'HTML & CSS',  pct: 88 },
  { name: 'JavaScript', pct: 75 },
  { name: 'React',      pct: 68 },
  { name: 'Java',       pct: 72 },
]

const TOOLS  = ['VS Code', 'Git & GitHub', 'Figma (Learning)', 'Chrome DevTools']
const OTHERS = ['Problem Solving', 'Responsive Design', 'REST APIs', 'Teamwork']

function Bar({ name, pct }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => { el.style.width = pct + '%' }, 180)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [pct])
  return (
    <div className="sbar">
      <div className="sbar-top">
        <span>{name}</span><span className="sp">{pct}%</span>
      </div>
      <div className="sbar-track">
        <div className="sbar-fill" ref={ref} style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <span className="label reveal">02 — Skills</span>
        <h2 className="title reveal d1">My <em>Toolkit.</em></h2>

        <div className="sk-cols">
          <div className="sk-col reveal d1">
            <h3 className="sk-head"><span className="sk-n">01</span> Languages &amp; Frameworks</h3>
            <div className="sk-bars">
              {BARS.map(b => <Bar key={b.name} {...b} />)}
            </div>
          </div>

          <div className="sk-col reveal d2">
            <h3 className="sk-head"><span className="sk-n">02</span> Tools</h3>
            <div className="tag-wrap">
              {TOOLS.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>

          <div className="sk-col reveal d3">
            <h3 className="sk-head"><span className="sk-n">03</span> Soft Skills</h3>
            <div className="tag-wrap">
              {OTHERS.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { NavLink } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <span aria-hidden="true">🌻</span>
          <span>Квіти Перемоги</span>
        </div>

        <p className="footer-text">
          © 2026 Автор: Яцентюк Ілля, КЗ &quot;Ліцей Нових Технологій Навчання&quot; КМР.
          «Квіти Перемоги».
        </p>

        <nav className="footer-links" aria-label="Навігація у футері">
          <NavLink to="/">Головна</NavLink>
          <NavLink to="/flowers">Квіти</NavLink>
          <NavLink to="/gallery">Галерея</NavLink>
          <NavLink to="/kaleidoscope">Калейдоскоп</NavLink>
        </nav>
      </div>
    </footer>
  )
}


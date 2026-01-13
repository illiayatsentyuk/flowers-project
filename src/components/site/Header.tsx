import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

type NavItem = { to: string; label: string }

export function Header() {
  const items: NavItem[] = useMemo(
    () => [
      { to: '/', label: 'Головна' },
      { to: '/flowers', label: 'Квіти' },
      { to: '/gallery', label: 'Галерея' },
      { to: '/kaleidoscope', label: 'Калейдоскоп' },
    ],
    [],
  )

  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return
    function handleClick(e: MouseEvent) {
      if (!navRef.current) return
      const target = e.target as Node | null
      if (!navRef.current.contains(target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [isOpen])

  return (
    <header className="site-header">
      <div className="container header-content">
        <NavLink to="/" className="site-logo" aria-label="Квіти Перемоги — на головну">
          <span className="logo-icon" aria-hidden="true">
            🌻
          </span>
          <span className="site-title">Квіти Перемоги</span>
        </NavLink>

        <nav className="main-nav" aria-label="Головна навігація" ref={navRef}>
          <button
            className="nav-toggle"
            aria-label="Меню"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            type="button"
          >
            {isOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-list ${isOpen ? 'active' : ''}`}>
            {items.map((it) => (
              <li key={it.to}>
                <NavLink
                  to={it.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={it.to === '/'}
                >
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}


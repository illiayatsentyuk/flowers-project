import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export function HomePage() {
  useEffect(() => {
    document.title = 'Квіти Перемоги — Символи української надії'
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <img src="/img/hero-bg.jpg" alt="Поле соняшників та маків" loading="eager" />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">Квіти Перемоги</h1>
          <p className="hero-motto">«Квіти розквітають після дощу — як Україна після бурі.»</p>
          <p className="hero-subtitle">
            Кожна квітка — це частинка української душі. Вони несуть у собі силу, стійкість і
            красу нашого народу. Життя перемагає, надія квітне.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Символи нашої землі</h2>
          <p className="section-subtitle">
            Українські квіти — це не просто рослини. Це живі символи нашої історії, культури та
            незламного духу. Вони квітнуть навіть у найтемніші часи, нагадуючи нам про красу та
            силу життя.
          </p>

          <div className="cards-grid">
            <div className="card cta-card">
              <div className="cta-icon">🌻</div>
              <h3 className="card-title">Квіти України</h3>
              <p className="card-text">
                Дізнайтесь про соняшники, маки та калину — квіти, що стали символами української
                сили та надії.
              </p>
              <Link to="/flowers" className="card-link">
                Дізнатися більше <span>→</span>
              </Link>
            </div>

            <div className="card cta-card">
              <div className="cta-icon">🖼️</div>
              <h3 className="card-title">Галерея</h3>
              <p className="card-text">
                Помилуйтесь красою українських квітів у нашій фотогалереї з інтерактивним слайдером.
              </p>
              <Link to="/gallery" className="card-link">
                Переглянути <span>→</span>
              </Link>
            </div>

            <div className="card cta-card">
              <div className="cta-icon">✨</div>
              <h3 className="card-title">Калейдоскоп</h3>
              <p className="card-text">
                Створіть власний квітковий візерунок! Інтерактивна сторінка, де ви можете
                експериментувати з кольорами та формами.
              </p>
              <Link to="/kaleidoscope" className="card-link">
                Творити <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blue">
        <div className="container">
          <h2 className="section-title">Надія квітне завжди</h2>
          <p className="section-subtitle">
            Цей проект присвячений силі та красі України. Квіти — це символи життя, яке завжди
            перемагає темряву. Вони нагадують нам, що після кожної бурі обов&apos;язково прийде весна, а
            після кожного випробування — відродження.
          </p>
          <div className="text-center">
            <Link to="/flowers" className="btn btn-accent">
              Розпочати подорож 🌷
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}


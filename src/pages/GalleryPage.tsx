import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type Slide = {
  src: string
  alt: string
  title: string
  text: string
}

export function GalleryPage() {
  useEffect(() => {
    document.title = 'Галерея квітів | Квіти Перемоги'
  }, [])

  const slides: Slide[] = useMemo(
    () => [
      {
        src: '/img/sunflower.jpg',
        alt: 'Соняшник у полі',
        title: 'Соняшник',
        text: 'Золоте сонце українських полів, символ надії та світла',
      },
      {
        src: '/img/poppy.jpg',
        alt: 'Червоний мак',
        title: 'Мак',
        text: "Квітка пам'яті, що нагадує про тих, хто захищав нашу землю",
      },
      {
        src: '/img/kalyna.jpg',
        alt: 'Калина з ягодами',
        title: 'Калина',
        text: 'Священний символ роду та відродження України',
      },
      {
        src: '/img/cornflower.jpg',
        alt: 'Волошка у пшениці',
        title: 'Волошка',
        text: 'Синя квітка, що прикрашає золоті пшеничні поля',
      },
      {
        src: '/img/chamomile.jpg',
        alt: 'Ромашки на лузі',
        title: 'Ромашка',
        text: 'Ніжна квітка українських луків, символ чистоти та кохання',
      },
      {
        src: '/img/tulip.jpg',
        alt: 'Тюльпани весною',
        title: 'Тюльпан',
        text: 'Вісник весни та нового життя, барвиста окраса садів',
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const goTo = (next: number) => {
    const wrapped = ((next % slides.length) + slides.length) % slides.length
    setIndex(wrapped)
  }

  useEffect(() => {
    if (isPaused) return
    const t = window.setInterval(() => goTo(index + 1), 5000)
    return () => window.clearInterval(t)
  }, [index, isPaused])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goTo(index - 1)
        return
      }
      if (e.key === 'ArrowRight') {
        goTo(index + 1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index])

  useEffect(() => {
    const wrapper = sliderRef.current
    if (!wrapper) return

    let touchStartX = 0
    let touchEndX = 0

    const handleStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }
    const handleEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      const diff = touchStartX - touchEndX
      const threshold = 50
      if (Math.abs(diff) > threshold) {
        if (diff > 0) goTo(index + 1)
        else goTo(index - 1)
      }
    }

    wrapper.addEventListener('touchstart', handleStart, { passive: true })
    wrapper.addEventListener('touchend', handleEnd, { passive: true })

    return () => {
      wrapper.removeEventListener('touchstart', handleStart)
      wrapper.removeEventListener('touchend', handleEnd)
    }
  }, [index])

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Галерея квітів</h1>
          <p>Краса української природи в фотографіях</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-subtitle">
            Гортайте слайдер, щоб насолодитися красою українських квітів. Використовуйте кнопки або
            клавіші ← → для навігації.
          </p>

          <div
            className="slider-container"
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="slider-wrapper" aria-live="polite">
              <div className="slides" style={{ transform: `translateX(${-index * 100}%)` }}>
                {slides.map((s, i) => (
                  <div
                    className="slide"
                    key={s.title}
                    aria-hidden={i !== index}
                  >
                    <img src={s.src} alt={s.alt} />
                    <div className="slide-caption">
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="slider-btn prev" aria-label="Попередній слайд" onClick={() => goTo(index - 1)}>
              ❮
            </button>
            <button className="slider-btn next" aria-label="Наступний слайд" onClick={() => goTo(index + 1)}>
              ❯
            </button>

            <div className="slider-dots" role="tablist" aria-label="Вибір слайду">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Слайд ${i + 1}`}
                  aria-current={i === index}
                  type="button"
                />
              ))}
            </div>
          </div>

          <p className="text-center mt-lg hint">
            Підказка: Слайдер автоматично змінює фото кожні 5 секунд. Наведіть курсор, щоб
            зупинити автопрокрутку.
          </p>
        </div>
      </section>

      <section className="section section-blue">
        <div className="container text-center">
          <h2 className="section-title">Створіть власну квітку!</h2>
          <p className="section-subtitle">
            Відвідайте мій інтерактивний калейдоскоп і створіть унікальний квітковий візерунок
          </p>
          <Link to="/kaleidoscope" className="btn btn-accent">
            Спробувати калейдоскоп
          </Link>
        </div>
      </section>
    </>
  )
}


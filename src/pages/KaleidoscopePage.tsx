import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type PresetKey = '' | 'sunflower' | 'poppy' | 'kalyna' | 'cornflower' | 'chamomile' | 'tulip'

type Settings = {
  petalColor: string
  centerColor: string
  bgColor: string
  petalCount: number
}

const STORAGE_KEY = 'kaleidoscope'

const DEFAULTS: Settings = {
  petalColor: '#FFD700',
  centerColor: '#5D4E37',
  bgColor: '#E8F4FD',
  petalCount: 8,
}

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(n)))
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToHex(h: number, s: number, l: number): string {
  s = s / 100
  l = l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (h < 60) {
    r = c
    g = x
  } else if (h < 120) {
    r = x
    g = c
  } else if (h < 180) {
    g = c
    b = x
  } else if (h < 240) {
    g = x
    b = c
  } else if (h < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }

  const toHex = (n: number) => {
    const val = Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, '0')
    return val
  }

  return '#' + toHex(r) + toHex(g) + toHex(b)
}

function lighten(hex: string, pct: number): string {
  const hsl = hexToHsl(hex)
  hsl.l = Math.min(100, hsl.l + pct)
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

function darken(hex: string, pct: number): string {
  const hsl = hexToHsl(hex)
  hsl.l = Math.max(0, hsl.l - pct)
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

function randomHsl(): string {
  const h = Math.floor(Math.random() * 360)
  const s = Math.floor(Math.random() * 40) + 60
  const l = Math.floor(Math.random() * 30) + 40
  return hslToHex(h, s, l)
}

function randomLightHsl(): string {
  const h = Math.floor(Math.random() * 360)
  const s = Math.floor(Math.random() * 30) + 20
  const l = Math.floor(Math.random() * 15) + 85
  return hslToHex(h, s, l)
}

export function KaleidoscopePage() {
  useEffect(() => {
    document.title = 'Квітковий калейдоскоп | Квіти Перемоги'
  }, [])

  const [preset, setPreset] = useState<PresetKey>('')
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return DEFAULTS
      const parsed = JSON.parse(raw) as Partial<Settings>
      return {
        petalColor: parsed.petalColor ?? DEFAULTS.petalColor,
        centerColor: parsed.centerColor ?? DEFAULTS.centerColor,
        bgColor: parsed.bgColor ?? DEFAULTS.bgColor,
        petalCount: clampInt(parsed.petalCount ?? DEFAULTS.petalCount, 6, 16),
      }
    } catch {
      return DEFAULTS
    }
  })

  const presets = useMemo<Record<Exclude<PresetKey, ''>, Settings>>(
    () => ({
      sunflower: { petalColor: '#FFD700', centerColor: '#5D4E37', bgColor: '#87CEEB', petalCount: 8 },
      poppy: { petalColor: '#E63946', centerColor: '#1D1D1D', bgColor: '#90EE90', petalCount: 8 },
      kalyna: { petalColor: '#C41E3A', centerColor: '#228B22', bgColor: '#F5F5DC', petalCount: 8 },
      cornflower: { petalColor: '#6495ED', centerColor: '#4B0082', bgColor: '#FFF8DC', petalCount: 8 },
      chamomile: { petalColor: '#FFFEF7', centerColor: '#F4C430', bgColor: '#98FB98', petalCount: 8 },
      tulip: { petalColor: '#FF6B6B', centerColor: '#228B22', bgColor: '#E6E6FA', petalCount: 8 },
    }),
    [],
  )

  useEffect(() => {
    if (!preset) return
    setSettings(presets[preset])
  }, [preset, presets])

  const flowerSvg = useMemo(() => {
    const cx = 200
    const cy = 200
    const petalLen = 55
    const petalW = 18
    const petalOffset = 75
    const numPetals = settings.petalCount

    const petalLightColor = lighten(settings.petalColor, 30)
    const petalDarkColor = darken(settings.petalColor, 15)
    const centerLightColor = lighten(settings.centerColor, 40)
    const centerDarkColor = darken(settings.centerColor, 20)

    const petals = Array.from({ length: numPetals }, (_, i) => {
      const angle = (360 / numPetals) * i
      return (
        <g key={i} transform={`rotate(${angle} ${cx} ${cy})`}>
          <ellipse
            className="petal"
            cx={cx}
            cy={cy - petalOffset}
            rx={petalW}
            ry={petalLen}
            fill="url(#pg)"
            stroke={petalDarkColor}
            strokeWidth="1.5"
          />
        </g>
      )
    })

    const centerDots = Array.from({ length: 8 }, (_, j) => {
      const dotAng = (45 * j * Math.PI) / 180
      const dx = cx + Math.cos(dotAng) * 14
      const dy = cy + Math.sin(dotAng) * 14
      const dotColor = lighten(settings.centerColor, 50)
      return <circle key={j} cx={dx} cy={dy} r="3" fill={dotColor} />
    })

    return { petals, centerDots, petalLightColor, centerLightColor, centerDarkColor }
  }, [settings.petalColor, settings.centerColor, settings.petalCount])

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>✨ Квітковий калейдоскоп</h1>
          <p>Створіть власний унікальний квітковий візерунок</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kaleidoscope-wrapper">
            <div className="kaleidoscope-display">
              <motion.div 
                className="flower-canvas" 
                animate={{ backgroundColor: settings.bgColor }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  id="flower-svg"
                  className="flower-svg"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Ваш квітковий візерунок"
                >
                  <defs>
                    <radialGradient id="pg" cx="50%" cy="0%" r="100%">
                      <stop offset="0%" stopColor={flowerSvg.petalLightColor} />
                      <stop offset="100%" stopColor={settings.petalColor} />
                    </radialGradient>
                    <radialGradient id="cg" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor={flowerSvg.centerLightColor} />
                      <stop offset="100%" stopColor={settings.centerColor} />
                    </radialGradient>
                  </defs>
                  <g className="petals">{flowerSvg.petals}</g>
                  <circle
                    cx="200"
                    cy="200"
                    r="32"
                    fill="url(#cg)"
                    stroke={flowerSvg.centerDarkColor}
                    strokeWidth="2"
                  />
                  <g className="dots">{flowerSvg.centerDots}</g>
                </svg>
              </motion.div>
            </div>

            <div className="kaleidoscope-controls">
              <h3 className="k-title">Налаштування</h3>

              <div className="control-group">
                <label htmlFor="petal-color">Колір пелюсток</label>
                <input
                  type="color"
                  id="petal-color"
                  value={settings.petalColor}
                  onChange={(e) => setSettings((s) => ({ ...s, petalColor: e.target.value }))}
                />
              </div>

              <div className="control-group">
                <label htmlFor="center-color">Колір серединки</label>
                <input
                  type="color"
                  id="center-color"
                  value={settings.centerColor}
                  onChange={(e) => setSettings((s) => ({ ...s, centerColor: e.target.value }))}
                />
              </div>

              <div className="control-group">
                <label htmlFor="bg-color">Фон</label>
                <input
                  type="color"
                  id="bg-color"
                  value={settings.bgColor}
                  onChange={(e) => setSettings((s) => ({ ...s, bgColor: e.target.value }))}
                />
              </div>

              <div className="control-group">
                <label htmlFor="petal-count">
                  Кількість пелюсток: <span className="range-value">{settings.petalCount}</span>
                </label>
                <input
                  type="range"
                  id="petal-count"
                  min={6}
                  max={16}
                  value={settings.petalCount}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, petalCount: clampInt(Number(e.target.value), 6, 16) }))
                  }
                />
              </div>

              <div className="control-group">
                <label htmlFor="flower-preset">Улюблена квітка</label>
                <select id="flower-preset" value={preset} onChange={(e) => setPreset(e.target.value as PresetKey)}>
                  <option value="">— Оберіть пресет —</option>
                  <option value="sunflower">🌻 Соняшник</option>
                  <option value="poppy">🌺 Мак</option>
                  <option value="kalyna">❤️ Калина</option>
                  <option value="cornflower">💙 Волошка</option>
                  <option value="chamomile">🌼 Ромашка</option>
                  <option value="tulip">🌷 Тюльпан</option>
                </select>
              </div>

              <div className="button-group">
                <button
                  id="random-btn"
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    setPreset('')
                    setSettings({
                      petalColor: randomHsl(),
                      centerColor: randomHsl(),
                      bgColor: randomLightHsl(),
                      petalCount: clampInt(Math.floor(Math.random() * 11) + 6, 6, 16),
                    })
                  }}
                >
                  Випадковий візерунок
                </button>
                <button
                  id="reset-btn"
                  className="btn btn-reset"
                  type="button"
                  onClick={() => {
                    setPreset('')
                    setSettings(DEFAULTS)
                    localStorage.removeItem(STORAGE_KEY)
                  }}
                >
                  ↺ Скинути
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Поради</h2>
          <div className="cards-grid">
            <div className="card cta-card">
              <h3 className="card-title">Експериментуйте</h3>
              <p className="card-text">
                Спробуйте різні комбінації кольорів. Контрастні кольори створюють яскраві візерунки!
              </p>
            </div>
            <div className="card cta-card">
              <h3 className="card-title">Пресети</h3>
              <p className="card-text">
                Оберіть улюблену квітку з випадаючого списку для швидкого налаштування.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


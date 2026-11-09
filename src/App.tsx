import { useEffect, useState } from 'react'

const HERO = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%231a5fa8'/%3E%3Ctext x='400' y='210' font-size='28' fill='white' text-anchor='middle'%3EVélo électrique pliable%3C/text%3E%3C/svg%3E"

export default function App() {
  const [showBanner, setShowBanner] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const [enCours, setEnCours] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowBanner(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Correction INP : le calcul est découpé en tranches. Entre chaque tranche,
  // setTimeout(0) rend la main au navigateur, qui peut répondre aux clics
  // et redessiner la page : le thread principal n'est jamais bloqué longtemps.
  function calculerPoints() {
    if (enCours) return
    setEnCours(true)
    setPoints(null)

    let total = 0
    let i = 0
    const MAX = 400_000_000
    const TRANCHE = 2_000_000

    function step() {
      const end = Math.min(i + TRANCHE, MAX)
      for (; i < end; i++) total += Math.sqrt(i) % 7
      if (i < MAX) {
        setTimeout(step, 0)
      } else {
        setPoints(Math.round(total % 1000))
        setEnCours(false)
      }
    }
    step()
  }

  return (
    <div className="page">
      {/* Correction CLS #2 : le conteneur du bandeau est toujours présent et
          réserve sa hauteur. Le bandeau apparaît en fondu (opacity) sans
          pousser le contenu. */}
      <div style={{ minHeight: '3rem' }}>
        <div
          className="banner"
          style={{ opacity: showBanner ? 1 : 0, transition: 'opacity 0.3s' }}
          aria-hidden={!showBanner}
        >
          🎉 Livraison offerte ce week-end !
        </div>
      </div>

      <h1>CycloShop</h1>

      {/* Correction CLS #1 / LCP : dimensions explicites, le navigateur
          réserve l'espace de l'image avant même de l'afficher. */}
      <img
        src={HERO}
        alt="Vélo électrique pliable"
        width={800}
        height={400}
        fetchPriority="high"
        style={{ aspectRatio: '800 / 400', width: '100%', height: 'auto' }}
      />

      <p>Le vélo électrique pliable le plus vendu de la boutique.</p>

      <button onClick={calculerPoints} disabled={enCours}>
        {enCours ? 'Calcul en cours…' : 'Calculer mes points fidélité'}
      </button>
      {points !== null && <p>Tu as {points} points fidélité.</p>}
    </div>
  )
}
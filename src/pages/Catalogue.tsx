import { useSearchParams } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

// Mission : /produits?tri=prix et /produits?tri=prix-asc affichent EXACTEMENT
// la même liste (duplicate content, 2 URLs pour le même contenu). Pose une
// balise canonique qui pointe toujours vers la version "prix".

export default function Catalogue() {
  const [params] = useSearchParams()
  const tri = params.get('tri')

  // Canonique fixe : quelle que soit l'URL d'arrivée (?tri=prix ou ?tri=prix-asc),
  // on indique à Google une seule version de référence.
  useDocumentMeta({
    title: 'Nos produits | CycloShop',
    canonical: 'https://cycloshop.exemple.fr/produits?tri=prix',
  })

  const sorted = tri === 'prix' || tri === 'prix-asc'
    ? [...products].sort((a, b) => a.price - b.price)
    : products

  return (
    <div className="page">
      <h1>Nos produits</h1>
      <ul>
        {sorted.map((p) => (
          <li key={p.id}>{p.name} - {p.price} €</li>
        ))}
      </ul>
    </div>
  )
}
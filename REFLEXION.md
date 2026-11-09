# REFLEXION.md

## 1. `robots.txt` empêche-t-il, à lui seul, le duplicate content entre `/produits?tri=prix` et `/produits?tri=prix-asc` ? Pourquoi ?

**Non.** `robots.txt` ne fait que bloquer l'**exploration** (le crawl) d'une URL.
Ici, les deux URLs sont autorisées, donc Google peut les explorer et voir deux pages
au contenu identique. Et même si on bloquait l'une des deux, elle pourrait quand même
être indexée si un lien externe pointe vers elle.
Le duplicate content est un problème d'**indexation**, pas d'exploration.

## 2. Pourquoi la balise canonique est-elle l'outil adapté ici, plutôt que `robots.txt` ou une meta `noindex` ?

La balise canonique dit explicitement à Google : « parmi ces URLs qui affichent le même
contenu, voici LA version de référence à indexer ». Google regroupe alors les signaux
(liens, popularité) des deux URLs sur la version `?tri=prix`.

- `robots.txt` empêcherait Google de lire `?tri=prix-asc` : il ne verrait même pas la
  canonique, et les signaux de cette URL seraient perdus.
- `noindex` retirerait la page de l'index, mais n'indiquerait pas quelle est la bonne
  version, et ne transmettrait pas ses signaux.

La canonique déduplique sans rien perdre : c'est l'outil fait pour ça.

## 3. Si demain `/admin` existe sur ce site et ne doit jamais être exploré par Google, quelle ligne ajoutes-tu dans `robots.txt` ?

`Disallow: /admin` (sous `User-agent: *`), déjà présente dans notre `robots.txt`.
Attention : `robots.txt` est public et seulement indicatif. Une vraie page d'admin doit
surtout être protégée par une **authentification**.
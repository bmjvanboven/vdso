# TODO — VDSO Website

Aantekeningen omgezet naar takenlijst. Ongesorteerd op prioriteit — nog te bepalen.

## SEO & Marketing
- [x] Basis SEO instellen: unieke meta titles/descriptions per pagina (homepage, aanbod, elke autopagina dynamisch), Open Graph + Twitter cards, canonical URLs, sitemap.xml en robots.txt (domein: vdso.nl)
- [x] SEO-afbeelding (og:image) ingesteld als standaard deel-voorbeeld voor homepage/overige pagina's
- [x] Google My Business (GMB) profiel aanmaken/koppelen

## Branding & Logo
- [x] Logomapje (logo-assets verzameld/aangeleverd: nieuw logo + SEO-afbeelding)
- [x] Nieuw uitgewerkt logo toegevoegd in header (Nav, iets kleiner), splashscreen (PageLoader), footers (homepage + aanbod) en wachtwoordscherm (PreviewGate)
- [x] Admin-kant (dashboard sidebar + inlogpagina) ook naar nieuw logo bijgewerkt

## Contact & Communicatie
- [x] Extra blok voor inkoop → koppelen aan e-mail (Inkoop-sectie heeft "Bied uw auto aan"-knop + zichtbare inkoop@vdso.nl link)
- [x] 06-nummer bovenaan tonen, op elke pagina (desktop stond al in de nav; mobiel bel-icoon toegevoegd naast hamburgermenu, altijd zichtbaar)
- [ ] Handtekening (e-mailhandtekening?) toevoegen

## Content & Copy
- [x] Statsbalk homepage: "Ervaring"/"Merken" vervangen door "Vermogen 500+ Pk om van te dromen" en "Passie 100% Voor performance auto's"
- [x] Tabblad "Verkoop je auto aan ons" toevoegen (nieuwe pagina /verkopen: proces in 4 stappen, voordelen, CTA's — informatief, geen formulier; nav-item "Verkopen" toegevoegd, opgenomen in sitemap)
- [x] Merken uit de hero-sectie verwijderen
- [x] "Erkend" i.p.v. BOVAG overal — vervangen door "RDW erkend"
- [x] "12 maanden garantie" weghalen / garantie-tegel uit statsbalk weghalen
- [x] "10 jaar in de branche" toevoegen als tekst (stond al in de statsbalk: "10+ Jaar in de branche")
- [x] Foto van het pand onderaan + Stijn + "ons verhaal"-sectie (bio van Stijn verwerkt in "Op afspraak"-sectie i.p.v. losse sectie; pand-foto blijft staan; contactgegevens verplaatst naar subtiel blok eronder + correct adres/KvK toegevoegd)
- [x] "Geopend" → vervangen door "op afspraak" i.p.v. "showroom"
- [x] Openingstijden: uitsluitend "altijd op afspraak" vermelden
- [x] "Lening" weghalen, "inkoop" i.p.v. daarvan tonen (Financiering-sectie op homepage vervangen door "Auto verkopen"-blok met "Bied uw auto aan"-CTA)
- [x] 160-punts check: andere/betere verwoording → "Grondig gecontroleerd"
- [ ] Verwoording nog eventueel laten checken
- [x] Streepjes (AI-em-dashes "—" in lopende tekst) weggehaald uit marketingcopy
- [x] Informatief blok met auto's weghalen (autokaarten van homepage af; "Uitgelicht aanbod"-blok samengevoegd met "Curated selectie"-blok)

## Structuur & Navigatie
- [x] "Bied uw auto aan" i.p.v. "inkoop"-blok — menu wordt geen "inruil"
- [x] "Occasion" en "Aanbod" samenvoegen tot 1 als het blok weg is (nav "Aanbod" linkt naar /aanbod-pagina; nav-item "Occasions" hernoemd naar "Werkwijze" voor het samengevoegde blok)

## Functionaliteit / Admin
- [x] **Bug:** in admin bij optievelden kan de standaardwaarde "0" niet leeg gemaakt worden (moet er nu voor typen) — veld volledig vrij invulbaar/leegbaar maken
- [x] Nieuwe status toevoegen: "wordt verwacht"
- [x] Voorvertoning autopagina/gallerij aanpassen (mozaïek-gallerij + klik-to-zoom lightbox, naar voorbeeld van klant)
- [x] Admin: foto's volgorde kunnen verschuiven (drag & drop)
- [x] Admin: meerdere foto's tegelijk kunnen uploaden
- [x] Admin: foto's automatisch comprimeren bij upload + max bestandsgrootte (20MB)
- [x] Admin: volgorde van auto's kunnen verslepen — bepaalt ook de volgorde op de website (nieuwe sort_order kolom in database)

## Techniek
- [x] Cronjob voor database instellen
- [x] Cronjob instellen zodat Supabase niet automatisch uitschakelt (Vercel Cron → `/api/keepalive`, dagelijks 06:00 UTC, zie `vercel.json`)
- [x] Leesbare URL's voor autopagina's (bijv. /aanbod/bmw-m5-2025-{id} i.p.v. kale UUID) — oude links redirecten automatisch mee

## Design (extern — Claude Design)
- [ ] Briefpapier maken
- [ ] Visitekaartje opzetten
- [ ] Factuur sjabloon maken
- [x] Logo: de "O" in donkerblauw — asset staat klaar (los mapje)

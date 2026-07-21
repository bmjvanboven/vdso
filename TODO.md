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
- [x] **Bug:** Plan & Proefrit-formulier koppelen aan e-mailadres — Resend geïnstalleerd en gekoppeld; staat nu op test-adres (bmjvanboven@gmail.com, Resend-testmodus staat alleen dit adres toe), moet naar info@vdso.nl zodra het vdso.nl-domein geverifieerd is op resend.com/domains
- [x] Proefrit-formulier toont nu een echte foutmelding bij een mislukte submit (i.p.v. altijd "Aanvraag ontvangen"), incl. laadstatus op de verstuurknop

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
- [x] Auto-teller / pk-teller toevoegen op homepage — echte som van het vermogen van alle auto's op voorraad (niet verkocht), exact getal, geen afronding
- [x] Aanbod: modelnamen ("Stage RS, M-serie, AMG") weghalen — vervangen door "uitsluitend de beste occasions" (Aanbod-pagina tekst + meta-omschrijving)
- [x] Werkwijze: 4e vlakje toegevoegd — "Documentatie: Volledig transparant" (concept, mag nog aangepast worden) naast Inspectie/Rijhistorie/Certificering
- [x] "Grondig gecontroleerd" → gewijzigd naar "Grondige meerpuntscheck"
- [ ] "Vrije historie verwezenlijkt" weghalen bij auto's die zelf zijn ingekocht (heeft niks met RDW te maken) — dit is per-auto omschrijving/kenmerken-content in admin, geen vaste tekst in de code
- [ ] "RDW erkend" herzien → evt. "persoonlijke puntscheck" i.p.v. RDW-verwijzing (nog 2 nieuwe schema's/teksten bedenken)
- [x] Over mij / bio: lange zin over Stijn opgedeeld in kortere zinnen (ook meteen "Stijnn" → "Stijn" en "automotivegezin" → "automotive gezin" gecorrigeerd)
- [x] Tekstblok bij "Op afspraak": op verzoek juist de zin "Wij ontvangen u uitsluitend op afspraak…" ónder de knoppenrij geplaatst (i.p.v. het oorspronkelijke idee om "Maak kennis in persoon" erboven te zetten)
- [ ] Overwegen: foto van Stijn (met hond/kantoor/koffie-apparaat) voor persoonlijke touch

## Structuur & Navigatie
- [x] "Bied uw auto aan" i.p.v. "inkoop"-blok — menu wordt geen "inruil"
- [x] "Occasion" en "Aanbod" samenvoegen tot 1 als het blok weg is (nav "Aanbod" linkt naar /aanbod-pagina; nav-item "Occasions" hernoemd naar "Werkwijze" voor het samengevoegde blok)
- [x] Inkoop, Verkopen en Consignatie samengevoegd tot 1 nieuwe pagina "Diensten" (/diensten, zelfde blok-lay-out als homepage aangehouden). Nav-items "Inkoop"/"Verkopen"/"Consignatie" vervangen door 1 link "Diensten"; homepage-secties zelf blijven vooralsnog ongewijzigd staan. "Auto verkopen"-blok linkt door naar de bestaande, uitgebreidere /verkopen-pagina voor wie meer wil weten
- [ ] Homepage-blokjes (inkoop/verkoop/consignatie) prominenter maken (stijl "aanbod") of vervangen door buttons die doorlinken naar /diensten
- [ ] Later overwegen: pagina's verzekering/financiering toevoegen (i.v.m. lopend gesprek) — niet meteen bij livegang
- [x] Footer: dode "#"-links opgeschoond — "Garantie", "Veelgestelde vragen", "Nieuws", "Carrière", "Pers" (wezen nergens naartoe) verwijderd; "Ons verhaal" en "RDW erkenning" wijzen nu naar bestaande secties op de homepage
- [x] Footer-merklinks ("Mercedes", "BMW M-series", "Porsche") verwijderd — linkten allemaal naar dezelfde algemene /aanbod-pagina zonder echte filter; vervangen door een link naar de nieuwe /diensten-pagina

## Functionaliteit / Admin
- [x] **Bug:** in admin bij optievelden kan de standaardwaarde "0" niet leeg gemaakt worden (moet er nu voor typen) — veld volledig vrij invulbaar/leegbaar maken
- [x] Nieuwe status toevoegen: "wordt verwacht"
- [x] Voorvertoning autopagina/gallerij aanpassen (mozaïek-gallerij + klik-to-zoom lightbox, naar voorbeeld van klant)
- [x] Admin: foto's volgorde kunnen verschuiven (drag & drop)
- [x] Admin: meerdere foto's tegelijk kunnen uploaden
- [x] Admin: foto's automatisch comprimeren bij upload + max bestandsgrootte (20MB)
- [x] Admin: volgorde van auto's kunnen verslepen — bepaalt ook de volgorde op de website (nieuwe sort_order kolom in database)
- [x] **Bug:** bullets/genummerde lijsten uit geplakte omschrijving (bijv. vanuit ChatGPT) werden platte laptekst — ook opgelost voor lijsten zónder bullet-teken (bijv. gekopieerd vanuit een gerenderde chat-lijst, waar de streepjes soms wegvallen); 2+ losse regels zonder witregel worden nu ook herkend als lijst
- [x] Admin: live voorvertoning van de omschrijving (met bullets/nummering) onder het tekstveld bij het bewerken van een auto
- [ ] Foto's: RAW/NEF-bestanden van de camera automatisch laten omzetten naar webvriendelijk formaat (JPG) bij upload — comprimeren blijft staan zoals in admin
- [x] Losse regels/bullets in omschrijving: bolletjes blijven nu ook correct staan in de admin-editor zelf — live "- "/"* " → "• " tijdens typen, en geplakte tekst (bijv. vanuit ChatGPT) wordt direct genormaliseerd bij plakken
- [x] Verkochte auto's: niet-klikbaar maar wel zichtbaar laten staan (voor betrouwbaarheid/social proof) — evt. reviews vragen

## Techniek
- [x] Cronjob voor database instellen
- [x] Cronjob instellen zodat Supabase niet automatisch uitschakelt (Vercel Cron → `/api/keepalive`, dagelijks 06:00 UTC, zie `vercel.json`)
- [x] Leesbare URL's voor autopagina's (bijv. /aanbod/bmw-m5-2025-{id} i.p.v. kale UUID) — oude links redirecten automatisch mee

## Design (extern — Claude Design)
- [x] Briefpapier maken — sjabloon ingebouwd in admin (/admin/briefpapier), rechtstreeks bewerkbaar + PDF/Word export
- [x] Visitekaartje opzetten — sjabloon ingebouwd in admin (/admin/visitekaartje), voor-/achterkant bewerkbaar + PDF-export (met/zonder snijmarges)
- [x] Factuur sjabloon maken — sjabloon ingebouwd in admin (/admin/factuur), regels toevoegen/verwijderen + PDF/Word export
- [x] Logo: de "O" in donkerblauw — asset staat klaar (los mapje)

## Foto's
- [ ] iPhone-foto's algemeen scherper/beter belicht dan camera-foto's — camera-instelling (auto-stand werkt niet goed) verder uitzoeken
- [ ] Overbelichte foto (BMW, tegenlicht) opnieuw maken of bewerken
- [ ] Interieurfoto's met camera, rest evt. met iPhone — workflow bepalen voor mix
- [ ] LinkedIn-foto vervangen door nieuwere/betere foto (huidige is verouderd en lage kwaliteit)

## Visitekaartje
- [ ] Logo: blauwe variant → donkerder blauw gebruiken (zelfde blauw als in website-menu)
- [ ] Naam met dubbele "n" (Stijnn) corrigeren — controleren of layout automatisch meeschuift
- [ ] Kleurbalans logo/achtergrond herzien (grijs vs. blauw/zwart)
- [ ] Beslissen: "www." wel of niet voluit schrijven
- [ ] Instagram-handle op kaartje overwegen (icoon i.p.v. tekst, i.v.m. professionaliteit) — Instagram sowieso wel onderaan website toevoegen
- [ ] WhatsApp + telefoon + naam-koppelingen toevoegen op kaartje
- [ ] Titel "Eigenaar" onder naam toevoegen (voor als er personeel bijkomt)
- [ ] "Performance auto's" wijzigen naar bijv. "Passie voor automotive" (subtieler, minder prestatie-gericht)
- [ ] Contrast testen: donkerblauw logo op lichte achtergrond kaartje
- [ ] QR-code toevoegen op kaartje (linkt naar aanbod-pagina) — overweeg losse QR-sleutelhanger-optie voor later
- [ ] Eerste bestelling: 500 stuks, glans afwerking, dik karton
- [ ] Toekomstidee: spot-UV-lak alleen op logo (duurdere optie, later evt.)

## Legal & overig
- [ ] Cookies, privacybeleid en algemene voorwaarden checken/opstellen (welke gegevens worden opgeslagen?)
- [ ] Kentekenplaathouders/showplaten met logo bestellen
- [ ] Factuur/briefpapier: bepalen of dit via Exact loopt of los via de website (Word-opmaak gaf problemen)

## Voor livegang
- [ ] Demo-content van het aanbod verwijderen zodra site klaar is
- [ ] Website indexeren in Google zodra klaar
- [ ] Analytics toevoegen bij livegang

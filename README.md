# Asta Live — Fantacalcio 2026/27

Assistente d'asta per il Fantacalcio: durante la chiamata mostra quanto vale
un giocatore, tiene il conto dei crediti di tutte le squadre e segnala quando
qualcosa non torna — prima che sia troppo tardi per rimediare.

![PWA](https://img.shields.io/badge/tipo-PWA-blue)
![Offline](https://img.shields.io/badge/rete-funziona%20offline-success)
![No dependencies](https://img.shields.io/badge/dipendenze-zero-lightgrey)
![Vanilla JS](https://img.shields.io/badge/stack-HTML%20%2B%20JS%20puro-orange)

---

## Cos'è

Un file HTML singolo, senza server e senza librerie esterne, pensato per
essere aperto da telefono durante un'asta dal vivo. Non sostituisce chi
decide — decide sempre chi chiama l'asta — ma toglie il lavoro di calcolo
mentale sotto pressione: cerchi un nome, in mezzo secondo hai il tetto
consigliato e sai se stai comprando bene o stai strapagando.

Nato per una lega specifica a 12 squadre e 500 crediti, ma il regolamento
(squadre, crediti, composizione rosa, regole speciali) si configura dalla
schermata **Setup** senza toccare il codice.

## Come si installa

L'app gira interamente nel browser: non serve alcun negozio applicazioni.

1. Apri il link del sito con **Safari** (su iPhone) o **Chrome** (su Android)
2. Tocca il pulsante di condivisione
3. Scegli **"Aggiungi alla schermata Home"**

Da quel momento compare come un'icona autonoma. La prima apertura richiede
la rete — serve a scaricare i file una volta sola — dopodiché funziona anche
in modalità aereo, grazie a un service worker che tiene tutto in cache.

## Cosa fa

**Prima dell'asta**
- Calibrazione dei prezzi sulla propria lega, reparto per reparto
- Regole opzionali: modificatore difesa, bonus assist
- Lista obiettivi con controllo del budget di reparto

**Durante l'asta**
- Ricerca del giocatore con tetto di spesa calcolato in tempo reale
- Righello visivo che confronta l'offerta col prezzo atteso di mercato
- Tracciamento dei crediti e degli slot residui di tutte le squadre avversarie,
  con il calcolo di quanto ciascuna può ancora offrire
- Avvisi automatici: ritmo di spesa fuori controllo, reparto in ritardo,
  rivale rimasto senza crediti
- Annulla per correggere un errore di battitura

**Sui giocatori**
- Listone completo con titolarità attesa, rigoristi, tiratori di punizioni
  e calci d'angolo
- Elenco infortunati con la giornata di rientro stimata
- Griglia portieri per scegliere l'abbinamento titolare/riserva migliore

**Dopo l'asta**
- Riepilogo illustrato (il colpaccio, l'affare peggiore, il prezzo più alto
  pagato in assoluto), salvabile come immagine
- Esportazione delle rose in CSV o JSON

## Il modello di prezzo

Il valore di un giocatore non viene dal FVM diviso per due: quel numero è un
tetto teorico, non un prezzo di mercato. Il modello si basa su tre livelli
che si sommano:

1. **Curva di mercato per ruolo** — calibrata su quanto la propria lega paga
   davvero il giocatore più caro di ogni reparto, non su una media generica
2. **Indice di scarsità** — quante alternative restano libere rispetto agli
   slot ancora da riempire: il tetto sale quando le occasioni si esauriscono
3. **Ritaratura automatica durante l'asta** — se un reparto si paga sopra o
   sotto le attese, il denaro rimasto in circolazione per gli altri reparti
   si aggiusta di conseguenza, entro un limite del ±60%

Titolarità attesa e infortuni riducono il tetto in proporzione a quanto un
giocatore rischia di non scendere in campo.

## Struttura del repository

| File | Ruolo |
|---|---|
| `index.html` | L'intera applicazione: interfaccia, dati, logica |
| `sw.js` | Service worker: mette in cache i file per l'uso offline |
| `manifest.webmanifest` | Metadati per l'installazione come app (nome, icona, colori) |

Nessuna build, nessun `node_modules`, nessuna dipendenza da npm: si modifica
e si ricarica direttamente il file.

## Dati e fonti

- **Quotazioni e listone**: Fantacalcio.it
- **Titolarità, rigoristi, calci piazzati, infortuni**: FantaLab

Questi dati sono di proprietà dei rispettivi editori e vengono usati qui a
scopo personale, per un uso privato in una singola lega — non sono concessi
in licenza per la ridistribuzione. Tetti di prezzo, indice di scarsità e
ritaratura automatica sono elaborazioni originali di questo progetto, non
dati ufficiali.

## Limiti noti

- Calibrato su una lega specifica: chi lo riusa per un'altra lega deve
  ritarare i prezzi di riferimento nel Setup
- Nessun aggiornamento automatico del listone: quando cambia, i dati vanno
  ricaricati a mano
- Lo stato dell'asta vive nella memoria del browser di un solo dispositivo;
  la scheda Setup offre un backup testuale da copiare altrove come sicurezza
- Nessuna sincronizzazione fra più telefoni in tempo reale

## Licenza

Il codice è disponibile per essere letto, riutilizzato e adattato. I dati
sportivi incorporati restano di proprietà delle fonti citate sopra e non
rientrano in questa concessione.

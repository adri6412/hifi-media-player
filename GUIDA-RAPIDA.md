# 🎵 HiFi Media Player - Guida Rapida

## 🚀 Avvio Rapido su Windows

### Prima Installazione

1. **Assicurati di avere Node.js installato**
   - Scarica da [nodejs.org](https://nodejs.org/) (versione 18 LTS)
   - Verifica con: `node --version`

2. **Installa le dipendenze** (solo la prima volta):
   ```powershell
   npm install
   ```

3. **Avvia l'applicazione**:
   ```powershell
   # Modalità sviluppo (consigliata per test)
   npm run electron:dev
   
   # Oppure usa il batch
   .\start-dev.bat
   ```

### Avvii Successivi

Basta eseguire:
```powershell
.\start-dev.bat
```
oppure
```powershell
npm run electron:dev
```

## 🎮 Come Usare l'Applicazione

### Schermata Home
- Seleziona la sorgente musicale tra:
  - **Lyrion Server**: Interfaccia Material skin (richiede server attivo su localhost:9000)
  - **YouTube**: Interfaccia web di YouTube embedded
  - **Spotify**: Web player di Spotify embedded
  - **Internet Radio**: In arrivo

### Ogni App È Indipendente
- Ogni sorgente carica l'interfaccia web completa
- I controlli sono quelli nativi dell'app embedded
- Usa il pulsante "Home" per tornare alla selezione
- Usa "Open in Browser" se alcune funzionalità sono limitate

### Impostazioni
- Info di sistema (hostname, IP, versione)
- Configurazione rete
- Selezione dispositivo audio (placeholder)
- Tema chiaro/scuro

## 🧪 Test su Windows (risoluzione 1024x600)

### Metodo 1: DevTools (consigliato)
1. L'app si aprirà automaticamente con DevTools in modalità sviluppo
2. Premi `F12` se non sono visibili
3. Premi `Ctrl+Shift+M` per modalità responsive
4. Imposta risoluzione personalizzata: **1024 x 600**
5. Attiva simulazione touch (icona del mouse/touch in alto)

### Metodo 2: Finestra Manuale
1. Ridimensiona manualmente la finestra a 1024x600
2. La finestra è configurata per aprirsi già a questa dimensione

### Metodo 3: Monitor Secondario
Se hai un secondo monitor:
1. Vai in Impostazioni Display di Windows
2. Imposta risoluzione 1024x600 sul secondo monitor
3. Sposta l'app su quel monitor

## 📝 Comandi Utili

```powershell
# Installazione dipendenze
npm install

# Modalità sviluppo (hot reload)
npm run electron:dev

# Build per produzione
npm run build

# Avvio produzione (dopo build)
npm run electron

# Pulizia cache node_modules
Remove-Item -Recurse -Force node_modules
npm install
```

## 🔧 Risoluzione Problemi

### L'app non si avvia
```powershell
# Reinstalla dipendenze
Remove-Item -Recurse -Force node_modules
npm install
```

### Porta 5173 già in uso
- Chiudi altre istanze di Vite/applicazioni sulla porta 5173
- Oppure modifica la porta in `vite.config.js`

### WebView non carica YouTube/Spotify
- È normale, alcune funzionalità sono limitate in modalità embedded
- Usa il pulsante "Open in Browser" per funzionalità complete

### DevTools non si aprono
- Premi `F12` o `Ctrl+Shift+I`
- Verifica che sia modalità sviluppo (`npm run electron:dev`)

## 🎨 Personalizzazione

### Cambio Colori Tema
Modifica `tailwind.config.js`:
```javascript
colors: {
  'hifi-gold': '#d4af37',  // Cambia questo per l'accento principale
  // ... altri colori
}
```

### Modalità Fullscreen
Modifica `main/main.js`:
```javascript
fullscreen: true,  // Per fullscreen
// o
kiosk: true,       // Per modalità kiosk
```

### Rimuovi DevTools in Produzione
In `main/main.js`, commenta:
```javascript
// mainWindow.webContents.openDevTools();
```

## 📱 Deploy su DietPi

Quando sei pronto per il deploy sul dispositivo finale:

1. **Copia il progetto su DietPi**
2. **Esegui lo script di installazione**:
   ```bash
   chmod +x install-dietpi.sh
   ./install-dietpi.sh
   ```

3. **Avvia in fullscreen**:
   ```bash
   chmod +x start-fullscreen.sh
   ./start-fullscreen.sh
   ```

4. **Configura auto-avvio** (vedi README.md sezione Auto-start)

## 🔌 Configurazione Sorgenti

### Lyrion Server (Consigliato per collezione locale)
1. Installa Lyrion Music Server su DietPi:
   ```bash
   sudo apt install lyrionmusicserver
   # o scarica da lyrion.org
   ```
2. Lyrion si avvia su `http://localhost:9000`
3. Configura la tua libreria musicale in Lyrion
4. L'app caricherà automaticamente l'interfaccia Material

### YouTube
- Funziona subito, nessuna configurazione
- Caricato in iframe
- Alcune funzionalità potrebbero essere limitate (es. login)
- Usa "Open in Browser" per funzionalità complete

### Spotify
- Richiede account Spotify (Premium per playback)
- Caricato in iframe
- Login direttamente nell'interfaccia embedded
- Usa "Open in Browser" se hai problemi di login o funzionalità limitate

## 📚 Risorse

- **README.md**: Documentazione completa
- **main/main.js**: Processo principale Electron
- **src/App.jsx**: Applicazione React principale
- **src/pages/**: Componenti delle pagine
- **tailwind.config.js**: Configurazione stile

## 💡 Suggerimenti

1. **Sviluppo**: Usa sempre `npm run electron:dev` per vedere modifiche in tempo reale
2. **Test Touch**: Simula touch in DevTools per testare l'UI
3. **Performance**: Su DietPi, compila con `npm run build` per miglior performance
4. **Debug**: Console di Chrome in DevTools (F12) per debug

## ❓ Supporto

Per problemi o domande:
- Controlla la console DevTools (F12)
- Verifica i log nel terminale
- Consulta README.md per documentazione dettagliata

---

**Buon divertimento con il tuo HiFi Media Player! 🎶**


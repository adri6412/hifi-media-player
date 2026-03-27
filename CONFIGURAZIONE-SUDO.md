# Configurazione Sudo per DietPi

Per permettere all'app di eseguire comandi di sistema (aggiornamenti, riavvio, spegnimento, configurazione rete) senza richiedere password, è necessario configurare sudo.

## ⚠️ Attenzione
Questa configurazione permette all'utente `dietpi` di eseguire alcuni comandi di sistema senza password. Usare solo su sistemi dedicati e sicuri.

## 🔧 Configurazione

### 1. Accedi come root o usa sudo
```bash
sudo su
```

### 2. Crea file di configurazione sudoers
```bash
nano /etc/sudoers.d/hifi-player
```

### 3. Aggiungi queste righe
```
# Permetti comandi di sistema per HiFi Player
dietpi ALL=(ALL) NOPASSWD: /usr/bin/apt-get update
dietpi ALL=(ALL) NOPASSWD: /usr/bin/apt-get upgrade
dietpi ALL=(ALL) NOPASSWD: /sbin/reboot
dietpi ALL=(ALL) NOPASSWD: /sbin/shutdown
dietpi ALL=(ALL) NOPASSWD: /sbin/dhclient
dietpi ALL=(ALL) NOPASSWD: /sbin/ip
dietpi ALL=(ALL) NOPASSWD: /usr/bin/tee /etc/resolv.conf
```

### 4. Imposta permessi corretti
```bash
chmod 0440 /etc/sudoers.d/hifi-player
```

### 5. Verifica la configurazione
```bash
visudo -c
```

Dovresti vedere: `parsed OK`

### 6. Esci da root
```bash
exit
```

## ✅ Test

Prova i comandi senza password:

```bash
# Test update (non esegue realmente)
sudo apt-get update --help

# Test reboot (NON eseguire!)
# sudo reboot

# Test shutdown (NON eseguire!)
# sudo shutdown --help

# Test network
sudo dhclient --help
```

Se non chiede la password, la configurazione è corretta!

## 🔒 Sicurezza

### Limitare ulteriormente (opzionale)
Se vuoi essere più restrittivo, puoi specificare solo i comandi esatti:

```
dietpi ALL=(ALL) NOPASSWD: /usr/bin/apt-get update
dietpi ALL=(ALL) NOPASSWD: /usr/bin/apt-get upgrade -y
dietpi ALL=(ALL) NOPASSWD: /sbin/reboot
dietpi ALL=(ALL) NOPASSWD: /sbin/shutdown now
```

### Firewall
Assicurati di avere un firewall configurato se il dispositivo è esposto alla rete:

```bash
sudo apt-get install ufw
sudo ufw enable
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 9000/tcp  # Lyrion Server
```

## 🐛 Risoluzione Problemi

### "sudo: password required"
- Verifica che il file `/etc/sudoers.d/hifi-player` esista
- Controlla i permessi: `ls -l /etc/sudoers.d/hifi-player` (dovrebbe essere 440)
- Verifica sintassi: `sudo visudo -c`

### Comandi non funzionano
- Su DietPi, alcuni comandi potrebbero essere in path diversi
- Trova il path corretto con: `which comando`
- Esempio: `which reboot` → `/sbin/reboot`

### Update non funziona
L'app potrebbe richiedere più tempo per `apt-get upgrade`. Per test rapidi, usa solo `apt-get update` nelle settings.

## 📝 Note DietPi Specifiche

DietPi usa `dietpi-config` per molte configurazioni. Se preferisci, puoi integrare anche questi comandi:

```bash
dietpi ALL=(ALL) NOPASSWD: /boot/dietpi/dietpi-*
```

Ma attenzione: questo dà accesso a molti script di sistema!

## 🔄 Rimozione Configurazione

Per rimuovere i permessi:

```bash
sudo rm /etc/sudoers.d/hifi-player
```

---

**Configurazione completata!** 🎉

Ora l'app potrà eseguire aggiornamenti, riavvii e configurazioni di rete direttamente dall'interfaccia.


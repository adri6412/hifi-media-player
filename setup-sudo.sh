#!/bin/bash

# Script per configurare i privilegi sudo per l'app HiFi Media Player
# Questo script deve essere eseguito con privilegi di root

echo "Configurando i privilegi sudo per HiFi Media Player..."

# Aggiungi regola sudo per permettere all'utente di eseguire comandi di sistema senza password
# Sostituisci 'dietpi' con il tuo username se diverso
USERNAME=${SUDO_USER:-dietpi}

# Crea file di configurazione sudo per l'utente
sudo tee /etc/sudoers.d/hifi-media-player << EOF
# HiFi Media Player - System control permissions
$USERNAME ALL=(ALL) NOPASSWD: /sbin/reboot
$USERNAME ALL=(ALL) NOPASSWD: /sbin/shutdown
$USERNAME ALL=(ALL) NOPASSWD: /usr/bin/apt-get update
$USERNAME ALL=(ALL) NOPASSWD: /usr/bin/apt-get upgrade
$USERNAME ALL=(ALL) NOPASSWD: /sbin/dhclient
$USERNAME ALL=(ALL) NOPASSWD: /bin/ip
$USERNAME ALL=(ALL) NOPASSWD: /bin/echo
EOF

echo "Privilegi configurati per l'utente: $USERNAME"
echo "Ora l'app HiFi Media Player può eseguire comandi di sistema senza richiedere password."
echo ""
echo "IMPORTANTE: Riavvia l'applicazione per applicare le modifiche."
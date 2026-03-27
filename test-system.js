#!/usr/bin/env node

// Test script per verificare le funzioni di sistema
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function testSystemCommands() {
  console.log('🧪 Test delle funzioni di sistema HiFi Media Player\n');
  
  // Test 1: Verifica privilegi sudo
  console.log('1. Verifica privilegi sudo...');
  try {
    const { stdout } = await execAsync('sudo -n true');
    console.log('✅ Privilegi sudo configurati correttamente');
  } catch (error) {
    console.log('❌ Errore privilegi sudo:', error.message);
    console.log('   Esegui: sudo ./setup-sudo.sh');
    return;
  }
  
  // Test 2: Verifica comando reboot
  console.log('\n2. Test comando reboot (dry-run)...');
  try {
    const { stdout } = await execAsync('sudo -n reboot --help');
    console.log('✅ Comando reboot disponibile');
  } catch (error) {
    console.log('❌ Errore comando reboot:', error.message);
  }
  
  // Test 3: Verifica comando shutdown
  console.log('\n3. Test comando shutdown (dry-run)...');
  try {
    const { stdout } = await execAsync('sudo -n shutdown --help');
    console.log('✅ Comando shutdown disponibile');
  } catch (error) {
    console.log('❌ Errore comando shutdown:', error.message);
  }
  
  // Test 4: Verifica comando apt-get
  console.log('\n4. Test comando apt-get...');
  try {
    const { stdout } = await execAsync('sudo -n apt-get --version');
    console.log('✅ Comando apt-get disponibile');
  } catch (error) {
    console.log('❌ Errore comando apt-get:', error.message);
  }
  
  // Test 5: Verifica comando dhclient
  console.log('\n5. Test comando dhclient...');
  try {
    const { stdout } = await execAsync('sudo -n dhclient --help');
    console.log('✅ Comando dhclient disponibile');
  } catch (error) {
    console.log('❌ Errore comando dhclient:', error.message);
  }
  
  // Test 6: Verifica comando ip
  console.log('\n6. Test comando ip...');
  try {
    const { stdout } = await execAsync('sudo -n ip --help');
    console.log('✅ Comando ip disponibile');
  } catch (error) {
    console.log('❌ Errore comando ip:', error.message);
  }
  
  console.log('\n🎉 Test completato!');
  console.log('\nSe tutti i test sono passati, i pulsanti di sistema dovrebbero funzionare.');
  console.log('Se ci sono errori, esegui: sudo ./setup-sudo.sh');
}

testSystemCommands().catch(console.error);
// Test script to debug network interface detection
import os from 'os';

console.log('=== Network Interface Debug ===');
const interfaces = os.networkInterfaces();
console.log('All interfaces:', Object.keys(interfaces));

for (const [name, addrs] of Object.entries(interfaces)) {
  console.log(`\nInterface: ${name}`);
  console.log('Addresses:', addrs);
  
  if (name === 'lo' || name.startsWith('lo:')) {
    console.log('  -> Skipping loopback');
    continue;
  }
  
  const ipv4 = addrs.find(addr => addr.family === 'IPv4' && !addr.internal);
  if (ipv4) {
    console.log('  -> Found IPv4:', ipv4);
  } else {
    console.log('  -> No IPv4 found');
  }
}
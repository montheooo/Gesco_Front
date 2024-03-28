import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gesco.gescomobile',
  appName: 'Gesco_Front',
  webDir: 'dist/gesco-front/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;

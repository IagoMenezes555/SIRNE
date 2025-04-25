import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.onrange.sirne',
  appName: 'SIRNE',
  webDir: 'www',
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    }
  }
};

export default config;

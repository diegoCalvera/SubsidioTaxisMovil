import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.moviliza.subsidio.movil',
  appName: 'subsidio-taxis-movil',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      enableCameraPermissionDialog: true,
      disableBackCameraIfNotAvailable: true,
    },
  },
};

export default config;

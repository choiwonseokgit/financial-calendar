import path from 'path';
import { CracoConfig } from '@craco/types';

const config: CracoConfig = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@stores': path.resolve(__dirname, 'src/stores/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};

export default config;

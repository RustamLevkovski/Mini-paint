import { FB_CONFIG } from './../app/fb.config';
import { Environment } from './enviroment.interfce';

export const environment: Environment = {
  production: true,
  apiKey:  FB_CONFIG.apiKey,
  fbDbUrl: FB_CONFIG.fbDbUrl,
};

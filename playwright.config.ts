import {defineConfig, devices} from '@playwright/test'; 
import * as dotenv from 'dotenv';
import { config } from './src/config/configLoader';

dotenv.config();
export default defineConfig({
   testDir: './src',

   use:{
   baseURL: config.environnement.urlTest,
   screenshot: 'only-on-failure',
   video: 'retain-on-failure',
   actionTimeout: 10000,
   navigationTimeout: 20000
   },
   projects:[
    {
     name: 'chromium',
     use: { ...devices['Desktop Chrome'] },

    }

   ]




    
})


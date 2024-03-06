import { FullConfig } from '@playwright/test';

import { setupBookstoreAPI } from './setup-bookstore-api';
import { setupBookstore } from './setup-bookstore';

async function globalSetup (config: FullConfig): Promise<void> {
    console.log('Setting up Bookstore test suite');
    await setupBookstoreAPI(config);
    console.log('Setting up Bookstore test suite');
    await setupBookstore(config);
}

export default globalSetup;
// options.ts

import { WalletType } from './wallet';

export interface ValidationOptions {
    chains?: WalletType[]
    evmChainId?: number
}

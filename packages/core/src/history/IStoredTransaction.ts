import BigNumber from 'bignumber.js';
import {BlockchainCode, isBitcoin, isEthereum} from '../blockchains/blockchains';
import {EntryId} from "@emeraldpay/emerald-vault-core/lib/types";

interface BaseStoredTransaction {
  blockchain: BlockchainCode;
  timestamp?: Date;

  blockHash?: string;
  blockNumber?: string | number;
  since?: string | Date;

  hash?: string;

  totalRetries?: number | undefined;

  discarded?: boolean;
  broadcasted?: boolean;
}

export interface BitcoinStoredTransaction extends BaseStoredTransaction {
  inputs: {
    txid: string,
    vout: number,
    amount: number,
    entry?: EntryId
  }[];
  outputs: {
    address: string,
    amount: number,
    entry?: EntryId
  }[];
  fee: number;
}

export interface EthereumStoredTransaction extends BaseStoredTransaction {
  from: string;

  // Can also be null or void
  to?: string;
  value: string | BigNumber;
  nonce: string | number;
  gas: string | number;
  gasPrice: string | BigNumber;

  // Can either be void or omitted altogether. Cannot be null
  data?: string;

  // @deprecated
  input?: string;

  replayProtected?: boolean;
  chainId?: number;
}

export function isBitcoinStoredTransaction(tx: IStoredTransaction): tx is BitcoinStoredTransaction {
  return typeof tx === "object" && isBitcoin(tx.blockchain);
}

export function isEthereumStoredTransaction(tx: IStoredTransaction): tx is EthereumStoredTransaction {
  return typeof tx === "object" && isEthereum(tx.blockchain);
}

export type IStoredTransaction = EthereumStoredTransaction | BitcoinStoredTransaction;
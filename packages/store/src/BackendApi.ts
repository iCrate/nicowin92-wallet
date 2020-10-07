
import {
  BlockchainCode,
  Commands,
  IBackendApi,
  AnyCoinCode, isBitcoin
} from '@emeraldwallet/core';
import {ipcRenderer} from 'electron';

/**
 * This backend api implementation calls electron IPC for business logic
 */
export default class BackendApi implements IBackendApi {
  getBalance(blockchain: BlockchainCode, address: string, tokens: AnyCoinCode[]): Promise<Record<AnyCoinCode, string>> {
    return ipcRenderer.invoke(Commands.GET_BALANCE, blockchain, address, tokens);
  }

  public getGasPrice = (blockchain: BlockchainCode): Promise<number> => {
    return ipcRenderer.invoke(Commands.GET_GAS_PRICE, blockchain);
  }

  public broadcastSignedTx = (blockchain: BlockchainCode, tx: string): Promise<string> => {
    return ipcRenderer.invoke(Commands.BROADCAST_TX, blockchain, tx);
  }

  public estimateTxCost = (blockchain: BlockchainCode, tx: any): Promise<number> => {
    return ipcRenderer.invoke(Commands.ESTIMATE_TX, blockchain, tx);
  }

  public persistTransactions = (blockchain: BlockchainCode, txs: any[]): Promise<void> => {
    if (isBitcoin(blockchain)) {
      //TODO
      return Promise.resolve()
    }
    const request = txs.map((tx) => ({
      ...tx,
      gasPrice: (typeof tx.gasPrice === 'string') ? tx.gasPrice : tx.gasPrice.toString(),
      value: (typeof tx.value === 'string') ? tx.value : tx.value.toString()
    }));
    return ipcRenderer.invoke(Commands.PERSIST_TX_HISTORY, blockchain, request);
  }

}

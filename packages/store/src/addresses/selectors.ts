import {Address, AddressList, AddressMap, moduleName} from "./types";
import {List, Map} from "immutable";
import {BlockchainCode} from "@emeraldwallet/core";
import {Wei} from "@emeraldplatform/eth";

export function all(state: any): AddressList {
  return state[moduleName]
    .get('addresses')
    .filter((address: any) => typeof address !== 'undefined')
    .toList();
}

export function allByBlockchain(state: any, blockchain: BlockchainCode): AddressList {
  return all(state)
    .filter((address) => address!.get('blockchain').toLowerCase() === blockchain.toLowerCase())
    .toList();
}

export const isLoading = (state: any): boolean => state[moduleName].get('loading');

export function find(state: any, address: string, blockchain: BlockchainCode): AddressMap | undefined {
  if (!address) {
    return undefined;
  }
  return allByBlockchain(state, blockchain).find((a: any) =>
    a.get('id').toLowerCase() === address.toLowerCase()
  );
}

export function findAllChains(state: any, address: string): AddressList {
  if (!address) {
    return List.of();
  }
  return all(state).filter((a: any) =>
    a.get('id') === address.toLowerCase().toLowerCase()
  ).toList();
}

export function balanceByChain(state: any, blockchain: BlockchainCode): Wei {
  return allByBlockchain(state, blockchain)
    .map((a: any) => (a.get('balance') ? a.get('balance') : Wei.ZERO))
    .reduce((r: Wei | undefined, val: Wei | undefined) => r!.plus(val!), Wei.ZERO)
      || Wei.ZERO
}

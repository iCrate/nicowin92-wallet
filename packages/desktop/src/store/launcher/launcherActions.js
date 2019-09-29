import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
// import { waitForServicesRestart } from 'store/store';
import { screen } from '..';
import createLogger from '../../utils/logger';

const log = createLogger('launcherActions');

export function readConfig() {
  if (typeof window.process !== 'undefined') {
    const { remote } = global.require('electron');
    const launcherConfig = remote.getGlobal('launcherConfig').get();

    log.debug(`Got launcher config from electron: ${JSON.stringify(launcherConfig)}`);

    return {
      type: 'LAUNCHER/CONFIG',
      config: launcherConfig,
      launcherType: 'electron',
    };
  }
  return {
    type: 'LAUNCHER/CONFIG',
    config: {},
    launcherType: 'browser',
  };
}

export function agreeOnTerms(v) {
  ipcRenderer.send('terms', v);
  return {
    type: 'LAUNCHER/TERMS',
    version: v,
  };
}

export function saveSettings(extraSettings) {
  extraSettings = extraSettings || {};
  return (dispatch, getState) => {
    const geth = getState().launcher.get('geth').toJS();
    const chain = getState().launcher.get('chain').toJS();

    const settings = { geth, chain, ...extraSettings };

    log.info('Save settings', settings);

    ipcRenderer.send('settings', settings);

    dispatch({
      type: 'LAUNCHER/SETTINGS',
      updated: false,
    });
  };
}

// TODO: depricated
export function listenElectron() {
  return (dispatch, getState) => {
    log.debug('Running launcher listener');

    ipcRenderer.on('launcher', (event, type, message) => {
      log.debug('launcher listener: ', 'type', type, 'message', message);

      dispatch({
        type: `LAUNCHER/${type}`,
        ...message,
      });

      if (type === 'CHAIN') {
        if (getState().launcher.getIn(['chain', 'id']) !== message.chainId) {
          // Launcher sent chain different from what user has chosen
          // Alert !
          dispatch(screen.actions.showError(
            new Error(`Launcher connected to invalid chain: [${message.chain}, ${message.chainId}]`)
          ));
        } else {
          dispatch({
            type: 'NETWORK/SWITCH_CHAIN',
            ...message,
          });
        }
      }
    });
  };
}

export function connecting(value) {
  return {
    type: 'LAUNCHER/CONNECTING',
    value,
  };
}

// TODO: remove
// export function setChain(chain, chainId) {
//   return {
//     type: 'LAUNCHER/CHAIN',
//     chain,
//     chainId,
//   };
// }

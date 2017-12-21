import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { translate } from 'react-i18next';
import classNames from 'classnames/bind';
import createLogger from '../../../utils/logger';

import screen from '../../../store/wallet/screen';
import launcher from '../../../store/launcher';
import Account from './account';

import styles from './list.scss';

const log = createLogger('AccountList');
const cx = classNames.bind(styles);

const AccountList = translate('accounts')((props) => {
  const { accounts, knownTokens, showFiat } = props;
  const { openAccount, createTx, showReceiveDialog } = props;

  return (
    <div className={ styles.container }>
      {accounts.map((account) => {
        const className = cx({
          listItem: true,
          hiddenListItem: account.get('hidden'),
        });
        return (<div className={ className } key={ account.get('id') }>
          <Account
            showFiat={ showFiat }
            account={ account }
            knownTokens={ knownTokens }
            openAccount={ openAccount(account) }
            createTx={ createTx(account) }
            showReceiveDialog={ showReceiveDialog(account) }
          />
        </div>);
      })}
    </div>
  );
});

AccountList.propTypes = {
  showFiat: PropTypes.bool,
  accounts: PropTypes.object.isRequired,
  knownTokens: PropTypes.object.isRequired,
};

export default connect(
  (state, ownProps) => ({
    accounts: state.accounts.get('accounts', Immutable.List()),
    knownTokens: state.tokens.get('tokens', Immutable.List()),
    showFiat: launcher.selectors.getChainName(state).toLowerCase() === 'mainnet',
  }),
  (dispatch, ownProps) => ({
    openAccount: (account) => () => {
      dispatch(screen.actions.gotoScreen('account', account));
    },
    createTx: (account) => () => {
      dispatch(screen.actions.gotoScreen('create-tx', account));
    },
    showReceiveDialog: (account) => () => {
      dispatch(screen.actions.showDialog('receive', account));
    },
  })
)(AccountList);


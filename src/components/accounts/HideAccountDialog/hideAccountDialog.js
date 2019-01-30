import React from 'react';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import { Dialog } from 'material-ui';
import {
  Button, Warning, WarningHeader, WarningText
} from 'emerald-js-ui';

import screen from '../../../store/wallet/screen';
import accounts from '../../../store/vault/accounts';
import history from '../../../store/wallet/history';

export const styles2 = {
  title: {
    color: '#191919',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '24px',
    textTransform: 'uppercase',
  },
};

export class HideAccountDialog extends React.Component {
  render() {
    const {
      onClose, handleConfirmHide, chain, classes,
    } = this.props;

    return (
      <Dialog modal={true} open={true} onRequestClose={ onClose } contentStyle={{maxWidth: '600px'}}>
        <div style={{width: '100%'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={classes.title}>Are you Sure you want to hide this account?</div>
          </div>
          <div style={{marginRight: '20px'}}>
            <Warning>
              <WarningHeader>Hiding accounts will NOT delete your account key files.</WarningHeader>
              <WarningText>This will only hide the account. If you really need to delete an account on disk, you can use Emerald-CLI, or manually delete the account key files from the computer's file system.</WarningText>
            </Warning>
          </div>
          <Button
            style={{
              marginTop: '10px',
            }}
            label="CANCEL"
            onClick={ onClose }
          />
          <Button
            style={{
              marginLeft: '10px',
              marginTop: '10px',
            }}
            label="HIDE"
            primary={true}
            onClick={handleConfirmHide}
          />
        </div>
      </Dialog>);
  }
}

const StyledHideAccountDialog = withStyles(styles2)(HideAccountDialog);

export default connect(
  (state, ownProps) => ({
    address: ownProps.address,
  }),
  (dispatch, ownProps) => ({
    handleConfirmHide: () => {
      dispatch(accounts.actions.hideAccount(ownProps.address));

      // refresh account data
      dispatch(history.actions.refreshTrackedTransactions());
      dispatch(accounts.actions.loadAccountsList());
      dispatch(accounts.actions.loadPendingTransactions());
      dispatch(screen.actions.gotoScreen('home'));
    },
  })
)(StyledHideAccountDialog);

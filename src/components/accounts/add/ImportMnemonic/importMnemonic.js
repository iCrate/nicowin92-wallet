// @flow
import React from 'react';
import withStyles from 'react-jss';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Page, Warning, WarningHeader, WarningText
} from 'emerald-js-ui';
import { Back } from 'emerald-js-ui/lib/icons3';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { required, passwordMatch, minLength } from 'lib/validators';
import { Row, styles as formStyles } from 'elements/Form';
import TextField from 'elements/Form/TextField';
import Button from 'elements/Button';
import screen from 'store/wallet/screen';
import HdPath from 'components/common/HdPath';

export const styles2 = {
  passwordLabel: {
    height: '24px',
    width: '190px',
    color: '#191919',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
  },
  mnemonicLabel: {
    height: '24px',
    color: '#191919',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
  },
  passwordSubLabel: {
    height: '22px',
    color: '#191919',
    fontSize: '14px',
    lineHeight: '22px',
  },
};

/**
 * Wrapper for redux-form Field component
 */
const HdPathFormField = (props) => {
  const { input: { value, onChange } } = props;
  return (
    <HdPath value={ value } onChange={ onChange }/>
  );
};

export class ImportMnemonic extends React.Component {
  render() {
    const {
      onBack, invalid, handleSubmit, error, classes,
    } = this.props;
    return (
      <Page title="Import Mnemonic" leftIcon={ <Back onClick={onBack} /> }>
        <div>
          <Row>
            <div style={ formStyles.left }/>
            <div style={ formStyles.right }>
              <div style={{width: '100%'}}>
                <div className={ classes.passwordLabel }>Enter a strong password</div>
                <div className={ classes.passwordSubLabel }>This password will be required to confirm all account
                          operations.
                </div>
                <div style={{marginTop: '30px'}}>
                  <Field
                    hintText="At least 8 characters"
                    name="password"
                    type="password"
                    component={ TextField }
                    fullWidth={ true }
                    underlineShow={ false }
                    validate={ [required, minLength(8)] }
                  />
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div style={formStyles.left}/>
            <div style={formStyles.right}>
              <Warning fullWidth={ true }>
                <WarningHeader>Don&#39;t forget it.</WarningHeader>
                <WarningText>If you forget this password, you will lose access to the account and its funds.</WarningText>
              </Warning>
            </div>
          </Row>
          <Row>
            <div style={formStyles.left} />
            <div style={formStyles.right}>
              <Field
                hintText="Confirm Password"
                name="confirmPassword"
                type="password"
                component={TextField}
                fullWidth={true}
                underlineShow={false}
                validate={[required, passwordMatch]}
              />
            </div>
          </Row>

          <Row>
            <div style={ formStyles.left }/>
            <div style={ formStyles.right }>
              <div style={{width: '100%'}}>
                <div className={ classes.mnemonicLabel }>HD derivation path</div>
                <div>
                  <Field
                    name="hdpath"
                    component={ HdPathFormField }
                    validate={ [required] }
                  />
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <div style={formStyles.left}>
            </div>
            <div style={formStyles.right}>
              <div style={{width: '100%'}}>
                <div className={ classes.mnemonicLabel }>Enter a mnemonic phrase</div>
                <div>
                  <Field
                    multiLine={ true }
                    rowsMax={ 4 }
                    rows={ 2 }
                    name="mnemonic"
                    component={ TextField }
                    fullWidth={ true }
                    underlineShow={ false }
                    validate={ [required] }
                  />
                </div>
              </div>
            </div>
          </Row>

          <Row>
            <div style={formStyles.left}/>
            <div style={formStyles.right}>
              <Button
                primary
                label="Continue"
                disabled={ invalid }
                onClick={ handleSubmit }
              />
            </div>
          </Row>

          {error && (
            <Row>
              <div style={formStyles.left}/>
              <div style={formStyles.right}>
                <Warning>
                  <WarningText>{error}</WarningText>
                </Warning>
              </div>
            </Row>
          )}
        </div>
      </Page>
    );
  }
}

const importForm = reduxForm({
  form: 'importMnemonic',
  fields: ['password', 'mnemonic', 'hdpath'],
})(withStyles(styles2)(ImportMnemonic));

export default connect(
  (state, ownProps) => ({
    initialValues: {
      mnemonic: ownProps.mnemonic,
      hdpath: "m/44'/60'/160720'/0'",
    },
  }),
  (dispatch, ownProps) => ({
    onSubmit: (data) => {
      return ownProps.onContinue(data);
    },

    onBack: () => {
      if (ownProps.onBack) {
        ownProps.onBack();
      } else {
        dispatch(screen.actions.gotoScreen('home'));
      }
    },
  })
)(muiThemeable()(importForm));

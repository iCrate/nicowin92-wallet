import React from 'react';
import QRCode from 'qrcode.react';

import Button from 'elements/Button';
import { Form, Row, styles as formStyles } from 'elements/Form';
import { Warning, WarningHeader, WarningText } from 'elements/Warning';

import styles from './showPrivateKeyDialog.scss';

const ShowPrivateDialog = (props) => {
  const { onBack, onNext, privateKey, t } = props;

  return (
    <Form caption={ t('generate.title') } onCancel={ onBack }>

      <Row>
        <div style={ formStyles.left }/>
        <div style={ formStyles.right }>
          <div>
            <div className={ styles.title }>
                            Print this
            </div>
            <div className={ styles.subTitle }>
                            This is the unencrypted text version of your private key, meaning no password is necessary.
                            It helps if you forget your password.
            </div>
          </div>
        </div>
      </Row>

      <Row>
        <div style={ formStyles.left }/>
        <div style={ formStyles.right }>
          <Warning>
            <WarningHeader>Keep it in safety</WarningHeader>
            <WarningText>
                            If someone gains access to your unencrypted private key, they will be able to access your account and funds without a password.
            </WarningText>
          </Warning>
        </div>
      </Row>

      <Row>
        <div style={ formStyles.left } />
        <div style={ formStyles.right } className={ styles.privKeyColumn }>
          <div>
            <QRCode
              size={ 100 }
              value={ privateKey }
            />
          </div>
          <div className={ styles.privKeyContainer }>
            <div className={ styles.keyTitle }>Unencrypted Private Key</div>
            <div className={ styles.key }>
              { privateKey }
            </div>
          </div>
        </div>
      </Row>

      <Row>
        <div style={ formStyles.left }/>
        <div style={ formStyles.right }>
          <Button primary onClick={ onNext } label="Next" />
        </div>
      </Row>
    </Form>
  );
};

export default ShowPrivateDialog;

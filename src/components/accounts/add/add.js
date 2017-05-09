import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';

import { cardSpace } from 'lib/styles';

import { gotoScreen } from 'store/screenActions';
import { positive, number, required, address } from 'lib/validators';

const Render = ({ handleSubmit, resetForm, submitting, generate, importJson, cancel }) => (
        <Card style={cardSpace}>
            <CardHeader
                title='Add Account'
                actAsExpander={false}
                showExpandableButton={false}
            />

            <CardText expandable={false}>
                <List>
                    <ListItem
                        primaryText="Generate"
                        secondaryText="Generates a new private/public key pair"
                        onClick={generate}
                        leftIcon={<FontIcon className="fa fa-random"/>}
                    />
                    <ListItem
                        primaryText="Import JSON"
                        secondaryText="Import key from Parity/Geth in JSON format"
                        onClick={importJson}
                        leftIcon={<FontIcon className="fa fa-code"/>}
                    />
                </List>

            </CardText>

            <CardActions>
                <FlatButton label="Cancel"
                            onClick={cancel}
                            icon={<FontIcon className="fa fa-ban" />}/>
            </CardActions>
        </Card>
    );

const CreateAccountForm = reduxForm({
    form: 'createAccount',
    fields: ['name'],
})(Render);

const CreateAccount = connect(
    (state, ownProps) => ({
        initialValues: {
        },
    }),
    (dispatch, ownProps) => ({
        cancel: () => {
            dispatch(gotoScreen('home'));
        },
        generate: () => {
            dispatch(gotoScreen('generate'));
        },
        importJson: () => {
            dispatch(gotoScreen('importjson'));
        },
    })
)(CreateAccountForm);


export default CreateAccount;

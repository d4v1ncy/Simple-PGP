import React, { Component } from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { hashHistory, Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Spinner from 'react-spinkit';

import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { colours } from 'utils/constants';

const componentStyles = StyleSheet.create({
  component: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  controls: {
    backgroundColor: colours.white,
    padding: 15,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  button: {
    display: 'block',
    backgroundColor: colours.midnightBlue,
    color: colours.clouds,
    padding: 15,
    marginBottom: 10,
    borderRadius: 2,
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
  },
});

@inject('appStore')
@observer
export default class Login extends Component {

  static propTypes = {
    appStore: MobxPropTypes.objectOrObservableObject.isRequired,
  }

  state = {
    name: '',
    email: '',
    passphrase: '',
  }

  handleGenerateNewKeypair = () => {
    const { name, email, passphrase } = this.state;
    this.props.appStore.generateKeyPair(name, email, passphrase)
    .then(() => hashHistory.push('/'));
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value });
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassphrase = (e) => {
    this.setState({ passphrase: e.target.value });
  }

  render() {
    const { appStore } = this.props;
    const content = appStore.loading ? (
      <Spinner spinnerName="rotating-plane" />
    ) : (
      <div className={css(componentStyles.controls)}>
        <Input value={this.state.name} onChange={this.handleChangeName} placeholder="Full Name" />
        <Input value={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" />
        <Input type="password" value={this.state.passphrase} onChange={this.handleChangePassphrase} placeholder="Passphrase" />
        <Button onClick={this.handleGenerateNewKeypair} text="Generate New Keypair" />
        <Link className={css(componentStyles.button)} to="/import">Import An Existing Keypair</Link>
      </div>
    );

    return (
      <div className={css(componentStyles.component)}>
        {content}
      </div>
    );
  }

}

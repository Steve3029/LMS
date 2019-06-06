import React, { Component } from 'react';
import SignInForm from './forms/SignInForm';

export default class SignIn extends Component {
  constructor(props){
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(values, actions) {
    //todo: submit values to backend server
    actions.setSubmitting(false);
    actions.resetForm();
  }

  render() {
    return (
      <div className="signup-page-color">
        <SignInForm submitHandler={this.submitHandler} />
      </div>
    );
  }
}
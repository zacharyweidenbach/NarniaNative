import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  signup(event) {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      $.ajax({
        method: 'POST',
        url: 'api/users/signup',
        data: this.state,
        success: (function(resp) {
          console.log('SUCCESS, this was the response:', resp);
        }),
        error: (function(resp) {
          console.log('FAILED, this was the response:', resp);
        })
      });
    } else {
      console.log('Enter a username and password!');
    }
  }

  usernameHandler(event) {
    this.setState({username: event.target.value});
  }

  passwordHandler(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.signup.bind(this)}>
          <p>New Username</p>
          <input value={this.state.username} onChange={this.usernameHandler.bind(this)}/>
          <p>New Password</p>
          <input value={this.state.password} onChange={this.passwordHandler.bind(this)}/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Signup;
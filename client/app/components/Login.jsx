import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    // $.ajax({
    //   method: 'GET',
    //   url: 'auth/facebook',
    //   data: this.state,
    //   beforeSend: function(xhr) { xhr.setRequestHeader('Access-Control-Allow-Origin', 'test'); },
    //   success: (function(resp) {
    //     console.log('Success', resp);
    //   }),
    //   error: (function(resp) {
    //     console.log('Failure', resp);
    //   })
    // });
  }

  login(event) {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      $.ajax({
        method: 'POST',
        url: 'api/users/login',
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
        <form onSubmit={this.login.bind(this)}>
          <p>Username</p>
          <input value={this.state.username} onChange={this.usernameHandler.bind(this)}/>
          <p>Password</p>
          <input value={this.state.password} onChange={this.passwordHandler.bind(this)}/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Login;
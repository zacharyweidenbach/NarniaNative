import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Login from './Login.jsx';
import Signup from './Signup.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
      <div>
         {/* add test product rendering here*/}
      </div>
    );
  }
}

export default Home;
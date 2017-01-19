import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SearchBar extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      SearchIndex: '',
      Keywords: '',
      Sort: ''
    };
  }
}
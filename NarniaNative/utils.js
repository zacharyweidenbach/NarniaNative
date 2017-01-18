import {
  ListView
} from 'react-native';
import ip from './network.js';

async function POSTfetch(path, body) {
  var api = 'http://' + ip.address + ':3000/api/' + path;
  if (body) {
    var info = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
  } else {
    var info = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  try {
    return fetch(api, info).then((res) => res.json());
  } catch(err) {
    console.log(err);
  }
};


//////////SOCIAL FEED//////////
export const getFollowingPosts = function() {
  return POSTfetch('getAllFollowersPosts', {userId: this.props.userId})
  .then((resJSON) => {
    this.setState({feedPosts: resJSON}, function() {
      this.setState({
        lastFeedId: resJSON[resJSON.length - 1].id,
        dataSourceFollowers: this.dataSourceFollowers.cloneWithRows(this.state.feedPosts)
      });
    });
  })
};

export const getTrendingPosts = function() {
  return POSTfetch('getPostsFromDb')
  .then((resJSON) => {
    this.setState({trendingPosts: resJSON}, function() {
      this.setState({
        trendingRow: this.state.trendingRow + resJSON.length,
        dataSoureTrending: this.dataSoureTrending.cloneWithRows(this.state.trendingPosts)
      });
    });
  })
};

export const getOlderFollowingPosts = function() {
  return POSTfetch('getAllFollowersPosts', {
    userId: this.props.userId,
    postId: this.state.lastFeedId,
  })
  .then((resJSON) => {
    if (resJSON.length > 0) {
      this.setState({feedPosts: this.state.feedPosts.concat(resJSON)}, function() {
        this.setState({
          dataSourceFollowers: this.dataSourceFollowers.cloneWithRows(this.state.feedPosts),
          lastFeedId: resJSON[resJSON.length - 1].id
        });
      });
    }
  })
};

export const getOlderTrendingPosts = function() {
  return POSTfetch('getPostsFromDb', {
    row: this.state.trendingRow,
  })
  .then((resJSON) => {
    if (resJSON.length > 0) {
      this.setState({
        trendingPosts: this.state.trendingPosts.concat(resJSON)
      }, function() {
        this.setState({
          dataSoureTrending: this.dataSoureTrending.cloneWithRows(this.state.trendingPosts),
          trendingRow: this.state.trendingRow + resJSON.length
        });
      });
    }
  })
};









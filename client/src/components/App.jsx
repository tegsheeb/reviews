/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import Reviews from './Reviews.jsx';
import OverallScore from './OverallScore.jsx';
import Ratings from './Ratings.jsx';

const fetch = require('node-fetch');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      allReviews: [],
      shortList: [],
      ratings: [],
      overall: null,
    };
    this.handleModal = this.handleModal.bind(this);
    // this.scoreRandomizer = this.scoreRandomizer.bind(this);
  }

  componentDidMount() {
    fetch('/api/rooms/:id/reviews')
      .then((res) => res.json())
      .then((result) => {
        const topSix = result.slice(0, 6);
        this.setState({
          allReviews: result,
          shortList: topSix,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
    fetch('/api/rooms/:id/ratings')
      .then((res) => res.json())
      .then((result) => {
        const obj = {
          Cleanliness: result[0].cleanliness,
          Communication: result[0].communication,
          'Check In': result[0].checkin,
          Accuracy: result[0].accuracy,
          Location: result[0].location,
          Value: result[0].value,
        };
        this.setState({
          ratings: obj,
          overall: result[0].overall,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  handleModal() {
    this.setState({
      modal: true,
    });
  }

  render() {
    const {
      allReviews, shortList, modal, ratings, overall,
    } = this.state;
    if (!modal) {
      return (
        <div>
          <OverallScore score={overall} />
          <Ratings ratings={ratings} />
          <Reviews reviews={shortList} />
        </div>
      );
    }
    return (
      <div>
        <OverallScore score={overall} />
        <Reviews reviews={allReviews} />
      </div>
    );
  }
}

export default App;

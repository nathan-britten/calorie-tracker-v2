import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    if(!window.gapi) {
      return;
    }
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '19603894718-01vlr3v3u373pv6l3ut2hdepqsptna2c.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        }).catch(() => {
          return;
        })
    });
  }

  onAuthChange = isSignedIn => {
    console.log(isSignedIn)
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="btn btn-outline-danger">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="btn btn-outline-success">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId
   };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);

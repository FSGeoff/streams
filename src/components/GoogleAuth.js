import React from 'react';
import {CLIENT_ID} from "../private/ClentId";
import { signIn, signOut } from '../actions';
import { connect } from 'react-redux';

class GoogleAuth extends React.Component {


    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: CLIENT_ID,
                scope: 'email',
                plugin_name: 'streamy'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            // eslint-disable-next-line react/prop-types
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            // eslint-disable-next-line react/prop-types
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
        // eslint-disable-next-line react/prop-types
        if (this.props.isSignedIn === null) {
            return null;
            // eslint-disable-next-line react/prop-types
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui green google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }

}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);

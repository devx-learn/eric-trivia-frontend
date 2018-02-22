import React, { Component } from 'react'
import SignIn from '../components/signIn'
import { BrowserRouter as Router,  Route } from 'react-router-dom'
import '../App.css';


class LandingPageView extends Component {
    render() {
        const { onSubmit } = this.props

        return (
            <div className="home-bg">
                <div>
                    <h1 className="devX">DevX Trivia</h1>
                </div>

                <div className="container">
                    <div className="signin">
                        <h3>Sign-In</h3>

                        <Route path='/' render={props => (
                            <SignIn onSubmit={onSubmit} />
                        )} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPageView;

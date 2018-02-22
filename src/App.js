import React, { Component } from 'react'
import { BrowserRouter as Router,  Route } from 'react-router-dom'
import SignUp from './components/signUp'
import SignIn from './components/signIn'
import LandingPage from './pages/landing-page'
import GamePage from './pages/game-page'
import './App.css'


class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: "Bob User",
            user: [],
            newUserSuccess: false,
            errors: null,
        }
    }

    newUserSubmit() {

    }

    handleNewUser = (user) => {
        createNewUser(user)
        .then((res) => {
            const { user, errors } = res

            this.setState({
                user: user,
                newUserSuccess: res.errors ? false : true,
                errors: errors
            })
        })
        .catch(e => console.log("error creating user:", e))
    }


    render() {
        const { username } = this.state

        return (
            <Router>
                <div className="header">
                    <div id="landingPage">
                        <Route exact path='/' component={LandingPage} render={(props) => {
                            return <SignIn onSubmit={handleExistingUser} />
                    }} />
                    </div>

                    <Route path='/games' render={(props) => {
                        return <GamePage username={username} {...props}/>
                    }} />
                    <Route path='/signup' render={(props) => {
                        return <SignUp onSubmit={createNewUser} />
                    }} />
                </div>
            </Router>
        )
    }
}

const API = "http://localhost:3000"

function createNewUser(user) {
    console.log("creating user:", user)

    return fetch(`${API}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then((raw) => raw.json())
}

function handleExistingUser(user) {
    console.log("user logged in as:", user)

    return fetch(`${API}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })
    .then((raw) => raw.json())
}


export default App;

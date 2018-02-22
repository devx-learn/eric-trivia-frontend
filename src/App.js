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
            users: [],
            newUserSuccess: false,
            errors: null,
        }
    }

    handleNewUser = (user) => {
        createNewUser(user)
        .then((res) => {
            const { users, errors } = res

            this.setState({
                newUserSuccess: res.errors ? false : true,
                users: users,
                errors: errors
            })
        })
        .catch(e => console.log("error creating user:", e))
    }

    login(form) {
        const { users } = this.state

        return login(form)
        .then((res) => {
            const { user, errors } = res

            if(errors) {
                this.setState({
                    errors: errors
                })

                return res
            }

            console.log("got user from login", user)

            users.push(user)

            this.setState({
                users: users,
                errors: null,
                isLoggedIn: true
            })

            return res
        })
    }

    render() {
        const { username } = this.state

        return (
            <Router>
                <div className="header">
                    <div id="landingPage">
                        <Route exact path='/' render={(props) => {
                            return <LandingPage onSubmit={this.login.bind(this)} />
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

function login(form) {
    const { email, password } = form

    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(raw => raw.json())
    .then(res => {
        const { user } = res

        if(user) {
            localStorage.setItem('authToken', user.authToken)
        }

        return res
    })
}

function logout() {
    localStorage.removeItem('authToken')
}

export default App;

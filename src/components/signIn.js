import React, { Component } from "react";

import { Link } from "react-router-dom";

import {
    Button,
    Col,
    ControlLabel,
    FormGroup,
    FormControl,
    Row,
    HelpBlock,

} from "react-bootstrap";

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                email: "",
                password: "",
                errors: {}
            }
        };
    }
    handleChange(e) {
        const { form } = this.state
        const { name, value } = e.target

        form[name] = value

        this.setState({
            form: form
        })
    }

    handleSubmit() {
        const { onSubmit } = this.props
        const { form } = this.state

        if(onSubmit) {
            onSubmit(form)
            .then((res) => {
                console.log("this is the response that eric is looking for", res);

                const { errors } = res

                if(errors) {
                    this.setState({
                        errors: errors.validations
                    })
                }


            })
            .catch(e => console.log("error logging in:", e))
        } else {
            console.log("no onSubmit passed to Signin Component");
        }
    }

    errorsFor(attribute) {
        const { errors } = this.state
        let errorString

        if(errors) {
            const filtered = errors.filter(e => e.param === attribute)

            if (filtered) {
                errorString = filtered.map(e => e.param + " " + e.msg).join(", ")
            }
        } else {
            return
        }

        return errorString === undefined ? undefined : errorString
    }
    consolelogger(){
        return console.log("button button");
    }

    render() {
        const { form, errors } = this.state
        const { email, password } = form

        return (
            <form>
            <Row>
              <Col xs={6}>
                <FormGroup
                   id="email-form-group"
                   validationState={this.errorsFor('email') && 'error'}>
                  <ControlLabel id="email">Email</ControlLabel>
                  <FormControl
                  type="text"
                  name="email"
                  onChange={this.handleChange.bind(this)}
                  value={email}
                  />
                  {this.errorsFor('email') &&
                  <HelpBlock id="email-help-block">{this.errorsFor('email')}</HelpBlock>
                   }
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <FormGroup
                   id="password-form-group"
                   validationState={this.errorsFor('password') && 'error'}>
                  <ControlLabel id="password">Password</ControlLabel>
                  <FormControl
                  type="password"
                  name="password"
                  onChange={this.handleChange.bind(this)}
                  value={password}
                  />
                  {this.errorsFor('password') &&
                  <HelpBlock id="password-help-block">{this.errorsFor('password')}</HelpBlock>
                   }
                </FormGroup>
              </Col>
            </Row>

                <Row>
                    <Col xs={6}>

                        <Button id="submit" onClick={this.handleSubmit.bind(this)}>
                            Log In
                        </Button>

                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Link to="/signup">
                            <Button id="signUpbtn">
                                Dont have a Trivia Accout?
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </form>
        );
    }
}
export default SignIn;

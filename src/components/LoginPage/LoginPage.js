import React from 'react'
import './LoginPage.css'
import logo from './kozi-isaac-logo.png'
import { Redirect, useHistory } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { Alert } from 'react-bootstrap'


const LOGIN_QUERY = gql`query Login($email: String, $password:String){
    Login(email: $email password: $password){
      accessToken 
      error
    }
  }
`

export default function LoginPage() {

    const history = useHistory()

    const [login, { error, data }] = useLazyQuery(LOGIN_QUERY)

    const handleLogin = (event) => {
        event.preventDefault()
        login({
            variables: {
                email: event.target.elements.email.value,
                password: event.target.elements.password.value
            }
        })
    }

    const toHome = () => {
        history.push("/")
    }

    if (data && data.Login.accessToken) {
        localStorage.setItem('token', data.Login.accessToken)
        return <Redirect to="/" />
    }

    if (error) { console.log(error) }

    return (
        <div className="main-login">
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <div className="d-md-flex h-md-100 align-items-center">
                <div className="col-md-6 pt-md-5 p-0 h-md-100 ">
                    <div className="text-white  d-md-flex h-100 p-5">
                        <div className="p-md-5 pb-5">
                            <div className="d-flex justify-content-center align-items-center">

                                <div className="col-10 col-md-10">
                                    <img className="img img-fluid" src={logo} />
                                </div>
                            </div>

                            <hr />

                            <p className="text-p-secondary h2 mt-5">Login</p>

                            <form className="mt-3" onSubmit={handleLogin}>

                                <label htmlFor="email" className="text-p-secondary">Email</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="email" name="email" className="form-control" />
                                </div>

                                <label htmlFor="email" className="text-p-secondary mt-4">Password</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-unlock-alt" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input type="password" name="password" className="form-control" />
                                </div>
                                {/* Error message */}
                                {data && data.Login.error && (
                                    <div className="alert alert-info mt-3"> {data.Login.error} </div>
                                )}

                                <div className="col-xl-6">
                                    <button id="submitAction" type="submit" className="btn btn-p-primary btn-block btn-round mt-5  "><span id="main-executeAction" className="text-p-primary text-font-primary">Login</span></button>
                                </div>

                            </form>

                            <div className="col-xl-6">
                                <button id="main-forgottenPassword" type="submit" className="btn btn-p-primary btn-block btn-round mt-3"><span className="text-p-primary text-font-secondary">Forgotten Password</span></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 bg-blue ">
                    <div className="d-flex flex-column align-items-center h-md-100  p-5 justify-content-center">
                        <h1 id="side-action" className="h1 text-white">Guest</h1>
                        <p id="side-description" className="text-white h4 text-center">Enter to view real-time sensor information!</p>
                        <a id="switcher" onClick={toHome} className="btn btn-round btn-switcher btn-lg btn-block mt-3">Login as a guest</a>
                    </div>
                </div>

            </div>
        </div>
    )
}
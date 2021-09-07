import React, { Component } from "react"
import Link from "next/link"
import Router from "next/router"
import { login } from "~/store/auth/action"
import { Alert } from "reactstrap"
import { Form, Input, notification, Spin } from "antd"
import { connect } from "react-redux"
import axios from "axios"
import api from "~/api/handler"
const domain_url = process.env.domain_url
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_email: "",
      user_password: "",
      isValidating: false,
      error: "",
      loading: false,
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.isLoggedIn === true) {
      Router.push("/")
    }

    return false
  }

  handleChange = e => {
    this.setState({
      error: "",
      [e.target.name]: e.target.value,
    })
  }

  handleLoginSubmit = async e => {
    this.setState({ loading: true })
    const { user_email, user_password, loading } = this.state

    let data = {
      user_email,
      user_password,
      loading,
    }

    const route = "user_login"

    await api.handler
      .api_post(data, route)
      .then(response => {
        if (!response.success) {
          this.setState({ loading: false })
          throw "Invalid login"
        } else {
          this.setState({ loading: false })

          if (response.data.id_vendor) {
            this.props.handleLogin({
              isLoggedIn: true,
              token: response.data.token,
              business_name: response.data.business_name,
              id_vendor: response.data.id_vendor,
            })
          } else {
            throw "Invalid login"
          }
        }
      })
      .catch(e => {
        this.setState({ error: e })
      })
  }

  render() {
    return (
      <div className="ps-my-account">
        <div className="container auth-container">
          <Form className="ps-form--account" onFinish={this.handleLoginSubmit.bind(this)}>
            <div className="ps-tab active" id="sign-in">
              <div className="ps-form__content">
                <h5>Log in to Your Vendor Account</h5>
                {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                <div className="form-group">
                  <Form.Item
                    name="user_email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                      {
                        type: "email",
                        message: "Email is invalid",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="text"
                      name="user_email"
                      placeholder="Email address"
                      value={this.state.user_email}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                </div>
                <div className="form-group form-forgot">
                  <Form.Item
                    name="user_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="form-control"
                      placeholder="Password..."
                      type="password"
                      name="user_password"
                      value={this.state.user_password}
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                    />
                    <label htmlFor="remember-me">Remember me</label>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="ps-btn ps-btn--fullwidth">
                    {this.state.loading === false ? (
                      "Login"
                    ) : (
                      <>
                        <Spin /> Logging in...
                      </>
                    )}
                  </button>
                </div>

                <div className="form-group login-form-forgot">
                  <Link href="/account/forgot-password">
                    <a>Forgot password</a>
                  </Link>
                </div>

                <div className="form-group">
                  <Link href={`${domain_url}account/register`} target="_blank">
                    <a>Don't have a vendor account? Create one</a>
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.auth
}

const dispatchActionToProps = {
  handleLogin: login,
}

export default connect(mapStateToProps, dispatchActionToProps)(Login)

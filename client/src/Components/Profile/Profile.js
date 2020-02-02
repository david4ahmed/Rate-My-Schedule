import React, { Component } from 'react';
import {connect} from 'react-redux';
import {authAndSetUser} from '../../redux/actions/authAction';
import axios from 'axios';
import './profile.css'

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {sheetsLink: '', submitted: false};
    }

    async componentDidMount() {
        await this.props.authAndSetUser;
      }

    
    textChange = e => {
        this.setState({sheetsLink: e.target.value}, console.log(this.state.sheetsLink))
    }

    submitButton = e => {
        const { authenticated, user } = this.props.auth;
        axios
            .post('api/schedules/create', {
                text: this.state.sheetsLink,
                user: user.id,
                name: user.name
            })
            .then(resp => this.setState({submitted : true}))
            .catch(err => console.log(err))
    }

      render() {
        const { authenticated, user } = this.props.auth;
        if (authenticated) {
          return (
            <div className="jumbotron">
              <h1 className="display-4">Hi, {user.name}!</h1>
              <p className="lead">Here are some of your details.</p>
              <hr className="my-4" />
              <center>
                <div className="profile-container">
                  <div className="profile-item">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <div>
                          <b>Name</b>: {user.name}
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div>
                          <b>Email</b>: {user.email}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="profile-item">
                    <img
                      className="photo"
                      src={user.image}
                      alt=""
                    />
                  </div>
                </div>
              </center>
                
            {this.state.submitted ? (<h6>Success</h6>) : (
                <div>
                <div className="input-group mb-3 link">
                <div className="input-group-prepend">
                    <span className="input-group-text">Enter the link to your schedule</span>
                </div>
                <input type="text" value={this.state.sheetsLink} onChange={(e) => this.textChange(e)} className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <div className="input-group-append">
                        <button type="button" onClick={e => this.submitButton(e)} class="btn btn-secondary btn-sm">Upload</button>
                    </div>
                 </div>
            </div>
            )}

            </div>
        
          );
        } else return <div>Loading...</div>;
      }
    }

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { authAndSetUser }
  )(Profile);
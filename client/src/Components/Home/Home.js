import React, { Component } from 'react'
import {connect} from 'react-redux'
import {authAndSetUser} from '../../redux/actions/authAction'
import Login from '../Login/Login'
import axios from 'axios'

class Home extends Component {

    constructor(props){
      super(props);

      this.state = {schedules: []}
    }

    async componentDidMount() {
        await this.props.authAndSetUser();
        const res = await axios.get('/api/schedules')
        const data = await res.data;
        const joined = this.state.schedules.concat(data)
        this.setState({schedules: joined})
      }
      render() {
        const { authenticated, user } = this.props.auth;
        return (
          <div className="landing">
            <div className="landing-inner text-dark">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                   
                    
                    {!authenticated ? (
                      <>
                      <h1 className="display-3 mb-4">Rate My Schedule</h1>
                      <p className="lead">
                      Create an account and share your thoughts with others. 
                      </p>
                      </>):(<p></p>)}
                  
                    <hr className="horisontal"/>
                    {authenticated ? (
                      <div>
                      {/* <div>
                        <br />
                        <h2 className="display-5 mb-4">Welcome, {user.name}</h2>
                      </div> */}
                      </div>
                    ) : (
                        <Login/>
                    )}

                    {authenticated ? (
                      <>
                        {this.state.schedules.map(schedule => (
                          <>
                          <br/>
                            <p>{`${schedule.name}'s schedule`} </p>
                            <iframe width="1100" height="700" src={schedule.text} title={schedule.id}></iframe>
                            <br/>
                            <hr/>
                          </>
                        ))}
                      </>
                    ):(<></>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    

    const mapStateToProps = state => ({
      auth: state.auth
    });
    
    export default connect(
      mapStateToProps,
      { authAndSetUser }
    )(Home);

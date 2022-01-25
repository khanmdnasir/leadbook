import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component {
    state = {
        credentials: {
            username: '',
            email: '',
            password: ''
        },
        isLoginVieew: true,
        token: this.props.cookies.get('token')
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }

    login = event => {
        if(this.state.isLoginVieew){
            fetch(`http://127.0.0.1:8000/auth/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            
        },
        body: JSON.stringify(this.state.credentials)
        }).then( resp => resp.json())
        .then(res => {this.props.cookies.set('token',res.token);
        window.location.href = "/home"})
        .catch( error => console.log(error))
        }else{
            fetch(`http://127.0.0.1:8000/api/users/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            
        },
        body: JSON.stringify(this.state.credentials)
        }).then( resp => resp.json())
        .then(res => this.setState({isLoginVieew: true}))
        .catch( error => console.log(error))
        }
        
    }
    toggleView = () => {
        this.setState({isLoginVieew: !this.state.isLoginVieew})
    }

  render() {
    
    return (
        
        <div className='row'>
        <div className='col-md-4 '></div>
        <div className='col-md-4 mt-4 border p-3' >
            <h4 className='d-flex justify-content-center'>{ this.state.isLoginVieew ? 'Login':'Register'}</h4>
            <div className="mb-3">
                <label  className="form-label">Username</label>
                <input type="text" className="form-control" name="username"  value={this.state.credentials.username} onChange={this.inputChanged}/>

            </div>
            { this.state.isLoginVieew? '':
            <div className="mb-3">
                <label  className="form-label">Email</label>
                <input type="email" className="form-control" name="email"  value={this.state.credentials.email} onChange={this.inputChanged}/>

            </div>}
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" name="password"  value={this.state.credentials.password} onChange={this.inputChanged} />
            </div>
            <div className='text-center'>
                <button  className="btn btn-primary" onClick={this.login}>{ this.state.isLoginVieew ? 'Login':'Register'}</button>
                <p onClick={this.toggleView}>{ this.state.isLoginVieew ? 'Create Account':'Back To Login'}</p>
            </div>

        </div>
        <div className='col-md-4'></div>
    </div>
    );
  }
}

export default withCookies(Login)
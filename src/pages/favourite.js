import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { withCookies } from 'react-cookie';

class Favourite extends Component {
    state = {
        fcompanies: [],
        token: this.props.cookies.get('token')
    }

    
    componentDidMount() {
        if (this.state.token) {
            //fetch data
            fetch('http://127.0.0.1:8000/api/favourite/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(resp => resp.json())
                .then(res => this.setState({ fcompanies: res }))
                .catch(error => console.log(error))
        } else {
            window.location.href = '/';
        }

    }

    render() {
        return <div>
            <Navbar />
            <div className='container mt-4 '>
                <div className='row'>
                    {this.state.fcompanies.map(fc => {
                        return (
                            <div className='col-md-4 col-xl-3 col-sm-6 col-xs-12' key={fc.id}>
                                <div className="card  mb-3" >
                                    <div className="card-body">
                                        <div className='d-flex'>
                                            <div >
                                            <h5 className="card-title">{fc.company.name}</h5>
                                            </div>
                                            
                                            <div className="ms-auto" >
                                            <i className="fas fa-trash cl-red " ></i>
                                            </div>
                                        </div>

                                        <p className="card-text mb-0"><b>Address:</b> {fc.company.address}</p>
                                        <p className="card-text mb-0"><b>Phone:</b> {fc.company.phone}</p>
                                        <p className="card-text mb-0"><b>Email:</b> {fc.company.phone}</p>
                                        <p className="card-text mb-0"><b>Employee:</b>{fc.company.employee}</p>

                                        <Link to="{company.website}" className="card-link">{fc.company.website}</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        </div>;
    }
}

export default withCookies(Favourite)
import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { withCookies } from 'react-cookie';

class home extends Component {
    state = {
        companies: [],
        fcompanies: [],
        token: this.props.cookies.get('token'),
        search: ''
    }
    logout = () => {
        this.props.cookies.remove('token')
    }
    addFavourite = company => {
        
        fetch('http://127.0.0.1:8000/api/favourite/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.state.token}`
            },
            body: JSON.stringify({company: company})
        }).then(resp => resp.json())
            .then(res => this.setState({fcompanies: res}))
            .catch(error => console.log(error))
    }
    componentDidMount() {
        if (this.state.token) {
            //fetch data
            fetch('http://127.0.0.1:8000/api/company/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(resp => resp.json())
                .then(res => this.setState({ companies: res }))
                .catch(error => console.log(error))
        } else {
            window.location.href = '/';
        }

    }

  render() {
      return <div>
          <Navbar search={this.state.search} onSearchChange={search => this.setState({search:search})} logout={this.logout}/>
          <div className='container mt-4 '>
              <div className='row'>
                  {this.state.companies.filter((val) => {
                      if (this.state.search == "") {
                        return val
                     } else if (val.name.toLowerCase().includes (this.state.search.toLowerCase())) {
                        return val
                     }
                }).map(company => {
                      return (
                      <div className='col-md-4 col-xl-3 col-sm-6 col-xs-12' key={company.id}>
                          <div className="card  mb-3" >
                              <div className="card-body">
                                  <div className='d-flex '>
                                      <div >
                                      <h5 className="card-title">{company.name}</h5>
                                      </div>
                                      
                                      <div className="ms-auto" onClick={()=>this.addFavourite(company.id)}>
                                      <i className="fas fa-heart cl-red " ></i>
                                      </div>
                                      
                                  </div>

                                  <p className="card-text mb-0"><b>Address:</b> {company.address}</p>
                                  <p className="card-text mb-0"><b>Phone:</b> {company.phone}</p>
                                  <p className="card-text mb-0"><b>Email:</b> {company.phone}</p>
                                  <p className="card-text mb-0"><b>Employee:</b>{company.employee}</p>

                                  <Link to="{company.website}" className="card-link">{company.website}</Link>
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

export default withCookies(home)
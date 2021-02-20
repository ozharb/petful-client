import React, { Component } from 'react';
import './Root.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Adoption from '../Adoption/Adoption'
import LandingPage from '../LandingPage/LandingPage'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import config from '../config'
import AppContext from '../AppContext'
class Root extends Component {

  state = {
      people: [],
      dogs: [],
      cats: [],
      user: ''
    };
    componentDidMount() {
      Promise.all([

        fetch(`${config.API_ENDPOINT}/people`),
        fetch(`${config.API_ENDPOINT}/pets/dogs`),
        fetch(`${config.API_ENDPOINT}/pets/cats`)
      ])
        .then(([peopleRes, dogsRes, catsRes]) => {
          if (!peopleRes.ok)
            return peopleRes.json().then(e => Promise.reject(e))
          if (!dogsRes.ok)
            return dogsRes.json().then(e => Promise.reject(e))
            if (!catsRes.ok)
            return catsRes.json().then(e => Promise.reject(e))
          return Promise.all([
            peopleRes.json(),
            dogsRes.json(),
            catsRes.json(),
          ])
        })
        .then(([people, dogs, cats]) => {
          this.setState({ people, dogs, cats })
        })
        .catch(error => {
          console.error({ error })
        })
      let username = 'user'
      this.setState({
        user: window.localStorage.getItem(username)
      })
  
    }
    handleRemovePerson = e => {
      this.setState({
        people: this.state.people.shift()
      })
    }
    handleAddPerson = person => {
      this.setState({
        people: [
          ...this.state.people,
          person
        ]
      })
    }
    handleAdoptDog = e =>{
      this.setState({
        dogs: this.state.dogs.shift()
      })
    }
    handleAdoptCat = e => {
      this.setState({
        cats: this.state.cats.shift()
      })
    }
    renderMainRoutes() {
      return(
<>
    <Route
    exact
    path={'/'}
    component={LandingPage}
  />
  <Route
    exact
    path={'/adoption'}
    component={Adoption}
  />
  </>
      )
    }
  render(){
    const value = {
      people: this.state.people,
      dogs:this.state.dogs,
      cats: this.state.cats,
      user: this.state.user,
      addPerson: this.handleAddPerson,
      adoptDog: this.handleAdoptDog,
      adoptCat: this.handleAdoptCat,
      removePerson: this.handleRemovePerson
    }
 
  return (
    <BrowserRouter>
    <AppContext.Provider value={value}>
  <div>
    <header className = "Header-Main">
  <Link to='/'>
<h1>

  Fifo
   {' '}
   
      <i className="fas fa-bone">
     <FontAwesomeIcon className='logo' icon='bone' />
     </i>
    </h1>
    
    </Link>
    <div className="pets-link">
    <Link to='/adoption'>
    <i className="fas fa-paw">
     <FontAwesomeIcon className='logo' icon='paw' />
      </i>
      Our Pets
      </Link>
      </div>
    </header>
    {this.renderMainRoutes()}
  </div>
  </AppContext.Provider>
  </BrowserRouter>
  )
 }
}
export default Root

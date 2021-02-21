import React from 'react'
import config from '../config'
import FrontofLine from '../FrontofLine/FrontofLine'
import NotFrontofLine from '../NotFrontofLine/NotFrontofLine'
import './Adoption.css'
import AppContext from '../AppContext'
import PropTypes from 'prop-types';


export default class Adoption extends React.Component {
  state = {
    adoptedPet: ''
  };

  static defaultProps = {
    match: {
      params: {}
    }
  }
  handleAdoptedpet = (petName) => {
    this.setState({
      adoptedPet: petName
    })
  }

  adoptEvent = () => {
    this.handlePersonOut()
    Math.floor(Math.random() * 2) === 0
      ? this.handleClickAdoptCat()
      : this.handleClickAdoptDog()
  }


  handleNewPerson = () => {

    const newPerson = [{
      person_name: 'Tony',
    },
    {
      person_name: 'Paulie',
    },
    {
      person_name: 'Carlos',
    },
    {
      person_name: 'Cher',
    },
    {
      person_name: 'Sunny',
    }
    ]

    fetch(`${config.REACT_APP_API_BASE}/people`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPerson[Math.floor(Math.random() * 5)])
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(data => {

        this.context.addPerson(data.person_name)


      })
      .catch(error => {
        console.error({ error })
      })

  }


  handlePersonOut = () => {

    fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.removePerson()
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleClickAdoptDog = () => {


    fetch(`${config.REACT_APP_API_BASE}/pets/dog`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.adoptDog()
      })
      .catch(error => {
        console.error({ error })
      })
  }
  handleClickAdoptCat = () => {


    fetch(`${config.REACT_APP_API_BASE}/pets/cat`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.adoptCat()
      })
      .catch(error => {
        console.error({ error })
      })
  }
 

  static contextType = AppContext

  people = this.context.people
  user = this.context.user
  peopleLine = this.people.length;
  placeInLine = this.people.findIndex(el => el === this.user) + 1
  
  render() {

    const { people = [], user = '' } = this.context
    const peopleLine = people.length;
    const placeInLine = people.findIndex(el => el === user) + 1



    const userDisplay = placeInLine === 1
      ? <FrontofLine handleAdoptedpet={this.handleAdoptedpet} />
      : <NotFrontofLine />


    return (

      <section className='Adoption_Main'>

        <h2>Pets Available for Adoption</h2>
        <h3>Hi {user || 'there'}!</h3>
        {this.state.adoptedPet && <h3>You adopted {this.state.adoptedPet}!</h3>}
        <div className="people-queue">
          {placeInLine > 0 && <p>Your place in line is: {placeInLine}</p>}
          <p>People now in line: {peopleLine}</p>
          <ol className='people__list'>
            {people.map((person,i) =>
              <li key={person + i}>
                {person}

              </li>
            )}
          </ol>
        </div>
        {userDisplay}
      </section>
    )
  }
}
Adoption.defaultProps = {
  match: {},
}
Adoption.propTypes = {
  props: PropTypes.shape({
    match: PropTypes.object,
  })
}

import React from 'react'
import config from '../config'
import './NotFrontofLine.css'
import AppContext from '../AppContext'
import PropTypes from 'prop-types';


export default class NotFrontofLine extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  adoptEvent = () => {
    this.handlePersonOut()
    this.handleNewPerson()
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

  componentDidMount() {

    this.interval = setInterval(() => {
      this.adoptEvent()
    }, 5000)

  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  people = this.context.people
  user = this.context.user
  peopleLine = this.people.length;


  render() {

    const { dogs = [], cats = [] } = this.context

    let currentDog = { ...dogs[0] }
    let dogImage = currentDog.imageURL
    let dogImagedesc = currentDog.description

    let currentCat = { ...cats[0] }
    let catImage = currentCat.imageURL
    let catImagedesc = currentCat.description
    let peopleLine = this.people.length;
    let petsStock = dogs.length === 1 || cats.length === 1
      ? true
      : false

    peopleLine === 0 && clearInterval(this.interval)

    petsStock && clearInterval(this.interval)




    return (


      <div className="dogs-and_cats">
        <article className="dogs">
          <h4>Pups</h4>
          <img src={dogImage} width="200" className="pet-photo" alt={dogImagedesc} />
          <p>{currentDog.name}</p>
          <p>Age:{' '}{currentCat.age}</p>
          <p>Breed:{' '}{currentDog.breed}</p>
          <p>Gender:{' '}{currentDog.gender}</p>
          <p>Story:{' '}{currentDog.story}</p>

        </article>
        <article className='cats'>
          <h4>Cats</h4>
          <img src={catImage} width="200" className="pet-photo" alt={catImagedesc} />
          <p>{currentCat.name}</p>
          <p>Age:{' '}{currentCat.age}</p>
          <p>Breed:{' '}{currentCat.breed}</p>
          <p>Gender:{' '}{currentCat.gender}</p>
          <p>Story:{' '}{currentCat.story}</p>

        </article>
      </div>

    )
  }
}
NotFrontofLine.defaultProps = {
  match: {},
}
NotFrontofLine.propTypes = {
  props: PropTypes.shape({
    match: PropTypes.object,
  })
}

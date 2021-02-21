import React from 'react'
import config from '../config'
import './FrontofLine.css'
import AppContext from '../AppContext'
import PropTypes from 'prop-types';


export default class FrontofLine extends React.Component {
  state = {
    firstPerson: false
  };

  static defaultProps = {
    match: {
      params: {}
    }
  }
 
  adoptEvent = ()=>{
   this.handleNewPerson()
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

    fetch(`${config.API_ENDPOINT}/people`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPerson[Math.floor(Math.random()*5)])
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


  handlePersonOut = () =>{
    
    fetch(`${config.API_ENDPOINT}/people`, {
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
    this.handlePersonOut()

    fetch(`${config.API_ENDPOINT}/pets/dog`, {
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
        this.props.handleAdoptedpet(this.currentDog.name)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  handleClickAdoptCat = () => {
    this.handlePersonOut()

    fetch(`${config.API_ENDPOINT}/pets/cat`, {
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
        this.props.handleAdoptedpet(this.currentCat.name)
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
    people  = this.context.people
    user = this.context.user
   peopleLine = this.people.length;
   currentDog = {...this.context.dogs[0]}
   currentCat = {...this.context.cats[0]}

  render() {

    const { dogs = [], cats = [], people = [] } = this.context
    const peopleLine = people.length;
    peopleLine >4 &&clearInterval(this.interval)
    
   
    let currentDog = {...dogs[0]}
    let dogImage = currentDog.imageURL
    let  dogImagedesc = currentDog.description

    let currentCat = {...cats[0]}
    let catImage = currentCat.imageURL
    let  catImagedesc = currentCat.description

    
  

    // const itemsForList = getItemsForList(items, listId)

   
 

    return (
      <>
      <h3>You're up! Pick your new bestie!</h3>
        <div className = "dogs-and_cats">
          
        <article className="dogs">
         
          <h4>Pups</h4>
          <img src={dogImage} width="200" className="pet-photo" alt={dogImagedesc} />
          <p>{currentDog.name}</p> 
    <p>Age:{' '}{currentCat.age}</p> 
            <p>Breed:{' '}{currentDog.breed}</p> 
            <p>Gender:{' '}{currentDog.gender}</p> 
            <p>Story:{' '}{currentDog.story}</p> 
            <button className = "adopt" onClick = {this.handleClickAdoptDog}>Adopt Me</button>
        </article>
        <article className='cats'>
          <h4>Cats</h4>
          <img src={catImage} width="200" className="pet-photo" alt={catImagedesc} />
            <p>{currentCat.name}</p> 
    <p>Age:{' '}{currentCat.age}</p> 
            <p>Breed:{' '}{currentCat.breed}</p> 
            <p>Gender:{' '}{currentCat.gender}</p> 
            <p>Story:{' '}{currentCat.story}</p> 
            <button className = "adopt" onClick = {this.handleClickAdoptCat}>Adopt Me</button>
          </article>
      </div>
      </>
    )
  }
}
FrontofLine.defaultProps = {
  match: {},
}
FrontofLine.propTypes = {
  props: PropTypes.shape({
    match: PropTypes.object,
  })
}

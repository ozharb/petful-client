import React, { Component } from 'react'
import './LandingPage.css'
import config from '../config'
// import { Link } from "react-router-dom"
import main from './images/petful-1.jpg'
import AppContext from '../AppContext'


export default class LandingPage extends Component {
  state = {
    error: null,
    registered: false
  }
  static defaultProps = {
    history: {
      push: () => { },
    },
  }
  handleLoginSuccess = () => {
    const { history } = this.props
 
      history.push('/adoption')
    
  }
  handleSubmit = e => {
    e.preventDefault()
    const newPerson = {
      person_name: e.target['name'].value,
    }
    fetch(`${config.REACT_APP_API_BASE}/people`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newPerson)
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(data => {

        this.context.addPerson(data.person_name)
        
        // const person_name = 'user'
        this.context.saveUser(data.person_name)
       
        this.handleLoginSuccess()
      })
      .catch(error => {
        console.error({ error })
      })

  }

  static contextType = AppContext
  render() {
   
    return (
      <article className='LandingPage'>

        <header role="banner">
          <h2>Fifo</h2>
          <p>Pet Adoption</p>
        </header>
        <h3> Where your next best friend awaits!</h3>

        <p>Get in line and look at the dogs and cats available for adoption as you wait</p>
        <p><span role='img' aria-label="cat-and-dog">🐶🐱</span></p>
        <section className="app-features">

          <h3>Add your name below to get started!</h3>
          <img src={main} width="200" className="app-screenshot home" alt="cartoon-dog" />
          <p>The adoption process:</p>
          <ul>
            <li>Add your name to get in line</li>
            <li>While you wait, you can view the dogs and cats available for adoption</li>
            <li>Only those ahead of you may adopt a pet.</li>
            <li>Once a pet is adopted, they will be removed from the list of pets you can see while you wait.</li>
            <li>When you get to the top of the list it's your turn to pick a pet!</li>
            <li>Once it's your turn, you may pick either the dog or cat that's been waiting the longest for a home</li>
          </ul>
          <p>Maybe you want a dog, maybe a cat. Who knows!</p>
        </section>
        <section>

          <h3>They're all great</h3>


          <p><em>"Woof" - FIFO dog</em></p>

        </section>
        <section>
          <h3>Add your name below to get in line and go to the adoption page</h3>
          <form
            onSubmit={this.handleSubmit}>
            <input
              name='name'
              required
              id='registration_name'
            >
            </input>
            <button className="register-button"
              type='submit'
              to={"/adoption"}>
              Register
        </button>
          </form>
          <h3>Hurry, your best friend is waiting!</h3>
        </section>
      </ article>

    )
  }
}

import React from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import './Adoption.css'
import AppContext from '../AppContext'
// import { countItemsForList, getItemsForList, findList } from '../app-helpers'
// import ApiError from '../ApiError'
import PropTypes from 'prop-types';


export default class Adoption extends React.Component {
  state = {
    // addingItem: false,
    // deletingList: false,
  };

  static defaultProps = {
    match: {
      params: {}
    }
  }

//   handleAddItemButton = e => {

//     this.setState({
//       addingItem: !this.state.addingItem
//     })
//   }
//   handleDeleteListButton = e => {
//     this.setState({
//       deletingList: !this.state.deletingList
//     })
//   }


  static contextType = AppContext

  
  render() {
  
    const { dogs = [], cats = [], people = [], user = ''} = this.context
    const peopleLine = people.length;

    // const currentList = { ...list }
 

    // const itemsForList = getItemsForList(items, listId)

   
 

    return (
      <section className='Adoption_Main'>
      <h2>Pets Available for Adoption</h2>
    <h3>Hi {user || 'there'}!</h3>

          <div className="people-queue">
              <p>Your place in line is:</p>
    <p>People now in line: {peopleLine}</p>
        </div>
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

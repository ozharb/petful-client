import React from 'react'

const AppContext = React.createContext({
    people: [],
    dogs: [],
    cats: [],
    user: '',
    addPerson: () => {},
    adoptDog:() => {},
    adoptCat: () => {},
    removePerson: () => {},
    saveUser: () => {}
})

export default AppContext


import React from 'react'

const AppContext = React.createContext({
    people: [],
    dogs: [],
    cats: [],
    user: '',
    addPerson: () => {},
    adoptDog:() => {},
    adoptCat: () => {},
    removePerson: () => {}
})

export default AppContext


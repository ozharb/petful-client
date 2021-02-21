import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root/Root'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faBone, faPaw } from '@fortawesome/free-solid-svg-icons'

library.add(fab,
  faCheckSquare,
  faBone,
  faPaw
  )
  
ReactDOM.render(<Root />, document.getElementById('root'))

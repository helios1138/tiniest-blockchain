import React from 'react'
import { styles } from '../../hoc/styles'

export const Address = styles({
  root: {
    margin: 0,
    padding: [5, 10],
    backgroundColor: '#888',
    borderRadius: 5,
    color: 'white',
  },
})(({ classes, children }) => (
  <pre className={classes.root}
       children={children} />
))

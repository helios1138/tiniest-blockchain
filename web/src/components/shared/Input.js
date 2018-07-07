import React from 'react'
import classNames from 'classnames'

import { styles } from '../../hoc/styles'

export const Input = styles('Input', {
  root: {
    border: [1, 'solid', '#aaa'],
    padding: [10, 15],
    borderRadius: 5,
    color: 'inherit',
  },
})(({ classes, className, multiline, ...rest }) => (
  multiline
    ? <textarea className={classNames(classes.root, className)}
                {...rest} />
    : <input className={classNames(classes.root, className)}
             {...rest} />
))

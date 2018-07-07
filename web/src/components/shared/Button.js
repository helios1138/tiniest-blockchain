import React from 'react'
import classNames from 'classnames'

import { styles } from '../../hoc/styles'
import { Flex } from './Flex'

export const Button = styles('Button', {
  root: {
    cursor: 'pointer',
    padding: [5, 10],
    borderRadius: 5,
    border: [1, 'solid', 'transparent'],
    backgroundColor: '#f8f8f8',
    '&:hover': {
      backgroundColor: '#eee',
    },
    '&:active': {
      borderColor: '#ddd',
    },
    textDecoration: ({ disabled }) => disabled && 'line-through',
    color: ({ disabled }) => disabled && '#aaa',
  },
})(({ classes, className, disabled, onClick, ...rest }) => (
  <Flex className={classNames(classes.root, className)}
        onClick={disabled ? undefined : onClick}
        {...rest} />
))

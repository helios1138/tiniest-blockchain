import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'
import classNames from 'classnames'
import * as R from 'ramda'

import { styles } from '../../hoc/styles'

export const Flex = compose(
  pure,
  styles('Flex', {
    root: {
      display: 'flex',
      flex: ({ flex }) => (typeof flex === 'number') ? `${flex} 0 auto` : flex,
      flexDirection: ({ vertical }) => vertical ? 'column' : 'row',
      alignItems: ({ vertical, align, alignVertical }) => vertical ? align : alignVertical,
      justifyContent: ({ vertical, align, alignVertical }) => vertical ? alignVertical : align,
    },
  }),
)(({ classes, className, ...rest }) => (
  <div className={classNames(classes.root, className)}
       {...R.omit([
         'flex',
         'vertical',
         'align',
         'alignVertical',
       ], rest)} />
))

Flex.propTypes = {
  flex: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  vertical: PropTypes.bool,
  align: PropTypes.string,
  alignVertical: PropTypes.string,
  className: PropTypes.string,
}

Flex.defaultProps = {
  flex: 0,
}

import React from 'react'
import PropTypes from 'prop-types'
import { compose, pure } from 'recompose'

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
)(({ classes, children, className }) => (
  <div className={[classes.root, className].filter(c => c).join(' ')}>{children}</div>
))

Flex.propTypes = {
  flex: PropTypes.number,
  vertical: PropTypes.bool,
  align: PropTypes.string,
  alignVertical: PropTypes.string,
  className: PropTypes.string,
}

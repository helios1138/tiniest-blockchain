import injectSheet from 'react-jss'
import { compose, setDisplayName } from 'recompose'
import * as R from 'ramda'

export const styles = (...args) => {
  let displayName, styles, options

  if (R.is(String, args[0])) {
    [displayName, styles, options] = args
  } else {
    [styles, options] = args
    displayName = null
  }

  return compose(
    injectSheet(styles, options),
    displayName ? setDisplayName(displayName) : R.identity,
  )
}

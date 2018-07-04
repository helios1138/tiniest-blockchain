import injectSheet from 'react-jss'
import { compose, getDisplayName, setDisplayName } from 'recompose'
import * as R from 'ramda'

export const styles = (...args) => {
  let displayName, styles, options

  if (R.is(String, args[0])) {
    [displayName, styles, options] = args
  } else {
    [styles, options] = args
    displayName = null
  }

  return Component => compose(
    injectSheet(styles, options),
    setDisplayName(displayName || getDisplayName(Component)),
  )(Component)
}

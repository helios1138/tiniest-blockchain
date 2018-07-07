import React from 'react'
import * as R from 'ramda'
import { compose, withPropsOnChange, mapProps } from 'recompose'

const getContext = R.memoizeWith(R.identity, React.createContext)

export const provideContext = (name, hoc, addedProps) => {
  const { Provider } = getContext(name)

  return compose(
    hoc,
    withPropsOnChange(
      addedProps,
      props => ({
        [name]: R.pick(addedProps, props),
      }),
    ),
    mapProps(R.omit(addedProps)),
    Component => props => (
      <Provider value={props[name]}>
        <Component {...props} />
      </Provider>
    ),
  )
}

export const consumeContext = name => Component => props => {
  const { Consumer } = getContext(name)

  return (
    <Consumer>
      {value => (
        <Component {...props}
                   {...{ [name]: value }} />
      )}
    </Consumer>
  )
}

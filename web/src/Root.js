import React from 'react'
import { withStateHandlers } from 'recompose'

import { provideContext } from './hoc/context'

@provideContext('auth', withStateHandlers(), [])
export class Root extends React.Component {
  render () {
    return (
      <div>root</div>
    )
  }
}

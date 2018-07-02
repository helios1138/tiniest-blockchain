import React from 'react'
import { withStateHandlers } from 'recompose'

import { provideContext } from '../hoc/context'
import { Authentication } from './Authentication'

@provideContext('auth', withStateHandlers({
  privateKey: null,
  publicKey: null,
}, {
  setKeyPair: () => ({ publicKey, privateKey }) => ({ publicKey, privateKey }),
}), [
  'privateKey',
  'publicKey',
  'setKeyPair',
])
export class Root extends React.Component {
  render () {
    const { auth } = this.props

    return auth.privateKey
      ? <div>home</div>
      : <Authentication />
  }
}

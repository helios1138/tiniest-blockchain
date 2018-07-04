import React from 'react'
import forge from 'node-forge'

import { consumeContext } from '../hoc/context'
import { styles } from '../hoc/styles'
import { flex } from '../flex'

@consumeContext('auth')
@styles({
  root: flex({ vertical: true }),
})
export class Authentication extends React.Component {
  state = {
    privateKey: localStorage.getItem('privateKey') || '',
    publicKey: '',
  }

  componentDidMount () {
    if (this.state.privateKey) {
      try {
        this.setState({ publicKey: this.getPublicKeyFromPrivateKey(this.state.privateKey) })
      } catch (e) {
        this.setState({ privateKey: '' })
      }
    }
  }

  generateKeyPair = () => {
    const keyPair = forge.ed25519.generateKeyPair()

    this.setState({
      privateKey: keyPair.privateKey.toString('base64'),
      publicKey: keyPair.publicKey.toString('base64'),
    })
  }

  getPublicKeyFromPrivateKey = privateKey =>
    forge.ed25519
      .publicKeyFromPrivateKey({ privateKey: Buffer.from(privateKey, 'base64') })
      .toString('base64')

  onPrivateKeyChanged = ({ target: { value: privateKey } }) => {
    this.setState({
      privateKey,
      publicKey: '',
    })

    try {
      this.setState({ publicKey: this.getPublicKeyFromPrivateKey(privateKey) })
    } catch (e) { }
  }

  authenticate = () => {
    const { privateKey, publicKey } = this.state

    localStorage.setItem('privateKey', privateKey)

    this.props.auth.setKeyPair({
      privateKey,
      publicKey,
    })
  }


  render () {
    const { privateKey, publicKey } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div>
          <button onClick={this.generateKeyPair}>generate new key</button>
        </div>
        <div>
          <textarea value={privateKey}
                    onChange={this.onPrivateKeyChanged} />
          <div>{publicKey}</div>
        </div>
        <div>
          <button disabled={!publicKey}
                  onClick={this.authenticate}>
            use this key
          </button>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

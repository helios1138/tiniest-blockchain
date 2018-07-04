import React from 'react'
import forge from 'node-forge'

import { consumeContext } from '../hoc/context'
import { Flex } from './shared/Flex'
import { Input } from './shared/Input'

@consumeContext('auth')
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

    return (
      <Flex flex={1}
            vertical>
        <Flex vertical
              flex={1} />
        <Flex flex={1}
              align="center">
          <Input multiline
                 value={privateKey}
                 onChange={this.onPrivateKeyChanged} />
        </Flex>
        <Flex flex={1}
              align="center"
              alignVertical="flex-start">
          <button onClick={this.generateKeyPair}>generate new key</button>
          <button disabled={!publicKey}
                  onClick={this.authenticate}>
            use this key
          </button>
        </Flex>
      </Flex>
    )
  }
}

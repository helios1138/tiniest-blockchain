import React from 'react'
import forge from 'node-forge'
import { compose, withStateHandlers, lifecycle, withProps } from 'recompose'

import { consumeContext } from '../hoc/context'
import { Flex } from './shared/Flex'
import { Input } from './shared/Input'
import { styles } from '../hoc/styles'
import { Button } from './shared/Button'
import { Address } from './shared/Address'

const getPublicKeyFromPrivateKey = privateKey =>
  forge.ed25519
    .publicKeyFromPrivateKey({ privateKey: Buffer.from(privateKey, 'base64') })
    .toString('base64')

const state = withStateHandlers(() => ({
  privateKey: localStorage.getItem('privateKey') || '',
  publicKey: '',
}), {
  setKeyPair: () => pair => pair,
  generateKeyPair: () => () => {
    const keyPair = forge.ed25519.generateKeyPair()

    return {
      privateKey: keyPair.privateKey.toString('base64'),
      publicKey: keyPair.publicKey.toString('base64'),
    }
  },
})

const actions = withProps(({ setKeyPair, privateKey, publicKey, auth }) => ({
  onPrivateKeyChanged: ({ target: { value: privateKey } }) => {
    setKeyPair({ privateKey, publicKey: '' })

    try {
      setKeyPair({ publicKey: getPublicKeyFromPrivateKey(privateKey) })
    } catch (e) { }
  },
  authenticate: () => {
    localStorage.setItem('privateKey', privateKey)

    auth.setKeyPair({
      privateKey,
      publicKey,
    })
  },
}))

const checkOnMount = lifecycle({
  componentDidMount () {
    const { privateKey, setKeyPair } = this.props

    if (privateKey) {
      try {
        setKeyPair({ publicKey: getPublicKeyFromPrivateKey(privateKey) })
      } catch (e) {
        setKeyPair({ privateKey: '' })
      }
    }
  },
})

const style = styles('Authentication', {
  container: {
    '& > *': {
      margin: 10,
    },
  },
  input: {
    width: 500,
    resize: 'none',
  },
  block: {
    '& > *': {
      margin: 5,
    },
  },
})

const render = ({
  classes,
  privateKey,
  publicKey,
  onPrivateKeyChanged,
  generateKeyPair,
  authenticate,
}) => (
  <Flex flex={1}
        align="center"
        alignVertical="center">
    <Flex vertical
          className={classes.container}>
      <Input multiline
             value={privateKey}
             onChange={onPrivateKeyChanged}
             className={classes.input} />
      <Flex className={classes.block}
            alignVertical="center">
        Address: {publicKey ? <Address>{publicKey}</Address> : 'Private key is invalid'}
      </Flex>
      <Flex align="space-around">
        <Button onClick={generateKeyPair}>Generate new key</Button>
        <Button disabled={!publicKey}
                onClick={authenticate}>
          Use this key
        </Button>
      </Flex>
    </Flex>
  </Flex>
)

export const Authentication = compose(
  consumeContext('auth'),
  state,
  actions,
  checkOnMount,
  style,
)(render)

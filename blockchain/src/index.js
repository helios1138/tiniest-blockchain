import './core/logger/prettifyConsoleLog'

import { serve } from './core/server/serve'
import { setup } from './core/graphql/setup'
import * as api from './api'
import { instance } from './core/singleton/singleton'
import { Consensus } from './consensus/consensus'

import forge from 'node-forge'

serve(app => {
  setup(app, api)
})

//instance(Consensus).start()


const test = async () => {
  const keypair = forge.ed25519.generateKeyPair()

  console.log(keypair)

  const signed = forge.ed25519.sign({
    message: Buffer.from('test'),
    privateKey: keypair.privateKey,
  })

  console.log(signed.toString('base64'))

  const signed2 = forge.ed25519.sign({
    message: Buffer.from('test'),
    privateKey: keypair.privateKey,
  })

  console.log(signed2.toString('base64'))

  const verified = forge.ed25519.verify({
    message: Buffer.from('test'),
    signature: signed,
    publicKey: keypair.publicKey,
  })

  console.log({ verified })
}

test().catch(console.error)

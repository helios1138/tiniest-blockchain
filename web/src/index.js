import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import forge from 'node-forge'

const App = () => (
  <div>1234</div>
)

// const keypair = forge.ed25519.generateKeyPair()
//
// console.log(keypair.publicKey.toString('base64'))
// console.log(keypair.privateKey.toString('base64'))

const publicKey = Buffer.from('/OyXZ6pec4rbA52zMOvOxkYUHXOeROyILBSPxyw2a+c=', 'base64')
const privateKey = Buffer.from('/b1YT+BmkpOPiyybQ3pQabZimvZaZWPdWwsZJhvdOQ387Jdnql5zitsDnbMw687GRhQdc55E7IgsFI/HLDZr5w==', 'base64')

const transaction = {
  from: publicKey.toString('base64'),
  to: 'otherkey',
  amount: 10,
}

console.log(transaction)

const signature = forge.ed25519.sign({
  message: Buffer.from('/OyXZ6pec4rbA52zMOvOxkYUHXOeROyILBSPxyw2a+c='),
  privateKey: privateKey,
})

console.log({ signature: signature.toString('base64') })

console.log(forge.ed25519.verify({
  message: Buffer.from(JSON.stringify(transaction)),
  signature: Buffer.from(signature, 'base64'),
  publicKey: Buffer.from(transaction.from, 'base64'),
}))


// const verified = forge.ed25519.verify({
//   message: 'hello',
//   encoding: 'utf8',
//   signature: signed,
//   publicKey: keypair.publicKey,
// })
//
// console.log({ verified })

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

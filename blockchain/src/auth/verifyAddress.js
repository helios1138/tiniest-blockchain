import forge from 'node-forge'

export const verifyAddress = (address, ctx) => {
  try {
    const { timestamp, signature } = JSON.parse(ctx.req.header('signature'))

    return forge.ed25519.verify({
      message: Buffer.from('' + timestamp),
      signature: Buffer.from(signature, 'base64'),
      publicKey: Buffer.from(address, 'base64'),
    })
  } catch (e) {
    return false
  }
}

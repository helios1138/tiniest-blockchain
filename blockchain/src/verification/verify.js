import forge from 'node-forge'

export const verify = (address, ctx) => {
  try {
    const { timestamp, signature } = JSON.parse(ctx.req.header('access'))

    if (Date.now() - timestamp < 1000) {
      return false
    }

    return forge.ed25519.verify({
      message: Buffer.from('' + timestamp),
      signature: Buffer.from(signature, 'base64'),
      publicKey: Buffer.from(address, 'base64'),
    })
  } catch (e) {
    return false
  }
}

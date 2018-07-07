import httpRequest from 'request'

export const request = (url, query, variables) => new Promise((resolve, reject) => {
  httpRequest({
    method: 'POST',
    url,
    body: { query, variables },
    json: true,
  }, (error, response, body) => {
    if (error) {
      reject(error)
    } else {
      resolve(body)
    }
  })
})

import { MongoClient } from 'mongodb'

import { config } from '../config/config'

export const Mongodb = () => {
  let _conn = null

  return Object.freeze({
    connect: () =>
      MongoClient
        .connect(config.get('mongodb.connection'), { useNewUrlParser: true })
        .then(conn => { _conn = conn }),
    getConnection: () => _conn,
  })
}

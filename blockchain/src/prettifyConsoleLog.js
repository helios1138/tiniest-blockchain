import util from 'util'

let log = ::console.log

console.log = (...args) =>
  log(...args.map(arg =>
    (typeof arg === 'string') ? arg : util.inspect(arg, { depth: null, colors: true }),
  ))

import React from 'react'

export const Input = ({ multiline, ...props }) =>
  multiline
    ? <textarea {...props} />
    : <input {...props} />

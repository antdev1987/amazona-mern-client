import React from 'react'

const MessageBox = ({modo, children }) => {

  return (
    <div className={modo ? 'alert alert-danger' : 'alert alert-info'} role="alert">
    {children}
  </div>
  )
}

export default MessageBox
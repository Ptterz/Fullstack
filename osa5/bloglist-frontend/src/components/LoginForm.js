import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label>Username:</label>
      <input {...username.inputContent} />
    </div>
    <div>
      <label>Password:</label>
      <input {...password.inputContent} />
    </div>
    <div>
      <button type="submit">login</button>
    </div>
  </form>
)

export default LoginForm
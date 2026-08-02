import { useState } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      alert("Please fill in both fields")
      return
    }
    alert(`Welcome, ${email}!`)
  }

  return (
    <section className="login">
      <div className="login-box">
        <h2>Login to Vertex Learn AI</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </section>
  )
}

export default Login
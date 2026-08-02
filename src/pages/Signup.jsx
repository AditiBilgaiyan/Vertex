import { useState } from "react";
import { supabase } from "../supabaseClient";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    // Create User in Authentication
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Insert User Data into Profiles Table
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            user_id: data.user.id,
            full_name: fullName,
            email: email,
            role: "Student",
          },
        ]);

      if (profileError) {
        console.log("Profile Error:", profileError);
        alert(profileError.message);
        return;
      }
    }

    alert("Account Created Successfully!");
    console.log(data);
  }

  return (
    <div className="signup-page">
      <h1>Create Account</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
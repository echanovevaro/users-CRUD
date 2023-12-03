import { useLocation, redirect, json } from "react-router-dom"
import AuthForm from "../components/AuthForm"
import { auth } from "../lib/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { LoginSchema, SignupSchema } from "../validation/authSchemas"

function AuthPage() {
  const location = useLocation()
  const isLogin = location.pathname === "/login"
  return (
    <div style={{ maxWidth: "600px" }}>
      <h1>{isLogin ? "Login" : "Create an account"}</h1>
      <AuthForm />
    </div>
  )
}

export const loginAction = async ({ request }) => {
  console.log(request)
  const data = await request.formData()
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  }
  const validation = LoginSchema.safeParse(authData)
  console.log(validation)
  if (!validation.success) {
    let errors = {}
    console.log(validation.error.errors)
    validation.error.errors.forEach((err) => {
      if (!errors[err.path[0]]) {
        errors[err.path[0]] = err.message
      }
    })
    return json({ errors }, { status: 422 })
  }
  let userCredential
  try {
    userCredential = await signInWithEmailAndPassword(
      auth,
      authData.email,
      authData.password
    )
  } catch (err) {
    console.log(err)
    if (err.code === "auth/invalid-credential") {
      return json({ message: "Invalid email or password" }, { status: 401 })
    }
    throw err
  } finally {
    if (userCredential) {
      const token = userCredential.user.accessToken
      localStorage.setItem("token", token)
      let expiration = new Date()
      expiration.setMinutes(expiration.getMinutes() + 5)
      localStorage.setItem("expiration", expiration.toISOString())
      return redirect("/")
    }
  }
}

export const signupAction = ({ email, password }) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(user)
      console.log(userCredential)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
}

export default AuthPage

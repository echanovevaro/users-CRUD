// import { useForm } from "react-hook-form"
import {
  Link,
  useLocation,
  useNavigate,
  useActionData,
  Form,
} from "react-router-dom"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { LoginSchema, SignupSchema } from "../validation/authSchemas"

function AuthForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === "/login"
  const isSubmitting = navigate.status === "submitting"
  // const submit = useSubmit()
  // const schema = isLogin ? LoginSchema : SignupSchema
  const data = useActionData()
  console.log("data", data)

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isSubmitting },
  // } = useForm({
  //   mode: "onBlur",
  //   resolver: zodResolver(schema),
  // })
  // const onSubmit = (data) => {
  //   let form_data = new FormData()
  //   for (let key in data) {
  //     form_data.append(key, data[key])
  //   }
  //   submit(form_data, { method: "POST" })
  // }
  return (
    <Form method="post">
      {data?.message && <small style={{ color: "red" }}> {data.message}</small>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          disabled={isSubmitting}
        />
        {data?.errors?.email && (
          <small style={{ color: "red" }}>{data.errors.email}</small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          disabled={isSubmitting}
        />
        {data?.errors?.password && (
          <small style={{ color: "red" }}>{data.errors.password}</small>
        )}
      </div>
      {!isLogin && (
        <div className="form-group">
          <label htmlFor="password2">Confirm password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            disabled={isSubmitting}
          />
          {data?.errors?.password2 && (
            <small style={{ color: "red" }}>{data.errors.password2}</small>
          )}
        </div>
      )}
      <div className="actions">
        {!isLogin ? (
          <Link to="/login">Already have an account?</Link>
        ) : (
          <Link to="/signup">Don't have an account?</Link>
        )}

        <button
          type="submit"
          className="btn btn-submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </Form>
  )
}

export default AuthForm

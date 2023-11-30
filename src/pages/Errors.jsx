/* eslint-disable react/prop-types */
// import { useRouteError } from "react-router-dom"

export default function Errors({ title, message }) {
  console.log("message", message)
  // const error = useRouteError()
  // let title = "An error occurred"
  // let message = "something went wrong"
  // if (error.status === 404) {
  //   title = "Page not found"
  //   message = "Sorry, the page you requested could not be found."
  // } else {
  //   message = error.message
  // }

  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div className="error-block-text">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}

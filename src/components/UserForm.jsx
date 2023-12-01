/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// export default function UserForm({ inputData, onSubmit, children }) {
//   function handleSubmit(event) {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const inputData = Object.fromEntries(formData)

//     onSubmit(inputData)
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div
//         className="form-group"
//         style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
//       >
//         <div style={{ width: "50%" }}>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="firstName"
//             name="firstName"
//             defaultValue={inputData?.firstName ?? ""}
//           />
//         </div>
//         <div style={{ width: "50%" }}>
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="lastName"
//             name="lastName"
//             defaultValue={inputData?.lastName ?? ""}
//           />
//         </div>
//       </div>

//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           className="form-control"
//           id="email"
//           name="email"
//           defaultValue={inputData?.email ?? ""}
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="catchPhrase">Catch Phrase</label>
//         <textarea
//           type="text"
//           className="form-control"
//           id="catchPhrase"
//           name="catchPhrase"
//           defaultValue={inputData?.catchPhrase ?? ""}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="paragraphs">Paragraphs </label>
//         <textarea
//           type="text"
//           className="form-control"
//           id="paragraphs"
//           name="paragraphs"
//           defaultValue={inputData?.paragraphs ?? ""}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="avatar">Avatar</label>
//         <input
//           type="text"
//           className="form-control"
//           id="avatar"
//           name="avatar"
//           defaultValue={inputData?.avatar ?? ""}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="urlLoremFlickr">Image</label>
//         <input
//           type="text"
//           className="form-control"
//           id="urlLoremFlickr"
//           name="urlLoremFlickr"
//           defaultValue={inputData?.urlLoremFlickr ?? ""}
//         />
//       </div>
//       <div> {children}</div>
//     </form>
//   )
// }

import { Formik, Form, useField } from "formik"
import * as Yup from "yup"

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{label}</label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{label}</label>
      <textarea className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  catchPhrase: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  paragraphs: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  avatar: Yup.string().url("Invalid url").required("Required"),
  urlLoremFlickr: Yup.string().url("Invalid url").required("Required"),
})

export default function userForm({ inputData, onSubmit, children }) {
  return (
    <Formik
      initialValues={{
        firstName: inputData?.firstName || "",
        lastName: inputData?.lastName || "",
        email: inputData?.email || "",
        catchPhrase: inputData?.catchPhrase || "",
        paragraphs: inputData?.paragraphs || "",
        avatar: inputData?.avatar || "",
        urlLoremFlickr: inputData?.urlLoremFlickr || "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values

        onSubmit(values)
      }}
    >
      <Form inputData={onSubmit}>
        <div className="input-name">
          <MyTextInput label="First Name" name="firstName" type="text" />

          <MyTextInput label="Last Name" name="lastName" type="text" />
        </div>
        <MyTextInput label="Email Address" name="email" type="email" />
        <MyTextArea
          label="Catch Phrase"
          name="catchPhrase"
          type="catchPhrase"
        />
        <MyTextArea label="Paragraphs" name="paragraphs" type="text" />
        <MyTextInput label="Avatar" name="avatar" type="text" />
        <MyTextInput label="Image Url" name="urlLoremFlickr" type="text" />

        <div> {children}</div>
      </Form>
    </Formik>
  )
}

/* eslint-disable react/prop-types */
export default function UserForm({ inputData, onSubmit, children }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const inputData = Object.fromEntries(formData)

    onSubmit(inputData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="form-group"
        style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
      >
        <div style={{ width: "50%" }}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            defaultValue={inputData?.firstName ?? ""}
          />
        </div>
        <div style={{ width: "50%" }}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            defaultValue={inputData?.lastName ?? ""}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          defaultValue={inputData?.email ?? ""}
        />
      </div>

      <div className="form-group">
        <label htmlFor="catchPhrase">Catch Phrase</label>
        <textarea
          type="text"
          className="form-control"
          id="catchPhrase"
          name="catchPhrase"
          defaultValue={inputData?.catchPhrase ?? ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="paragraphs">Paragraphs </label>
        <textarea
          type="text"
          className="form-control"
          id="paragraphs"
          name="paragraphs"
          defaultValue={inputData?.paragraphs ?? ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <input
          type="text"
          className="form-control"
          id="avatar"
          name="avatar"
          defaultValue={inputData?.avatar ?? ""}
        />
      </div>
      <div className="form-group">
        <label htmlFor="urlLoremFlickr">Image</label>
        <input
          type="text"
          className="form-control"
          id="urlLoremFlickr"
          name="urlLoremFlickr"
          defaultValue={inputData?.urlLoremFlickr ?? ""}
        />
      </div>
      <div> {children}</div>
    </form>
  )
}

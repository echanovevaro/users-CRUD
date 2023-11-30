import { useState } from "react"
import { DeleteModal } from "../components/DeleteModal"
import { Outlet, useParams, useNavigate } from "react-router-dom"
import { fetchUser } from "../http"
import classes from "../components/Details.module.css"

import { useQuery } from "@tanstack/react-query"

function DetailUser() {
  const [isdeleting, setIsdeleting] = useState(false)
  const { userId } = useParams()
  const navigate = useNavigate()
  const { data: user, isPending } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  })

  function handleStartDelteting() {
    setIsdeleting(true)
  }
  function handleStopDelteting() {
    setIsdeleting(false)
  }

  return (
    <>
      <Outlet />
      {isdeleting && <DeleteModal onClose={handleStopDelteting} />}
      {isPending && <div>Loading...</div>}
      {user && (
        <>
          <div className={classes.card}>
            <div className={classes.cardheader}>
              <div className={classes.user}>
                <div className={classes.dates}>
                  <img src={user.avatar} alt={user.firstName} />
                  <div>
                    <h4>
                      {user.firstName} {user.lastName}
                    </h4>
                    <small>{user.email}</small>
                  </div>
                </div>
                <h3>{user.catchPhrase}</h3>
                <p>{user.paragraphs}</p>
              </div>

              <div className={classes.cardbody}>
                <img
                  src={user.urlLoremFlickr}
                  alt={user.firstName}
                  className={classes.image}
                />
              </div>
            </div>
            <div className={classes.detailsActions}>
              <button
                className={classes.btnDelete}
                onClick={handleStartDelteting}
              >
                Delete
              </button>
              <button
                className={classes.btnEdit}
                onClick={() => navigate(`/users/${userId}/edit`)}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DetailUser

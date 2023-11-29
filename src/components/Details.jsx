/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import classes from "./Details.module.css"
import { useQuery, useMutation } from "@tanstack/react-query"
import { deleteUser, fetchUser, queryClient } from "../http"
import { useParams } from "react-router-dom"
import { useState } from "react"
import Modal from "./Modal"
export const Details = () => {
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
  const { mutate } = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ key: ["users"] })
      navigate("../")
    },
  })
  const handleDelete = () => {
    mutate(userId)
  }
  // console.log(user)
  return (
    <>
      {isdeleting && (
        <Modal onClose={handleStopDelteting}>
          <h2>Are you sure?</h2>
          <p>Delete user cannot be undone </p>
          <div className={classes.btn}>
            <button className={classes.btnDelete} onClick={handleDelete}>
              Delete
            </button>
            <button className={classes.btnEdit} onClick={handleStopDelteting}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
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
            <div className={classes.btn}>
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

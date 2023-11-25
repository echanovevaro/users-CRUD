/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import classes from "./Details.module.css"
import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../http"
import { useParams } from "react-router-dom"
export const Details = () => {
  const { userId } = useParams()
  const { data: user, isPending } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  })
  console.log(user)
  return (
    <>
      {isPending && <div>Loading...</div>}
      {user && (
        <>
          <div className={classes.card}>
            <div className={classes.cardheader}>
              <div className={classes.user}>
                <div className={classes.dates}>
                  <img src={user.avatar} alt={user.firstName} />
                  <h4>{user.firstName}</h4>
                  <h4>{user.lastName}</h4>
                </div>
                <small>{user.email}</small>
                <h3>{user.catchPhrase}</h3>
                <span>{user.catchPhraseNoun}</span>
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
              <button className={classes.btnDelete}>Delete</button>
              <button className={classes.btnEdit}>Edit</button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

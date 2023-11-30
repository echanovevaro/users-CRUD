/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import classes from "./Card.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import PlaceHolder from "../assets/imgSkeleton.jpg"
export const Card = ({ user }) => {
  return (
    <>
      <div className={classes.cardheader}>
        <div className={classes.user}>
          <img src={user.avatar} alt={user.firstName} />
          <div>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
          </div>
        </div>
        <LazyLoadImage
          loading="lazy"
          src={user.urlLoremFlickr}
          alt={user.firstName}
          width={200}
          PlaceholderSrc={PlaceHolder}
          className={classes.image}
        />
      </div>

      <div className={classes.cardbody}>
        <Link to={`/users/${user.id}`} className={classes.tag}>
          Details
        </Link>
        <h4>{user.catchPhrase}</h4>
        {/* <span>{user.catchPhraseNoun}</span>
        <small>{user.email}</small> */}
      </div>
    </>
  )
}

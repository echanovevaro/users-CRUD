/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import classes from "./Card.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

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
      </div>

      <div className={classes.cardbody}>
        <LazyLoadImage
          src={user.urlLoremFlickr}
          alt={user.firstName + " " + user.lastName} // use normal <img> attributes as props
          loading="lazy"
          effect="blur"
        />
        <Link to={`/users/${user.id}`} className={classes.tag}>
          Details
        </Link>

        <p>{user.catchPhrase}</p>
        {/* <span>{user.catchPhraseNoun}</span>
        <small>{user.email}</small> */}
      </div>
    </>
  )
}

import React from "react";
import "./styles.css";

export default function ProfileEmail(props) {
  return (
    <React.Fragment>
      <p
        style={{
          fontFamily: "Goldman",
          padding: 0,
          margin: "0 auto 0 0",
          textAlign: "left",
          textDecoration: "underline",
        }}
      >
        Email
      </p>
      <form>
        <input className="profile-email" value={props.email} disabled />
      </form>
    </React.Fragment>
  );
}

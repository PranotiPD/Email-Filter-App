import React from "react";
import "./Avatar.css";

const Avatar = ({id, name}) => {
  return (
    <div className="avatar" id={id}>
      {name[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
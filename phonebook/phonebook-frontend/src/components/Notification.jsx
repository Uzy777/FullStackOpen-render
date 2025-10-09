import "../index.css";
import React from "react";

const Notification = ({ message, type }) => {
    if (!message) return null;

    const className = type === "error" ? "notification error" : "notification";

    return (
        <div className={className}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;

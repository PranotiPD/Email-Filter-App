import React from "react";
import Avatar from "../Avatar/Avatar";
import './Email.css'
import moment from 'moment';

const Email = ({ email, fav, read, active }) => {
    const { id, from, date, subject, short_description } = email;

    const selected = active === id ? "email__selected " : "";
    const emailRead = read.includes(id) ? "email__read " : "";

    return (
        <li id={id} className={selected + emailRead} >
            <Avatar id={id} name={from.name} />
            <section id={id} className="email__list">
                <header id={id}>
                    <p id={id}>
                        From:{" "}
                            <strong id={id}>
                            {from?.name} &lt;{from?.email}&gt;
                            </strong>
                    </p>
                    <p id={id}>
                        Subject: <strong id={id}>{subject}</strong>
                    </p>
                </header>
                <p  id={id} className="description">{short_description}</p>
                <footer id={id} className="email__footer">
                <p id={id}>
                    {moment(date).calendar()} {moment(date).format("LT")}{" "}
                    {fav.includes(id) && <span id={id}>Favorite</span>}
                </p>
                </footer>
            </section>
        </li>
    )
}

export default Email;
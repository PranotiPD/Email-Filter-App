import React, { useEffect, useState } from "react";
import FilterHeader from "../FilterHeader/FilterHeader";
import './Inbox.css';
import { useDispatch, useSelector } from "react-redux";
import { getEmailList, getEmailById } from '../../store/emailAction';
import { useParams, useNavigate } from "react-router-dom";
import Email from '../Email/Email.jsx';
import moment from "moment";
import Avatar from "../Avatar/Avatar.jsx";

const Inbox = ({split, setSplit}) => {
    const [filter, setFilter] = useState("Unread");
    // const [page, setPage] = useState(1);
    const [favorite, setFavorite] = useState(
        JSON.parse(sessionStorage.getItem("favorites")) || []
      );
    const [read, setRead] = useState(
        JSON.parse(sessionStorage.getItem("read")) || []
      );
    const [selectedEmail, setSelectedEmail] = useState(
        JSON.parse(sessionStorage.getItem("current_email")) || false
      );

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { emails, loading:emailListLoading }  = useSelector((state) => state.emailList) || {};
    let {email, loading: emailContentLoading} = useSelector((state) => state.selectedEmail)
    const [emailList, setEmailList] = useState();

    const changeFilter = function (name) {
        setFilter(name);
        const filteredEmails = emails.reduce((acc, element) => {
            if (name === "Favorites" && favorite.includes(element.id)) {
              return [element, ...acc];
            } else if (name === "Read" && read.includes(element.id)) {
              return [element, ...acc];
            } else if (!read.includes(element.id)) {
              return [element, ...acc];
            }
            return [...acc, element];
          }, []);
      
          setEmailList(filteredEmails);
    }

    const openEmail = (e) => {
        if(e.target.id === '0') {
          setSplit(false)
          return;
        }
        setSplit(true)
        navigate(`/${e.target.id}`);
        const emailContent = emails.find((email) => email.id === e.target.id)
        if (e.target.id) {
            sessionStorage.setItem("current_email", JSON.stringify(emailContent));
        }
        setSelectedEmail(emailContent);
        if (!read.includes(emailContent.id)) {
        setRead([...read, emailContent.id]);
        }
    }
    useEffect(() => {
        sessionStorage.setItem("favorites", JSON.stringify(favorite));
        sessionStorage.setItem("read", JSON.stringify(read));
      }, [favorite, read]);

    useEffect(() => {
        dispatch(getEmailList(read));
    }, [dispatch, read]);

    useEffect(() => {
        dispatch(getEmailById(id));
    }, [dispatch, id])

    const removeFromFavorites = () => {
        setFavorite(favorite?.filter((e) => e !== id));
    }

    const addToFavorites = () => {
        setFavorite([...favorite, id]);
    }
    const displayEmailBody = function (selectedEmail) {
        return (
          <section className="email__body">
            <header>
              <Avatar name={selectedEmail.from.name} />
              <div className="email__body__header">
                <div className="email__body__info">
                  <h1>{selectedEmail?.subject}</h1>
                  <p>
                    {moment(selectedEmail?.date).calendar()}{" "}
                    {moment(selectedEmail?.date).format("LT")}
                  </p>
                </div>
                {favorite.includes(selectedEmail?.id) ? (
                  <button className="unfavorite" onClick={removeFromFavorites}>
                    Unmark as favorite
                  </button>
                ) : (
                  <button className="favorite" onClick={addToFavorites}>
                    Mark as favorite
                  </button>
                )}
              </div>
            </header>
            {emailContentLoading ? (
              <div>Loading....</div>
            ) : (
              <article
                className="email__body__content"
                dangerouslySetInnerHTML={{ __html: email.body }}
              ></article>
            )}
          </section>
        );
      };
    
    return(
        <div className="container" >
             <FilterHeader category={filter} selectFilter={changeFilter}/>
             <div className={split ? "container__body split" : "container__body"}>
             <nav>
             <ul onClick={openEmail} id="0">
              {emailListLoading ? (
                <div>Loading...</div>
              ) : emailList ? (
                emailList.map((email) => (
                  <Email
                    email={email}
                    key={email?.id}
                    fav={favorite}
                    read={read}
                    active={selectedEmail?.id}
                  />
                ))
              ) : (
                emails.map((email) => (
                  <Email
                    email={email}
                    key={email?.id}
                    fav={favorite}
                    read={read}
                    active={selectedEmail?.id}
                    onClick={openEmail}
                  />
                ))
              )}
              </ul>
              </nav>
              {split && displayEmailBody(selectedEmail)}
            </div>
        </div>
    )
}

export default Inbox;
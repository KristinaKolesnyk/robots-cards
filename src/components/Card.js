import React from "react";

const Card = ({ user, inCrew, onView, onToggleCrew }) => {
    const avatarSrc = `https://robohash.org/${user.avatarSeed || user.id}?&size=250x250`;

    return (
        <div className="robo-card">
            <img
                alt={`robot ${user.name}`}
                loading="lazy"
                width="250"
                height="250"
                src={avatarSrc}
            />
            <div className="mt2">
                <h2 className="f4 mt2 mb1">{user.name}</h2>

                <div className="robo-card__actions">
                    <button type="button" className="btn" onClick={() => onView(user)}>
                        View Passport
                    </button>
                    <button
                        type="button"
                        className={`btn ${inCrew ? "btn--ghost" : ""}`}
                        onClick={() => onToggleCrew(user)}
                    >
                        {inCrew ? "Remove from Crew" : "Add to Crew"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

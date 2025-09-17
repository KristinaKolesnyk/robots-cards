import React from "react";
import {buildRobotMeta} from "../utils/legend";

const Card = ({user, inCrew, onView, onToggleCrew}) => {
    const {origin, rank, stars, specialty} = buildRobotMeta(user);

    return (
        <div className="tc dib br3 pa3 ma2 shadow-5 robo-card">
            <img
                alt={`robot ${user.name}`}
                width="220"
                height="220"
                loading="lazy"
                src={`https://robohash.org/${user.id}?&size=220x220`}
            />
            <div className="mt2">
                <h2 className="f4 mt2 mb1">{user.name}</h2>
                

                <div className="mt3 flex justify-center gap8">
                    <button className="btn" onClick={() => onView(user)}>View Passport</button>
                    <button className={`btn ${inCrew ? "btn--ghost" : ""}`}
                            onClick={() => onToggleCrew(user)}>
                        {inCrew ? "Remove from Crew" : "Add to Crew"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

import React from "react";
import Card from "./Card";

const CardList = ({ robots, onView, onToggleCrew, crewIds }) => (
    <div className="cards-grid">
        {robots.map((user) => (
            <Card
                key={user.id}
                user={user}
                inCrew={crewIds.has(user.id)}
                onView={onView}
                onToggleCrew={onToggleCrew}
            />
        ))}
    </div>
);

export default CardList;

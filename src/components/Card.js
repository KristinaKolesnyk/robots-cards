import React from "react";


const Card = ({id, name, email}) => {
    return (
        <div className='tc dib br3 pa3 ma2 shadow-5 robo-card'>
            <img
                alt={`robot ${name}`}
                width="250"
                height="250"
                loading="lazy"
                src={`https://robohash.org/${id}?&size=220x220`}
            />
            <div className="mt2">
                <h2 className="f4 mt2 mb1">{name}</h2>
                <p className="f6 silver">{email}</p>
            </div>
        </div>
    );
}

export default Card;
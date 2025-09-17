import React, { useEffect } from "react";
import { buildRobotMeta } from "../utils/legend";

export default function RobotPassport({ user, inCrew, onToggleCrew, onClose }) {
    const meta = buildRobotMeta(user);

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Robot Passport">
            <div className="modal__backdrop" onClick={onClose} />
            <div className="modal__card">
                <button className="modal__close" aria-label="Close" onClick={onClose}>×</button>

                <div className="modal__body">
                    <img
                        alt={`portrait of ${user.name}`}
                        width="260"
                        height="260"
                        src={`https://robohash.org/${user.id}?&size=260x260`}
                    />
                    <div className="modal__text">
                        <h3 className="f3 mb2">{user.name}</h3>
                        <p className="silver mb3">{user.email}</p>

                        <dl className="passport">
                            <div><dt>Unit</dt><dd>{user.name}</dd></div>
                            <div><dt>Series ID</dt><dd>{meta.seriesId}</dd></div>
                            <div><dt>Origin</dt><dd>{meta.origin}</dd></div>
                            <div><dt>Rank</dt><dd>{meta.rank} {"★".repeat(meta.stars)}</dd></div>
                            <div><dt>Specialty</dt><dd>{meta.specialty}</dd></div>
                            <div><dt>Last Signal</dt><dd>{meta.lastSignal}</dd></div>
                            <div><dt>Trust Level</dt><dd>Stable</dd></div>
                            <div className="wide"><dt>Bio</dt><dd>{meta.bio}</dd></div>
                        </dl>

                        <div className="mt3">
                            <button className="btn" onClick={() => onToggleCrew(user)}>
                                {inCrew ? "Remove from Crew" : "Add to Crew"}
                            </button>
                        </div>
                    </div>
                </div>

                <p className="modal__note">Portraits by robohash.org · Built by Kristina</p>
            </div>
        </div>
    );
}

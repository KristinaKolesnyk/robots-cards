export const ORIGINS = {
    biz: "Mercury Trade Ring",
    net: "Neptune Relay",
    org: "Orion Guilds",
    tv:  "Titan Vector",
    me:  "Mars Enclave",
    info:"Io Archives",
    ca:  "Cancri Outpost",
    default: "Outer Rim"
};

// SAFE: always coerce to string
export function hashString(s){
    const str = String(s ?? "");
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return Math.abs(h);
}

export const pickFrom = (arr, seed) => arr[seed % arr.length];

export function getOriginFromEmail(email){
    // SAFE: if no email, just return default
    if (!email) return ORIGINS.default;
    const tld = (String(email).match(/\.(\w+)$/)?.[1] || "").toLowerCase();
    return ORIGINS[tld] || ORIGINS.default;
}

const SPECIALTIES = [
    "Pathfinder","Sentinel","Archivist","Comms Relay","Fix-it Core","Cartographer",
    "Negotiator","Scout","Guardian","Spark Chef","Holo-Projector","Stormproof"
];

export function getRankFromId(id){
    const n = Number(id) || hashString(String(id));
    const r = n % 100;
    if (r < 50) return { rank: "Orbitling",   stars: 1 };
    if (r < 80) return { rank: "Comet-Class", stars: 2 };
    if (r < 93) return { rank: "Nebula-Grade",stars: 3 };
    if (r < 98) return { rank: "Quasar",      stars: 4 };
    return { rank: "Supernova", stars: 5 };
}

export function getSpecialty(seedStr){
    const seed = hashString(seedStr);
    return pickFrom(SPECIALTIES, seed);
}

// KEY: prefer fields from your local JSON; only fall back to email-derived origin
export function buildRobotMeta(user){
    const seriesId  = user.seriesId || `RF-${String(user.id).padStart(4,'0')}`;
    const origin    = user.origin || getOriginFromEmail(user.email); // won't crash if email missing
    let { rank, stars } = user;
    if (!rank || stars == null){
        const g = getRankFromId(user.id);
        rank  ||= g.rank;
        stars ??= g.stars;
    }
    const specialty  = user.specialty || getSpecialty((user.name||"") + seriesId);
    const lastSignal = user.lastSignalDays
        ? `${user.lastSignalDays} days ago`
        : `${(hashString(user.name||seriesId) % 20) + 1} days ago`;
    const bio        = user.bio || `Built for ${specialty.toLowerCase()}. Loyal and low-maintenance. Enjoys stargazing.`;

    return { origin, rank, stars, specialty, seriesId, lastSignal, bio };
}

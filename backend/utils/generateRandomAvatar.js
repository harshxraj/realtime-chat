const maleCharacters = [
  "https://cdn.myanimelist.net/images/characters/2/241413.jpg",
  "https://cdn.myanimelist.net/images/characters/6/431152.jpg",
  "https://cdn.myanimelist.net/images/characters/9/310307.jpg",
  "https://cdn.myanimelist.net/images/characters/3/100534.jpg",
  "https://cdn.myanimelist.net/images/characters/14/273975.jpg",
  "https://cdn.myanimelist.net/images/characters/6/63870.jpg",
  "https://cdn.myanimelist.net/images/characters/16/388990.jpg",
  "https://cdn.myanimelist.net/images/characters/6/384253.jpg",
  "https://cdn.myanimelist.net/images/characters/6/386735.jpg",
  "https://cdn.myanimelist.net/images/characters/2/284121.jpg",
  "https://cdn.myanimelist.net/images/characters/15/68618.jpg",
  "https://cdn.myanimelist.net/images/characters/7/284129.jpg",
  "https://cdn.myanimelist.net/images/characters/9/131317.jpg",
  "https://cdn.myanimelist.net/images/characters/12/450359.jpg",
  "https://cdn.myanimelist.net/images/characters/9/284122.jpg",
];

const femaleCharcters = [
  "https://cdn.myanimelist.net/images/characters/12/422313.jpg",
  "https://cdn.myanimelist.net/images/characters/2/263249.jpg",
  "https://cdn.myanimelist.net/images/characters/16/363700.jpg",
  "https://cdn.myanimelist.net/images/characters/5/30971.jpg",
  "https://cdn.myanimelist.net/images/characters/11/365839.jpg",
  "https://cdn.myanimelist.net/images/characters/3/386591.jpg",
  "https://cdn.myanimelist.net/images/characters/9/69275.jpg",
  "https://cdn.myanimelist.net/images/characters/6/278736.jpg",
];

export const genereateRandomAvatar = (gender) => {
  if (gender === "male") {
    return maleCharacters[Math.floor(Math.random() * maleCharacters.length)];
  } else if (gender == "female") {
    return femaleCharcters[Math.floor(Math.random() * femaleCharcters.length)];
  }
};

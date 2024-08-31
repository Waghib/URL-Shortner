const sessionIdToUserMap = new Map();


function setUser(id, User) {
  sessionIdToUserMap.set(id, User);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser
};
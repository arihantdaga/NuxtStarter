module.exports = function stripUser (user, fields = ['name', '_id']) {
  let newUser = {};
  fields.map(field => {
    newUser[field] = user["field"];
  });
  return newUser
}

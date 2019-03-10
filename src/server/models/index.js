const mongoose = require('mongoose');
const { userSchema } = require('./User');
const { chefSchema } = require('./Chef');
const { expSchema } = require('./Experience');

mongoose.model("User", userSchema);
mongoose.model("Chef", chefSchema);
mongoose.model("Exp", expSchema);

module.exports = mongoose;
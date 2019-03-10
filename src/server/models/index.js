const mongoose = require('mongoose');
const { userSchema } = require('./User');
const { chefSchema } = require('./Chef');

mongoose.model("User", userSchema);
mongoose.model("Chef", chefSchema);

module.exports = mongoose;
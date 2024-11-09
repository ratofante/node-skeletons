const bcrypt = require("bcrypt");

/**
 * Returns a Promise that resolves to a hashed version of the given password.
 *
 * @param {string} password The password to hash.
 *
 * @returns {Promise<string>} A Promise that resolves to a hashed version of
 * the password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = hashPassword;

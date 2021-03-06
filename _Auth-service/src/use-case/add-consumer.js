const { makeCredentials } = require("../credentials");

module.exports = function makeAddConsumer({ axios, consumer_url }) {
  return async function addConsumer(info) {
    const credentials = makeCredentials(info);

    try {
      const res = await axios.post(consumer_url, {
        username: credentials.getUsername(),
      });
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  };
};

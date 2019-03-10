const Consts = Object.freeze({
  API_URLS: {
    login: {
      method: "POST",
      url: "/api/user/sign-in"
    },
    signup: {
      method: "POST",
      url: "/api/user/sign-up"
    },
    signout: {
      method: "POST",
      url: "/api/user/sign-out"
    },
    get_experiences: {
            method: "GET",
            url: "/api/experiences/"
    }
  }
});

module.exports = Consts;


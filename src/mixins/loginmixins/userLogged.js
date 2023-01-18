export default {
    computed: {
      userLogged(){
        return this.$store.getters['login/getIsUserLoggedIn']
      }
    },
  }
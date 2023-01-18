export default {
  computed: {
    // в этот computed надо передавать параметр для получения данных из объекта user в store/login.js
    getUserData() {
      return this.$store.getters['login/getUserData']
    },
  },
}

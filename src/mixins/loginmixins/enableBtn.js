export default {
  computed: {
    enableBtn() {
      let validArr = []
      for (let key in this.getInps) {
        validArr.push(this.getInps[key].valid === true ? true : false)
      }
      return validArr.every((item) => item === true)
    },
  },
}

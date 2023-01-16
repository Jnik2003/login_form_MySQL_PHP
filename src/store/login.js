export default {
  namespaced: true,
  state: {
    // Пользователь залогинен
    isUserLoggedIn: false,
    // пользователь зарегистрирован
    isUserRegistered: true,
    //стоит ли галочка "Запомнить меня"
    isRememberMe: false,
    //сообщение для ошибки входа
    loginError: '',
    // шаблон инпутов
    inpForRegisterForm: inpRegisterFormLayout(),
    inpForLoginForm: inpLoginFormLayout(),
  },
  getters: {
    getInpForRegisterForm(state) {
      return state.inpForRegisterForm
    },
    getInpForLoginForm(state) {
      return state.inpForLoginForm
    },
    getIsRememberMe(state){
      return state.isRememberMe
    },
    getIsUserLoggedIn(state){
      return state.isUserLoggedIn
    },
    getLoginError(state){
      return state.loginError
    }
  },
  mutations: {
    updInputValue(state, arr) {
      const [inpObj, key, inpFor] = arr
      state[inpFor][key].activated = true
      state[inpFor][key].valid = inpObj.valid
    },
    isRememberMeToggle(state, value){
      state.isRememberMe = value
    },
    createLS(state, [hash, ip]){
      console.log(hash, ip)
      localStorage.setItem('hash', hash)
      localStorage.setItem('ip', ip)      
    },
    delLS(state) {
      localStorage.removeItem('hash')
      localStorage.removeItem('ip')      
    },
    login(state){
      state.isUserLoggedIn = true
    },
    loginError(state, value){
      state.loginError = value
    }
  },
  actions: {
    updInputValue({ commit }, arr) {
      commit('updInputValue', arr)
    },
    isRememberMeToggle({commit}, value){
      commit('isRememberMeToggle', value)
    },
    async login({ commit, getters }) {
      // console.log(getters.getInpForLoginForm)
      const {email, password} = getters.getInpForLoginForm
      const rem = getters.getIsRememberMe
      // console.log(email.value)
      // console.log(password.value)
      // console.log(getters.getIsRememberMe)
      try {
        // let response = await fetch("http://test4.jnik.s53.hhos.ru/php/login.php", { // production
        let response = await fetch(`${process.env.VUE_APP_URL_TO_HANDLER}login.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
          body: JSON.stringify([email.value, password.value, rem]),
        }) // serve
        let res_from_login_php = await response.json()
        // res_from_login_php = JSON.parse(res_from_login_php)
        console.log(res_from_login_php)
       
        // console.log(JSON.parse(res_from_login_php))
        // если пользователь найден в БД
        if (res_from_login_php != '0') {
          // и если галочка запомнить стоит - создаем запись в ЛС hash, ip, 
          if (getters.getIsRememberMe) {
            let hash = res_from_login_php[0]
            let ip = res_from_login_php[1]
            console.log(hash, ip)
            commit('createLS', [hash, ip])
          } else {
            commit('delLS')
          }
          commit('login')
          commit('loginError', '')
          // commit('userId', JSON.parse(res_from_login_php)[0]) // !!!!!!! дать id
        } else {
          // console.log(JSON.parse(res_from_login_php))
          commit('loginError', 'Неверный логин или пароль')
        }
      } catch (e) {
        console.log('err')
      }
    },
  },
  modules: {},
}

function inpRegisterFormLayout() {
  return {
    email: {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: '',
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      valid: false,
      activated: false,
    },
    nickname: {
      label: 'Никнейм',
      name: 'nickname',
      type: 'text',
      value: '',
      pattern: /^[\w\d]{3,30}$/iu,
      valid: false,
      activated: false,
    },
    password: {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      pattern: /^[\w]{3,30}$/iu,
      valid: false,
      activated: false,
    },
    password2: {
      label: 'Повторите пароль',
      name: 'password2',
      type: 'password',
      value: '',
      pattern: /^[\w]{3,30}$/iu,
      valid: false,
      activated: false,
    },
  }
}

function inpLoginFormLayout() {
  return {
    email: {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: '',
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      valid: false,
      activated: false,
    },
    password: {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      value: '',
      pattern: /^[\w]{3,30}$/iu,
      valid: false,
      activated: false,
    },
  }
}

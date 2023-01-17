export default {
  namespaced: true,
  state: {
    // Пользователь залогинен
    isUserLoggedIn: false,
    // пользователь зарегистрирован
    isUserRegistered: false,
    // сообщение - результат регистрации
    registerResultMessage: '',
    //стоит ли галочка "Запомнить меня"
    isRememberMe: false,
    //сообщение для ошибки входа
    loginError: '',
    // шаблон инпутов
    inpForRegisterForm: inpRegisterFormLayout(),
    inpForLoginForm: inpLoginFormLayout(),
    // объект user с личными данными (после успешного логина)
    user: null,
  },
  getters: {
    getInpForRegisterForm(state) {
      return state.inpForRegisterForm
    },
    getInpForLoginForm(state) {
      return state.inpForLoginForm
    },
    getIsRememberMe(state) {
      return state.isRememberMe
    },
    getIsUserLoggedIn(state) {
      return state.isUserLoggedIn
    },
    getLoginError(state) {
      return state.loginError
    },
    getRegisterResult(state){
      return state.registerResultMessage
    },
    getUserData(state){
      return function(value){
        console.log(state.user[value])
        return state.user[value]
      }
      
    }
  },
  mutations: {
    updInputValue(state, arr) {
      const [inpObj, key, inpFor] = arr
      state[inpFor][key].activated = true
      state[inpFor][key].valid = inpObj.valid
    },
    isRememberMeToggle(state, value) {
      state.isRememberMe = value
    },
    createLS(state, [hash, ip]) {
      console.log(hash, ip)
      localStorage.setItem('hash', hash)
      localStorage.setItem('ip', ip)
    },
    delLS(state) {
      localStorage.removeItem('hash')
      localStorage.removeItem('ip')
    },
    login(state, value) {
      state.isUserLoggedIn = value
      state.inpForLoginForm = inpLoginFormLayout()
    },
    loginError(state, value) {
      state.loginError = value
    },
    // setUserData(state, [email, nickname]){
    setUserData(state, obj) {
      state.user = obj
    },
    register(state, value){
      state.isUserRegistered = value
      state.inpForRegisterForm = inpRegisterFormLayout()
    },
    registerResult(state, value){
      state.registerResultMessage = value
    }
  },
  actions: {
    updInputValue({ commit }, arr) {
      commit('updInputValue', arr)
    },
    isRememberMeToggle({ commit }, value) {
      commit('isRememberMeToggle', value)
    },
    async login({ commit, getters }) {
      const { email, password } = getters.getInpForLoginForm
      try {
        let response = await fetch(
          `${process.env.VUE_APP_URL_TO_HANDLER}login.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
            body: JSON.stringify([
              email.value,
              password.value,
              getters.getIsRememberMe,
            ]),
          },
        )
        let res_from_login_php = await response.json()
        // если пользователь найден в БД
        if (res_from_login_php != '0') {
          // и если галочка запомнить стоит - создаем запись в ЛС hash, ip,
          if (getters.getIsRememberMe === true) {
            let { hash, ip } = res_from_login_php
            // запишем в ЛС hash ip чтобы сделать проверку в autologin.php
            commit('createLS', [hash, ip])
          } else {
            // если галочка не стоит уберем записи из ЛС
            commit('delLS')
          }
          // после всего выполним login и очистим ошибки входа
          commit('login', true)
          commit('loginError', '')
          // заполним объект user для данных личного кабинета из полученного объекта
          commit('setUserData', res_from_login_php)
        } else {
          commit('login', false)
          commit('loginError', 'Неверный логин или пароль')
          commit('delLS')
          commit('setUserData', null)
        }
      } catch (e) {
        console.log('err')
      }
    },
    async autologin({ commit }, [hash, ip]) {
      try {
        let response = await fetch(
          `${process.env.VUE_APP_URL_TO_HANDLER}autologin.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
            body: JSON.stringify([hash, ip]),
          },
        )
        let res_autologin = await response.json()
        console.log(res_autologin)
        if (res_autologin != '0') {
          commit('login', true)
          commit('loginError', '')
          // заполним объект user для данных личного кабинета из полученного объекта
          commit('setUserData', res_autologin)
        } else {
          commit('login', false)
          commit('loginError', 'Войдите заново')
          commit('delLS')
        }
      } catch (error) {
        console.log('err autologin')
      }
    },
    async register({ commit }, [email, nickname, password]) {
      try {
        let response = await fetch(
          `${process.env.VUE_APP_URL_TO_HANDLER}register.php`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
            body: JSON.stringify([email, nickname, password]),
          },
        )
        // let res_register = await response.json()
        let res_register = await response.text()
        console.log(res_register)
        if(res_register === '1'){
          commit('register', true)
          commit('registerResult', 'Вы зарегистрированы')
        }
        else{
          commit('register', false)
          commit('registerResult', 'Такой пользователь уже существует')
        }

      } catch (error) {
        console.log('Register error')
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

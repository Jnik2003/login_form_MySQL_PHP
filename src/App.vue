<template>
  <header>
    <div class="container">
      <div class="header-container">
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
        <div class="user-login-box">
          <div class="user-info" v-if="userLogged">
            <!-- <p v-show="$store.getters['login/getUserData']">Привет {{ getUserData('nickname') }}</p> -->
            <router-link :to="{name: 'account'}" v-show="$store.getters['login/getUserData']" class="account-link">Привет {{ getUserData('nickname') }}</router-link>
          </div>
          <div class="user-info" v-else>
            <p>Привет, Гость</p>
          </div>
          <button class="small-btn" @click="openModal" v-if="!userLogged">Войти</button>
          <button class="small-btn" v-else @click="exitFromProfile">Выйти</button>
        </div>
      </div>

    </div>

  </header>


  <main>
    <div class="container">
      <!-- Модальное окно  -->
      <!-- анимация элемента с v-show + стили -->
      <transition name="fade">
        <ModalComp v-model:show="isModalOpen">
          <MainFormsComp />
        </ModalComp>
      </transition>
      <!-- ----  -->

      <!-- Анимация перехода между страницами (один в один + стили route, т.е. router-view в эту конструкцию)-->
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
      <!--  -->
    </div>
  </main>
  <footer></footer>

</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
    }
  },
  computed: {
    // вынесено в миксин getUserData.js (использовать с параметром!!!)
    // getUserData(){
    //   return this.$store.getters['login/getUserData']
    // },
  },
  methods: {
    openModal() {
      console.log('open')
      this.isModalOpen = true
    },
    exitFromProfile() {
      this.$store.dispatch('login/logout')
    }
  },

  created() {
    if (localStorage.getItem("hash") && localStorage.getItem("ip")) {
      console.log(localStorage.getItem("hash"));
      console.log(localStorage.getItem("ip"));
      this.$store.dispatch("login/autologin", [
        localStorage.getItem("hash"),
        localStorage.getItem("ip"),
      ]);
    } else {
      console.log("no");
    }
  },
}


</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
}
.user-login-box{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap:20px;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.account-link{
  font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
}

// Для аниации перехода между страницами
.route-enter-from,
.route-leave-to {
  opacity: 0;
  // transform: translateY(100px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-out;
}

// для анимации элемента с v-show
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// ---
</style>

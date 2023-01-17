<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="user-info" v-if="$store.getters['login/getIsUserLoggedIn']" >
      <p v-show="$store.getters['login/getUserData']">Привет {{getUserData('nickname')}}</p>
    </div>
    <div class="user-info" v-else>
      <p>Привет, Гость</p>
    </div>
  </header>
  <main>
    <!-- Анимация перехода между страницами (один в один + стили route, т.е. router-view в эту конструкцию)-->
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
    <!--  -->
  </main>
  <footer></footer>

</template>

<script>
export default {
  computed:{
    getUserData(){
      return this.$store.getters['login/getUserData']
    },
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
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

// ---
</style>

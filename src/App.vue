<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
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
export default{

  async created(){
    console.log('created')
    try {
      let response = await fetch(`${process.env.VUE_APP_URL_TO_HANDLER}autologin.php`)
      let res_autologin = await response.text()
      console.log(res_autologin)
    } catch (error) {
      console.log('err autologin')
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

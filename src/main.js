import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from "@/components"
import '@/assets/styles/global.css'

// импортируем чтобы сделать глобальный миксин
import loginmixins from './mixins/loginmixins'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faCircleCheck, faCircleXmark, faCircleQuestion, faEye, faEyeSlash, faPen, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleCheck, faCircleXmark, faCircleQuestion, faEye, faEyeSlash, faPen, faFloppyDisk)

const app = createApp(App)

components.forEach(item => {
    app.component(item.name, item)
})

loginmixins.forEach(item => {
    app.mixin(item)
})

app.use(store).use(router).component('fa', FontAwesomeIcon).mount('#app')

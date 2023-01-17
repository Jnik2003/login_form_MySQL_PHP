<template>
    <form class="app-form" @submit.prevent>
        <div class="app-form__inputs" v-for="inp, ind in getInps" :key="inp">
            <!-- stateInputObjName для того чтобы передать имя объекта шаблона инпутов (которые в state) в SingleInput.vue а оттуда вернуть в state мутацию, которая изменит данные нужного объекта - inpForRegisterForm или inpForLoginForm -->
            <SingleInput :inp="inp" :ind="ind" :stateInputObjName="stateInputObjName" />
        </div>
        <div class="errors">
            <p v-show="getLoginResult">{{ getLoginResult }}</p>
        </div>
        <div class="app-form__agree">
            <label class="app-form__agree--label">
                <input type="checkbox" v-model="isRememberMe" @change="isRememberMeToState">
                <div class="app-form__agree--text">
                    Запомнить меня
                </div>

            </label>
        </div>
        <div>
            <button class="btn app-form__btn" :disabled="!enableBtn" @click="login">Вход</button>
        </div>
    </form>
</template>

<script>
import enableBtn from '@/mixins/loginmixins/enableBtn';
export default {
    name: "LoginForm",
    mixins: [enableBtn],
    data() {
        return {
            stateInputObjName: 'inpForLoginForm',
            isRememberMe: false,

        }
    },
    computed: {
        getInps() {
            return this.$store.getters['login/getInpForLoginForm']
        },
        getLoginResult() {
            return this.$store.getters['login/getLoginError']
        }
        // проверим, все ли поля валидны и разблокируем кнопку !!! вынесено в миксин
        // enableBtn      
    },
    methods: {
        isRememberMeToState() {
            this.$store.dispatch('login/isRememberMeToggle', this.isRememberMe)
        },
        login() {
            this.$store.dispatch('login/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.app-form {
    // from global.css
}


</style>
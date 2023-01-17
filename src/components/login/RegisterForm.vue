<template>
    <form class="app-form" @submit.prevent>
        <div class="app-form__inputs" v-for="inp, ind in getInps" :key="inp">
            <!-- stateInputObjName для того чтобы передать имя объекта шаблона инпутов (которые в state) в SingleInput.vue а оттуда вернуть в state мутацию, которая изменит данные нужного объекта - inpForRegisterForm или inpForLoginForm -->
            <SingleInput :inp="inp" :ind="ind" :stateInputObjName="stateInputObjName"/>
        </div>
        <div class="errors">
            <p v-show="getRegisterResult">{{ getRegisterResult }}</p>
        </div>
        <div class="app-form__agree">
            <label class="app-form__agree--label">
                <input type="checkbox" v-model="isAgree">
                <div class="app-form__agree--text">
                    Согласен с условиями пользовательского соглашения
                </div>

            </label>
        </div>
        <div>
            <button class="btn app-form__btn" :disabled="(enableBtn === false || isAgree === false)" @click="register">Регистрация</button>
        </div>
        
    </form>
</template>

<script>
import enableBtn from '@/mixins/loginmixins/enableBtn';
export default {
    name: "RegisterForm",
    mixins:[enableBtn],
    data(){
        return{
            stateInputObjName: 'inpForRegisterForm',
            isAgree: false,
        }
        
    },
    computed: {
        // получим инпуты для вывода формы
        getInps() {
            return this.$store.getters['login/getInpForRegisterForm']
        },
        // проверим, все ли поля валидны и разблокируем кнопку !!! вынесено в миксин
        // enableBtn 
        getRegisterResult() {
            return this.$store.getters['login/getRegisterResult']
        }       
    },
    methods:{
        register(){
            // console.log(this.getInps)
            const {email, nickname, password} = this.getInps
            // console.log(email.value)
            this.$store.dispatch('login/register', [email.value, nickname.value, password.value])
        }
    }
}
</script>

<style lang="scss" scoped>
.app-form {
    // from global.css
}
</style>
<template>
    <div class="main-forms">
        <div class="btns">
            <button v-for="tab in tabs" :key="tab.name" class="tab-button" :class="{ active: currentTab === tab.name }"
                @click="currentTab = tab.name"
                :disabled="disableRegisterForm(tab.name)"
                >
                {{ tab.label.toUpperCase() }}
            </button>

        </div>

        <component :is="currentTab"/>
    </div>
</template>

<script>
export default {
    name: "MainFormsComp",
    data() {
        return {
            currentTab: "LoginForm",
            tabs: [
                { label: 'Логин', name: 'LoginForm' },
                { label: 'Регистрация', name: 'RegisterForm' },
            ],
        }
    },
    computed: {
        // здесь - логика отключения вкладки Регистрация
        //  isUserLogin проверяет залогинился ли пользователь и если true, то выполняется computed disableRegisterForm  в который передается имя вкладки(кнопки), которую надо отключить в теге кнопки :disabled="disableRegisterForm(tab.name)"
        isUserLogin() {
            return this.$store.getters['login/getIsUserLoggedIn']
        },
        disableRegisterForm(){
            return function(tab_name){
               return  tab_name === 'RegisterForm' ?  this.isUserLogin : false
            }
            
        }
    },

}
</script>

<style lang="scss" scoped>
.main-forms{
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    border: 1px solid grey;
    padding: 20px;
}
.btns{
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items:baseline;
}
.tab-button {
    width: 50%;
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
}

.tab-button:hover {
    background: #e0e0e0;
}

.tab-button.active {
    background-color: burlywood;
}
</style>
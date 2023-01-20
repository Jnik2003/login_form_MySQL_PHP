<template>
    <div class="single-input">
        <div class="single-input__field">
            <label class="single-input__label" :for="inp.name"> {{ inp.label }}</label>
            <div class="single-input__inp-box">
                <input class="single-input__input" :type="inp.type" @input="updValue" :value="inp.value"
                    :name="inp.name" ref="inp">
                <button class="single-input__btn-eye" v-if="inp.name === 'password' || inp.name === 'password2'"
                    @click="toggleInpType(inp)">
                    <fa icon="fa-solid fa-eye" v-if="isEyeVisible" />
                    <fa icon="fa-solid fa-eye-slash" v-else />
                </button>
            </div>


        </div>
        
        <div class="single-input__svg">
            <IconsComp :inp="inp" :ind="ind" />
        </div>
    </div>

</template>

<script>
export default {
    name: "SingleInput",
    data() {
        return {
            isEyeVisible: false,
        }
    },
    props: {
        inp: {
            type: Object
        },
        ind: {
            type: String
        },
        stateInputObjName: {
            type: String,
        }
    },
    methods: {
        updValue(e) {
            // !!! Важно! Чтобы input в мобильном браузере срабатывал как и в десктопном, т.е. чтобы v-model менялся сразу после ввода (в мобильном это происходит только если введешь пробел, enter, или уйдет фокус)
            // https://github.com/vuejs/vue/pull/9814
            // <input v-model="myModel" @input="$event.target.composing = false">
            // console.log(this.$options.name)
            e.target.composing = false // !!!!!!   
            this.inp.value = e.target.value.trim()
            // проверка на совпадение повторно вводимого пароля и на валидность для остальных полей
            if (this.ind === 'password2') {
                let password1 = this.$store.state.login[this.stateInputObjName].password.value
                if (password1 === this.inp.value && this.inp.pattern.test(this.inp.value)) {
                    this.inp.valid = true;
                }
                else{
                    this.inp.valid = false;
                }
            }
            else{
                this.inp.valid = this.inp.pattern.test(this.inp.value);
            }
            
            // stateInputObjName - имя объекта инпутов, в который вносим изменения
            this.$store.dispatch('login/updInputValue', [this.inp, this.ind, this.stateInputObjName])
        },
        toggleInpType(inp) {
            this.isEyeVisible = !this.isEyeVisible
            this.isEyeVisible ? this.$refs.inp.type = 'text' : this.$refs.inp.type = 'password'

        }
    },

}
</script>

<style lang="scss" scoped>
.single-input {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.single-input__svg {
    display: flex;
    width: 5%;
    justify-content: center;
    align-items: center;
}

.single-input__field {
    display: flex;
    width: 95%;
    gap: 10px;
}

.single-input__label {
    width: 35%;
    text-align: left;
}

.single-input__input {
    width: 100%;
    border: none;
    outline: none;
}

.single-input__inp-box {
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
    border: 1px solid grey;
}

.single-input__btn-eye {
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0 5px;
}
</style>
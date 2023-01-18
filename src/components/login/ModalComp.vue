<template>
    <!-- для закрытия окна после нажатия на кнопку "Войти" добавлена директива  v-show="!userLogged" из миксина userLogged т.е. если залогинился то тоже закрыть окно-->
    <div class="modal" @click.stop="hideModal" v-show="show === true && !userLogged">
        <div class="modal-body" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalComp',
        props:{
            show:{
                type: Boolean,
                default: false,
            }
        },
        methods:{
            hideModal(){
                this.$emit('update:show', false)// false - обязательно
            }
        }
    }
</script>

<style lang="scss" scoped>
.modal{
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-body{
    max-width: 400px;
    width: 100%;
    background-color: white;
    padding: 20px;
}
</style>
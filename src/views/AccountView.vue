<template>
    <div class="section">
        <h2>Мой профиль</h2>
        <div class="user-info" v-for="data, ind in getAllUserData" :key="ind">
            {{ data }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountView',

    computed:{
        getAllUserData(){
            return this.$store.getters['login/getAllUserData']
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
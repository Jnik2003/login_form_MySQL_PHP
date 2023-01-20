<template>
    <div class="section">
        <h2>Мой профиль</h2>
       
        <div class="user" v-for="data, ind in getAllUserData" :key="ind">
            <SingleAccount :data="data" :ind="ind" :id="userId"/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AccountView',
    
    computed: {
        getAllUserData() {
            return this.$store.getters['login/getAllUserData']
        },
        userId(){
            return this.$store.getters['login/getAllUserData'].id
        },        
    },    
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
}


</style>
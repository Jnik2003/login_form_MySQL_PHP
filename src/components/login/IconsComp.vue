<template>
    <div>
        <fa class="icon icon-orange" icon="fa-solid fa-circle-question" v-if="!inp.activated && !inp.valid" />
        <fa class="icon icon-red" icon="fa-solid fa-circle-xmark" v-else-if="!inp.valid && inp.activated" />
        <fa class="icon icon-green" icon="fa-solid fa-circle-check" v-else="inp.valid && inp.activated" />
       
    </div>
</template>

<script>
export default {
    name: "IconsComp",
    props:{
        inp:{
            type: Object
        },        
    },
    
}
</script>

<style lang="scss" scoped>

</style>
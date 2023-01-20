<template>
    <div>
        <div class="user-info" v-show="names(ind) != 'false'" >
            <div class="user-info__title">{{ names(ind)[0] }}:</div>
            <input class="user-info__value" :value="data" ref="account-inp" disabled />
            <button class="btn-icon" v-show="data != 'Admin'" @click="edit(ind)">
                <fa icon="fa-solid fa-pen" class="icon-edit" v-if="!toggleIconBtn" />
                <fa icon="fa-solid fa-floppy-disk" class="icon-edit" v-else />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SingleAccount',
    data() {
        return {
            toggleIconBtn: false,
        }

    },
    props: {
        data: {
            type: String,
            
        },
        ind: {
            type: String,
        },       
        id: {
            type: String,
        }
    },
    methods: {
        edit(ind) {
            // флаг для смены иконки и присвоения атрибута disabled
            this.toggleIconBtn = !this.toggleIconBtn
            // делаем соответствующий инпут enabled

            if (this.toggleIconBtn) {
                this.$refs['account-inp'].removeAttribute('disabled', '')
            }
            else {
                this.$refs['account-inp'].setAttribute('disabled', '')

                // [id, свойство, новое значение]
                // 
                // this.$store.dispatch("login/updateuser", [
                //     this.id,
                //     ind,
                //     this.$refs['account-inp'].value.trim()
                // ]);
            }

        },
    },
    computed: {
        names() {
            // чтобы вывести нужные свойства, а ненужные игнорировать(перечислены нужные)
            return function (ind) {
                return [
                    ind == 'nickname' ? 'Имя' :
                    ind == 'role' ? 'Роль' :
                    ind == 'email' ? 'Email' :
                    false
                ]
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.user-info {
    width: 300px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    .user-info__title{
        width: 15%;
        text-align: left;
    }
    .user-info__value{
        width: 50%;
    }
}
.icon-edit{
    color: darkorange;
}
</style>
<template>

    <div class="block lg:flex justify-center mt-2 md:mt-0 lg:mt-4 min-h-screen xl:px-12 2xl:px-16 w-full">

        <div class="block w-auto lg:pr-8 lg:w-1/4">
            <div class="box w-full h-auto mb-2 md:mb-4 flex lg:flex-col flex-none py-2 p-5 md:mt-4 justify-center lg:mt-48 md:space-x-8 lg:space-x-0">
                <router-link class="py-2 px-6" :to="{name: 'user.settings'}">Profile</router-link>
                <router-link class="py-2 px-6" :to="{name: 'user.settings.account'}">Account</router-link>
                <!-- <router-link class="py-2 px-6" >Notifications</router-link> -->
            </div>
        </div>

        <div class="w-auto md:w-full lg:w-3/5 xl:w-2/3 2xl:w-1/2">
            <router-view></router-view>
        </div>

        <div class="hidden xl:block xl:w-1/12 2xl:w-1/4"></div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
    computed: {
        ...mapGetters({
            isAuthenticated: 'isAuthenticated',
            user: 'user',
        })
    },
})
</script>




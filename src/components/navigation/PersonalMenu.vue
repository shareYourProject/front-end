<template>
  <div class="h-full relative" v-click-outside="onClickOutside">
    <!-- Displayed in narvbar -->
    <div class="flex items-center h-full cursor-pointer" @click="show_menu = !show_menu">
      <!-- User picture -->
      <img class="w-8 h-8 rounded-full" :src="user.profile_picture" alt="profile_picture">
      
      <span class="feather feather-chevron-down w-4 h-4 ml-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
      </span>
      
    </div>

    <!-- Menu -->
    <div v-show="show_menu" class="w-40 bg-cultured-100 rounded-md absolute top-10 border right-0 shadow-lg">
      <div class="flex items-start my-2 ml-2">
        <img class="w-12 h-12 rounded-full" :src="user.profile_picture" alt="profile_picture">
        <div class="flex flex-col justify-start ml-2">
          <span class="text-sm font-medium">{{user.first_name}} {{user.last_name}}</span>
          <span class="text-sm">{{user.title}}</span>
        </div>
      </div>
      <hr>
      <div class="flex">
        <ul>
          <li class="mx-3 my-2">
            <h4 class="font-medium">Account</h4>
            <ul class="text-sm font-light">
              <li class="flex items-center my-1">
                <router-link :to="{name:'profile', params:{id:user.id}}">My profile</router-link>
              </li>
              <li class="flex items-center my-1">
                <router-link :to="{name:'user.settings', params:{id:user.id}}">Settings</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <hr>
      <form @click="logout" class="flex mx-3 my-2 items-center cursor-pointer">
        <svg class="feather feather-log-out w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        <span class="ml-2 hover:underline">Logout</span>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { API } from '@/api'
import vClickOutside from '@/click-outside'
import {mapGetters} from 'vuex'
import {defineComponent} from "vue";

export default defineComponent({
  directives: {
    clickOutside: vClickOutside
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data() {
    return {
      show_menu: false
    }
  },
  methods: {
    onClickOutside: function() {
      this.show_menu = false;
    },
    logout: function() {
      API.logout().then(response => {
        this.$router.push({name:"feed"});
      });
    }
  }
})
</script>
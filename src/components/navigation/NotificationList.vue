<template>
  <div class="wrapper" v-click-outside="onClickOutside">
    <!-- Icon -->
    <div class="relative" @click="displayNotification = true">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-bell" id="notif-icon" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round"><path
                    d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </span>
    </div>

    <!-- Notification list -->
    <div class="notification-list" v-show="displayNotification">
      <NotificationCard v-for="notification in notifications" :notification="notification"
                        :key="'notify_'+notification.id"></NotificationCard>
<!--      <div v-if="!notifications">No notifications</div>-->
    </div>
  </div>
</template>

<script lang="ts">
import NotificationCard from '../cards/NotificationCard.vue';
import vClickOutside from '../../click-outside'
import {defineComponent} from "vue";
import {Echo} from "@/main";
import {mapGetters} from "vuex";
import {API} from '@/api';
import {Notification} from '@/models';

export default defineComponent({
  components: {
    NotificationCard
  },
  directives: {
    clickOutside: vClickOutside
  },
  methods: {
    onClickOutside() {
      // this.displayNotification = false;
    }
  },
  data() {
    return {
      notifications: new Array<Notification>(),
      displayNotification: false
    }
  },
  computed: {
    ...mapGetters({
      authUser: 'user',
      isAuthenticated: 'isAuthenticated'
    })
  },
  mounted() {
    if (!this.isAuthenticated) return;

    API.Notification.get().then(response => {
      switch (response.status) {
        case 200:
          this.notifications.push(...response.data.data);
          break;
        default:
          break;
      }
    });

    Echo.private(`App.User.${this.authUser?.id}`).notification((notification: Notification) => {
      console.log(notification)
      this.notifications.unshift(notification);
    });
  }
});
</script>

<style scoped>
.wrapper {
  @apply relative;
}

#notif-icon:hover {
  @apply cursor-pointer;
  fill: black;
}

#notif-number {
  @apply bg-red-500 text-white font-medium rounded-full;
  @apply absolute right-0 top-0;
  @apply w-2 h-2;
}

.notification-list {
  @apply absolute top-10 right-0;
  @apply p-2 bg-white divide-y;
  @apply shadow-md rounded-md border;
}
</style>
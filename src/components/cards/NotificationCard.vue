<template>
  <div class="wrapper">
    <a :href="url" class="a-none flex items-center space-x-2">
      <img :src="notification.image" class="w-12 h-12 rounded-full" alt="picture_event">
      <h2><span v-html="notification.text"></span> <span class="text-xs">{{ time }}</span></h2>
    </a>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import {defineComponent, PropType} from "vue";
import {Notification, NotificationType} from "@/models";
import {RouteLocationRaw} from "vue-router";

export default defineComponent({
  props: {
    notification: {
      type: Object as PropType<Notification>,
      required: true
    }
  },
  computed: {
    time(): string {
      return moment(this.notification.created_at).fromNow();
    },
    url(): RouteLocationRaw {

      switch (this.notification.type) {
        case NotificationType.CreatedPost:
          return {name: 'post', params: {id: this.notification.data.post_id}}
        default:
          return {};
      }
    }
  },
});
</script>

<style scoped>
.wrapper {
  @apply w-96 p-2;
  @apply hover:bg-gray-200 rounded-sm cursor-pointer;
}
</style>
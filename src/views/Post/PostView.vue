<template>

  <div class="w-full md:w-2/3 lg:w-2/3 xl:w-2/5 mx-auto">

    <PostCard class="mt-6 shadow-md" v-if="post" :post="post"></PostCard>

  </div>

</template>
<script lang="ts">
import {defineComponent} from 'vue'
import PostCard from '@/components/cards/PostCard.vue'
import {API} from '@/api'
import {Post} from '@/models'

export default defineComponent({
  components: {
    PostCard
  },
  data() {
    return {
      post: undefined as unknown as Post
    }
  },
  beforeRouteEnter(to, from, next) {
    API.Post.get(Number(to.params['id'])).then(response => {
      switch (response.status) {
        case 200:
          next(vm => (vm as any).setData(response.data))
          break;

        default:
          next(false)
          break;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    API.Post.get(Number(to.params['id'])).then(response => {
      switch (response.status) {
        case 200:
          this.post = response.data;
          next();
          break;

        default:
          next(false)
          break;
      }
    });
  },
  methods: {
    setData(post: Post) {
      this.post = post;
    }
  }
})
</script>


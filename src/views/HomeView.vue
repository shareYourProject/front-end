<template>

    <div class="w-full md:w-2/3 lg:w-2/3 xl:w-2/5 mx-auto">
        <div
        v-if="isAuthenticated"
        class="text-2xl font-semibold text-gray-800 mt-5 pl-5 md:pl-0">
            Bonjour {{user.first_name}} {{user.last_name}} !
        </div>

        <PostCreator v-if="isAuthenticated" :extraContent="true" class="mt-6"></PostCreator>

        <PostCard class="my-6 shadow-md" v-for="post in posts" :key="'post_' + post.id" :post="post"></PostCard>

        <div class="w-full flex justify-center">
          <div ref="loader"></div>
        </div>
    </div>

</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapGetters} from 'vuex'
import PostCard from '@/components/cards/PostCard.vue'
import PostCreator from "@/components/cards/PostCreator.vue";
import lottie, {AnimationItem} from 'lottie-web';

export default defineComponent({
    components: {
        PostCard,
        PostCreator
    },
    computed: {
        ...mapGetters({
            isAuthenticated: 'isAuthenticated',
            user: 'user',
            posts: 'feedPosts',
            currentFeedPage: 'currentFeedPage',
            lastFeedPage: 'lastFeedPage'
        })
    },
    data() {
      return {
        animation: undefined as unknown as AnimationItem
      }
    },
    methods: {
        ...mapActions({
            getNewPosts: 'getNewPosts'
        }),
        scroll() {
          window.onscroll = () => {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

            if (bottomOfWindow && this.currentFeedPage < this.lastFeedPage) {
              this.animation.play()
              this.getNewPosts();
              setTimeout(() => this.animation.stop(), 1000);
            }
          }
        }
    },
    mounted() {
        this.getNewPosts();
        this.animation = lottie.loadAnimation({
          container: this.$refs['loader'] as Element,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          path: '/lottie/loading.json'
        });
        this.scroll();
    }
})
</script>


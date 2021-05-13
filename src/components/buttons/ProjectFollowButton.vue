<template>
  <div class="btn-follow btn-viridiant text-sm max-w-8 max-h-2" @click="toggle()"
       :class="{'cursor-pointer':state !== 1, 'cursor-not-allowed': state === 1, 'followed': state === 2}">
    {{ text }}

    <!-- Icon -->
    <div ref="followIcon" class="h-7 w-7"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Project} from "@/models";
import {mapGetters} from 'vuex'
import lottie, {AnimationItem} from "lottie-web";
import {API} from '@/api';

enum State {
  ENABLED,
  DISABLED,
  FOLLOWED,
  UNFOLLOWED
}

export default defineComponent({
  name: "ProjectFollowButton.vue",
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  },
  data() {
    return {
      state: State.DISABLED,
      text: "Unavailable",
      animation: undefined as unknown as AnimationItem,
    }
  },
  mounted(): void {
    this.animation = lottie.loadAnimation({
      container: this.$refs['followIcon'] as Element,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/lottie/plusToX.json'
    });

    if (this.isAuthenticated) {
      this.state = State.ENABLED;
      this.init();
    }
  },
  methods: {
    /**
     * Follow the user.
     */
    follow(): void {
      API.Project.follow(this.project).then(response => {
        switch (response.status) {
          case 200:

            this.state = State.FOLLOWED;
            this.text = "Unfollow";
            this.animation.setDirection(1);
            this.animation.play();
            break;
          default:
            break;
        }
      })
    },
    /**
     * Unfollow the user.
     */
    unfollow(): void {
      API.Project.unfollow(this.project).then(response => {
        switch (response.status) {
          case 200:

            this.state = State.UNFOLLOWED;
            this.text = "Follow";
            this.animation.setDirection(-1);
            this.animation.play();
            break;
          default:
            break;
        }
      })
    },
    /**
     * Toggle the state.
     */
    toggle(): void {
      if (this.state === State.FOLLOWED) this.unfollow();
      else if (this.state === State.UNFOLLOWED) this.follow();
    },
    /**
     * Init the state of the button
     */
    init(): void {
      if (this.authenticatedUser?.followed_projects.includes(this.project.id)) {
        this.animation.goToAndStop(29, true);
        this.state = State.FOLLOWED;
        this.text = "Unfollow";
      } else {
        this.state = State.UNFOLLOWED;
        this.text = "Follow";
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'user',
      isAuthenticated: 'isAuthenticated'
    })
  }
});
</script>

<style scoped>
.followed {
  @apply bg-onyx-200;
}

.btn-follow {
  @apply whitespace-nowrap inline-flex items-center justify-center pl-2 pr-1 border border-transparent leading-6 font-medium rounded-md transition-all ease-in-out duration-150;
}
</style>
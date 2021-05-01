<template>

<div class="block lg:flex justify-center mt-2 md:mt-0 lg:mt-4 min-h-screen xl:px-12 2xl:px-16 w-full" v-if="user">

    <div class="block w-auto lg:pr-8 lg:w-1/4">

        <div class="box w-full h-auto mb-2 md:mb-4 flex lg:flex-col flex-none py-2 p-5 md:mt-4 justify-center items-center space-x-4 lg:mt-48 md:space-x-8 lg:space-x-0">
            <div class="hidden md:block font-semibold lg:mb-1 text-xl pr-4">Links</div>
            <div class="flex justify-between py-2"><span class="text-linkedin pr-4">LinkedIn</span><a href="https://www.linkedin.com/in/killian-mah%C3%A9-246928135/">killian-mahe</a></div>
            <div class="flex justify-between py-2"><span class="text-github pr-4">GitHub</span><a href="https://github.com/killian-mahe">@killian-mahe</a></div>
        </div>

    </div>

    <div class="w-auto md:w-full lg:w-3/5 xl:w-2/3 2xl:w-1/2">

        <div class="box w-full h-auto mb-3 pb-4">
            <div class="flex relative justify-center">
            <img class="md:rounded-t-md object-cover w-full h-48" :src="user.banner_picture" alt="test">
            <img class=" border-4 border-cultured-100 shadow-md object-cover w-40 h-40 rounded-full mx-auto sm:left-8 lg:left-16 -bottom-12 absolute" :src="user.profile_picture" alt="test">
            </div>
            <div class="text-center md:text-right font-semibold font-sans text-2xl md:mr-1/7 mt-12 md:my-4">{{ user.first_name }} {{ user.last_name }}</div>
        </div>


        <!-- Main -->
        <div class="box p-5">

            <h2 class="category-title">Who am I ?</h2>
            <span class="font-light text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac eros vitae nisl ultrices laoreet.
                Donec id mi ut arcu iaculis rhoncus eu sollicitudin dolor. Nulla ultricies arcu sed nisi convallis tincidunt.
                Nullam a dui enim. Donec ac est eget mauris gravida maximus. Nulla eu dolor et sem porta ullamcorper.
                Phasellus nec orci vulputate, pretium mi et, fringilla metus. Cras quis placerat felis. </span>
            <span class="font-light text-xs block text-right">Member since {{ user.created_at }}</span>
        </div>

        <!-- Projects -->
        <h2 class="font-semibold text-xl my-5 ml-3">Projects</h2>
        <ProjectCard
            v-for="project in user.projects"
            :key="'project_'+project.id"
            :project="project"></ProjectCard>


    </div>
    <div class="hidden xl:block xl:w-1/12 2xl:w-1/4"></div>

</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { API } from '@/api'
import { User } from '@/models'
import ProjectCard from '@/components/cards/ProjectCard.vue'

export default defineComponent({
    components: {
        ProjectCard
    },
    data() {
        return {
            user: undefined as unknown as User
        }
    },
    beforeRouteEnter(to, from, next) {
        API.User.get(Number(to.params['id'])).then(response => {
            switch (response.status) {
                case 200:
                    next(vm => {(vm as any).user = response.data})
                    break;

                default:
                    next(false)
                    break;
            }
        });
    },
    beforeRouteUpdate(to, from, next) {
        API.User.get(Number(to.params['id'])).then(response => {
            switch (response.status) {
                case 200:
                    this.user = response.data
                    next();
                    break;

                default:
                    next(false);
                    break;
            }
        });
    },
    computed: {
        ...mapGetters({
            authUser: 'user'
        })
    },
})
</script>

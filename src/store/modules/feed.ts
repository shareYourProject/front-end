import {API} from '@/api'
import {Post} from '@/models'
import {FeedState} from './types'

// initial state
const state : FeedState = {
    currentPage: 0,
    lastPage: 1,
    posts: []
}

type State = typeof state

// getters
const getters = {
    feedPosts(state: State): Array<Post> {
        return state.posts;
    },
    currentFeedPage(state: State): number {
        return state.currentPage
    },
    lastFeedPage(state: State): number {
        return state.lastPage
    }
}

// actions
const actions = {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getNewPosts({commit, state}:any): void {
        if (state.currentPage == state.lastPage) return;

        API.Feed.get(state.currentPage+1).then(response => {
            switch (response.status) {
                case 200:
                    commit('ADD_POSTS', response.data.data);
                    commit('SET_LAST_PAGE', response.data.meta.last_page);
                    commit('SET_CURRENT_PAGE', response.data.meta.current_page);
                    break;

                default:
                    break;
            }
        })
    }
}

// mutations
const mutations = {
    ADD_POSTS(state: State, posts: Array<Post>): void {
        state.posts.push(...posts);
    },
    SET_CURRENT_PAGE(state: State, page: number): void {
        state.currentPage = page;
    },
    SET_LAST_PAGE(state: State, page: number): void {
        state.lastPage = page > 0 ? page : 0;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

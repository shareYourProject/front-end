import {API} from '../../api'
import {User} from '../../models'
import {AuthState} from './types'

// initial state
const state : AuthState = {
    authUser: undefined
}

type State = typeof state

// getters
const getters = {
    isAuthenticated(state: State): boolean{
        return !!state.authUser;
    },
    user(state: State): User | undefined {
        return state.authUser;
    }
}

// actions
const actions = {
    // eslint-disable-next-line
    me ({ commit }: any): Promise<void> {
      return API.User.user().then((response) => {
        switch (response.status) {
          case 200:
            commit('SET_USER', response.data);
            break;
        
          default:
            commit('SET_USER', null);
            break;
        }
      })
    }
}

// mutations
const mutations = {

    SET_USER (state: State, user: User): void {
        state.authUser = user;
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}

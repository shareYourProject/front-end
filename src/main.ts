import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/tailwind.scss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const app = createApp(App);

store.dispatch('me').then(() => {
    app.use(router);
    app.use(store);

    app.mount('#app');
});
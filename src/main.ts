import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/tailwind.scss'
import LaravelEcho from 'laravel-echo';
import {API, axios} from './api'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false})

require('pusher-js');


/**function getCookie(cname: string): string {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Echo = new LaravelEcho({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_MIX_PUSHER_APP_KEY,
    cluster: process.env.VUE_APP_MIX_PUSHER_APP_CLUSTER,
    forceTLS: false,
    // auth: {
    //     headers: {
    //         "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
    //     }
    // },
    disableStats: true,
    authEndpoint: "http://www.shareyourproject.project/api/broadcasting/auth",
    authorizer: (channel: any) => {
        return {
            authorize: (socketId: number, callback: (arg0: boolean, arg1: any) => void) => {
                API.csrf().then(() => {

                    axios.post(process.env.VUE_APP_API_PATH + '/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                        .then((response: any) => {
                            console.log(response)
                            callback(false, response);
                        })
                        .catch((error: any) => {
                            console.log(error)
                            callback(true, error);
                        });
                })
            }
        };
    },
});

const app = createApp(App);

store.dispatch('me').then(() => {
    app.use(router);
    app.use(store);

    app.mount('#app');
});
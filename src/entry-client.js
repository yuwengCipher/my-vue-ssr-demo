import { createApp } from './main'

const { app, router } = createApp();

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        const activated = matched.filter((current, index) =>{
            return diffed || (diffed = (prevMatched[index]) !== current)
        })
        if (!activated.length) {
            return next()
        }

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            next()
        }).catch(next)
    })
    app.$mount('#app');
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__)
    }
})



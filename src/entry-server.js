import { createApp } from "./main";

export default context => {

    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url)
        router.onReady(() => {
            const matchComponents = router.getMatchedComponents();
            if (!matchComponents.length) {
                return reject({code: 404})
            }
            Promise.all(matchComponents.map(component => {
                if (component.asyncData) {
                    return component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(reject)
        },reject)
    })
}
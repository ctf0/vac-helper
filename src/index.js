export default (item, options = {}) => () => {
    return Object.assign(
        options,
        {
            component: item,
            loading: require('./components/Loading.vue'),
            error: require('./components/Error.vue'),
            delay: 200,
            timeout: 5000
        }
    )
}

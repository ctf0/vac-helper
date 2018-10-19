<h1 align="center">
    Vue Async Helper
    <br>
    <a href="https://www.npmjs.com/package/vue-async-helper"><img src="https://img.shields.io/npm/v/vue-async-helper.svg?style=for-the-badge" alt="npm" /></a> <a href="https://www.npmjs.com/package/vue-async-helper"><img src="https://img.shields.io/npm/dt/vue-async-helper.svg?style=for-the-badge" alt="npm" /></a>
</h1>

- based on : https://vuejs.org/v2/guide/components-dynamic-async.html#Handling-Loading-State
- original post : https://forum.vuejs.org/t/global-config-for-async-components/40980

Big thanx to [@LinusBorg](https://github.com/LinusBorg).

## Installation

```bash
npm install vue-async-helper --save
```

## Usage

- assign the function to the `window` so you can use it everywhere without re-importing

    ```js
    import VAC from 'vue-async-helper'
    window.VueAsyncComponent = VAC
    ```

- now replace the `() => import(...)` call with `VueAsyncComponent(import(...))`

    ```js
    /* global */
    Vue.component('MyComp', () => import('abc.vue'))                // before
    Vue.component('MyComp', VueAsyncComponent(import('abc.vue')))   // after

    /* local */
    components: {
        MyComp: () => import('abc.vue')                // before
        MyComp: VueAsyncComponent(import('abc.vue'))   // after
    },
    ```

    |   prop  |                default                |                                       description                                       |
    |---------|---------------------------------------|-----------------------------------------------------------------------------------------|
    | loading | "Please Stand By..."                  | A component to use while the async component is loading                                 |
    | error   | "Something Went Wrong, Plz Try Again" | A component to use if the load fails                                                    |
    | delay   | 200                                   | Delay before showing the loading component **"in ms"**                                  |
    | timeout | 5000                                  | The error component will be displayed if a timeout is provided and exceeded **"in ms"** |

<br>

### Changing the helper defaults

- you can change the default options per call like
    ```js
    Vue.component('MyComp', VueAsyncComponent(import('abc.vue'), {
        timeout: 1000
    }))
    ```

- or globally
    - first create a new file
        ```js
        // vac.js
        import VAC from 'vue-async-helper'
        window.VueAsyncComponent = (item) => {
            return VAC(item, {
                loading: LoadingComp,
                error: ErrorComp,
                delay: 500,
                timeout: 2000
            })
        }
        ```

    - next require that file and follow the usage as normal
        ```js
        // app.js
        require('vac.js')

        Vue.component('MyComp', VueAsyncComponent(import('abc.vue')))
        ```

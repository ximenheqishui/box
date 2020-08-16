<template>
    <div id="app">
        {{aa}}
    </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                aa: "首页1"
            }
        },
        methods: {
        },
        mounted: function () {
            this.errorHandler()
        }
    }
</script>

<style lang="scss">
</style>

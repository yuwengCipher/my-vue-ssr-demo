<template>
  <div class="about">
    <h1>This is an {{ item }} page</h1>
  </div>
</template>
<script>
    export default {
        name: 'about',
        computed: {
            item () {
                return 'about'
            }
        }
    }
</script>

<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
      <button @click="handleClick">弹出666</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
    methods: {
      handleClick () {
          alert('666')
      }
    },
  components: {
    HelloWorld
  }
}
</script>

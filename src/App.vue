<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Web CLI | Arcphysx'
    }
  },
}
</script>
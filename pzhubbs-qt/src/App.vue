<template>
  <div id="app">
    <router-view>
    <page ></page>
    </router-view>
  </div>
</template>

<script>
import page from "./components/Page";
export default {
  name: "App",
  components: {
    page
  }
};
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>


<template>
<section class="app-main column is-10" :style="[hiddenSidebarStyle]">
    <div class="container is-fluid is-marginless app-content">
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
      name: "AppMain"
}
</script>

<style lang="scss">

</style>
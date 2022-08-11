
<template>
   <div class="toasts-wrapper" v-if="toasts.length">
    <SingleToast
      v-for="(toast, index) of toasts"
      :toast="toast"
      :key="index">
    </SingleToast>
  </div>
</template>

<script>
import SingleToast from '@/components/SingleToast.vue'

export default {
  name: 'ExtraToasts',
  components: { SingleToast },
  computed: {
    toasts() {
      // To return all toasts currently in the store
      return this.$store.state.toasts;
    }
  }
}
</script>

<style scoped>
  .toasts-wrapper {
    width: 600px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    right: 1rem;
    bottom: 2rem;
  }
</style>
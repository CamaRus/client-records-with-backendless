<template>
  <div class="preloader-wrapper big active loader" v-if="isLoading">
    <div class="spinner-layer spinner-blue">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean, // Принимаем состояние загрузки через props
  },
};
</script>

<style scoped>
.preloader-wrapper.big {
  width: 300px;
  height: 300px;
}

.loader {
  left: 35%;
}
</style>

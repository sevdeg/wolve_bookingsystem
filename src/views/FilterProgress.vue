<template>
  <nav class="filter-nav">
    <button @click="updateStep('step1')">Step 1</button>
    <button @click="updateStep('step2')">Step 2</button>
    <button @click="updateStep('step3')">Step 3</button>
  </nav>
</template>

<script>
export default {
  methods: {
    updateStep (by) {
        this.$emit('stepChange', by)
    }
  }
}
</script>

<style>

</style>
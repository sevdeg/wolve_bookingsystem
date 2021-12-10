<template>
  <!--<div class="about">
    <h1>This is an about page</h1>
  </div>-->
  <html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <header>
        </header>
          <main>
          <va-modal v-model="showModalSizeLarge" :message="message">
            <!-- <va-card color="background" style="padding: 0.75rem;"> -->
              <div class="row">
                  <slot></slot>
              </div>
            <!-- </va-card> -->
          </va-modal>
        </main>
        <footer>
        </footer>
    </body>
</html>
</template>
<script>
export default ({
  data () {
    return {
      showModalSizeLarge: true
    }
  }
})
</script>
<style scoped>
</style>

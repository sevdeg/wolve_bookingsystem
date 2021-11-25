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
          <!-- <va-button class="mr-2 mb-2" @click="showModalSizeLarge = !showModalSizeLarge">
            Show modal size large
          </va-button>
          <va-button class="mr-2 mb-2" @click="showModalSizeLargeer">
            Show modal size large
          </va-button> -->
          <va-modal v-model="showModalSizeLarge" :message="message">
            <!-- <va-card color="background" style="padding: 0.75rem;"> -->
              <div class="row">
                  <slot></slot>
                <!-- Velg behandling div -->
                <!-- <div class="flex md8"></div> -->
                <!-- <form @submit.prevent="addMessage">
                  <select v-model="role">
                    <option value="developer">web developer</option>
                    <option value="designer">web designer</option>
                  </select>
                  <button>Order</button>
                </form>
                <p>status: {{ role }}</p> -->
                <!-- <p>handler om klikk: {{ getId(Behandlingstype.navn) }}</p> -->
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
      // behandlingstyper: [],
      // role: null,
      // getNavn: null
    }
  }
})
</script>
<style scoped>
</style>

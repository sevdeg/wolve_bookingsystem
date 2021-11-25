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
          <va-button class="mr-2 mb-2" @click="showModalSizeLarge = !showModalSizeLarge">
            Show modal size large
          </va-button>
          <va-button class="mr-2 mb-2" @click="showModalSizeLargeer">
            Show modal size large
          </va-button>
          <va-modal v-model="showModalSizeLarge" :message="message">
            <!-- <va-card color="background" style="padding: 0.75rem;"> -->
              <div class="row">
                <div class="flex md4" id="leftDiv">
                  <va-card>
                    <!-- <va-card-title>Velg behandling, fortell litt type info du vil vise</va-card-title> -->
                    <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
                    <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
                    <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
                    <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
                    <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
                    <va-card-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</va-card-content>
                  </va-card>
                  <!-- <div class="item">ventre divvvvLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div> -->
                </div>
                <!-- Velg behandling div -->
                <div class="flex md8">
                  <div class="item">
                    <!-- LIST DESCRIPTION -->
                    <!-- v-for="type in behandlingstyper" :key="type.id" -->
                    <va-list>
                      <va-list-label>
                        Behandlingstype
                      </va-list-label>

                      <va-list-item
                        v-for="(Behandlingstype, index) in behandlingstyper" @click="getId(Behandlingstype.navn)" style="display:block"
                        :key="index"
                      >

                        <va-list-item-section>
                          <va-list-item-label>
                            {{ Behandlingstype.navn }}
                          </va-list-item-label>

                          <va-list-item-label caption :lines="index + 1">
                            {{ Behandlingstype.beskrivelse }}
                          </va-list-item-label>
                        </va-list-item-section>
                        <!-- mulighet for å sette inn icon senere
                          <va-list-item-section icon>
                          <va-icon
                            name="remove_red_eye"
                            color="gray"
                          />
                        </va-list-item-section> -->
                      </va-list-item>
                    </va-list>
                  </div>
                </div>
                <form @submit.prevent="addMessage">
                  <select v-model="role">
                    <option value="developer">web developer</option>
                    <option value="designer">web designer</option>
                  </select>
                  <button>Order</button>
                </form>
                <p>status: {{ role }}</p>
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
import { projectFirestore } from '../main'
export default {
  data () {
    return {
      showModalSizeLarge: false,
      behandlingstyper: [],
      role: null,
      getNavn: null
    }
  },
  // Legg til alle de i array med unshift, så bare skriv ut det i en kvittering
  // du får ut nå verdien til onclick, neste steg blir vel å gjøre display none og display block, sjekk sevde sin kode
  methods: {
    getId (typeNavn) {
      console.log('klikket på get ID')
      console.log(typeNavn)
      this.role = typeNavn
      console.log(this.role)
    },
    showModalSizeLargeer () {
      console.log('kliker på modal')
      this.fetchBehandlingstyper()
    },
    vaList () {
      console.log('clicked on va-list')
    },
    handleSubmit () {
      console.log('trykket på submit')
      console.log(this.role)
      this.addMessage()
    },
    handlerNavn () {
      console.log('klikket på en av items')
      console.log(this.getNavn)
    },
    addMessage () {
      console.log('inne i add message')
      if (this.role) {
        this.feedback = null
        projectFirestore.collection('ordre').add({
          role: this.role
          // to: this.$route.params.id,
          // from: this.authUser.email,
          // description: this.message,
          // createdAt: new Date(),
        }).then(() => {
          this.role = null
        })
      } else {
        console.log('feil')
      }
    },
    fetchBehandlingstyper () {
      console.log('inne i behandlingstyper')
      projectFirestore.collection('behandlingstyper').get().then(behandlingstyper => {
        behandlingstyper.docs.forEach(doc => {
          console.log('data')
          console.log(doc.data().id)
          const type = doc.data()
          console.log(type)
          type.id = doc.id //  Iden over mot autogenerert id
          console.log('id')
          console.log(type.id)
          this.behandlingstyper.push(type)
        })
        console.log('alle behandlingstyper:', this.behandlingstyper)
      })
    }
  }
}
</script>
<style scoped>
  .item {
    border: 1px solid rgb(212, 205, 205);
    background-color: #ffffff;
    text-align: center;
  }

  .va-list-item:hover {
  background-color: lightblue;
}
  @media only screen and (max-width: 770px) {
    #leftDiv {
        display: none;
    }
    /* .flex md6 {
    } */
}

</style>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
  <!-- <div v-if="showModal">
    <Modal @close="toggleModal">
    </Modal>
  </div> -->
  <!-- <div v-if="showModal"> -->
    <!-- <va-button class="mr-2 mb-2" @click="showModalSizeLargeer">
      Show modal size large
    </va-button> -->
    <Modal>
      <behandlingsInfo v-if="displayBehandling"></behandlingsInfo>
      <klientInfo v-if="displayKlient"></klientInfo>
      <datoTidInfo v-if="displayDatoTid"></datoTidInfo>
      <userInfo v-if="userInfo"></userInfo>
      <!-- STEP 1 -->
      <div class="flex md8" v-if="step1">
        <va-list-label>
              Behandlingstype
            </va-list-label>
         <div class="item">
          <va-list-item v-for="(Behandlingstype, index) in behandlingstyper" @click="getId(Behandlingstype.navn)" :key="index">
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
        </div>
      </div>
      <!-- STEP2 -->
      <div class="flex md8" v-if="step2">
        <va-list-label>
            Velg klient
        </va-list-label>
        <div class="item">
          <va-list>
            <va-list-item
              v-for="(klient, index) in klienter" @click="getKlientNavn(klient.navn)" :key="index"
            >
              <!-- <va-list-item-section avatar>
                <va-avatar>
                  <img :src="contact.img">
                </va-avatar>
              </va-list-item-section> -->

              <va-list-item-section>
                <va-list-item-label>
                  {{ klient.navn }}
                </va-list-item-label>

                <va-list-item-label caption>
                  {{ klient.beskrivelse }}
                </va-list-item-label>
              </va-list-item-section>

              <!-- <va-list-item-section icon>
                <va-icon
                  name="remove_red_eye"
                  color="gray"
                />
              </va-list-item-section> -->
            </va-list-item>
          </va-list>
          <!-- <va-date-picker
            stateful
            v-model='date'
            :allowedDate="new Date()"
            :min-date='new Date()'
            type="day"
          /> -->
        </div>
      </div>
      <!-- STEP 3 -->
      <div class="flex md8" v-if="step3">
        <va-list-label>
            Velg dato og tid
        </va-list-label>
        <!-- <div class="item">
          <va-date-picker v-model="value3" @click="getDato(value3)" style="margin:auto"/>
        </div> -->
        <!-- <v-row justify="center">
          <v-date-picker
            v-model="date"
            :allowed-dates="allowedDates"
            class="mt-4"
            min="2016-06-15"
            max="2018-03-20"
          ></v-date-picker>
        </v-row> -->
        <!-- <v-date-picker
        v-model='date'
        :min-date='new Date()'
        /> -->
        <!-- FUNGERER -->
        <DatePicker @click="getDato(value3)" isRequired v-model="date" :available-dates='{ start: new Date(), end: null }' mode="dateTime" :timezone="timezone" />
         <div class="flex items-baseline mt-2">
          <span class="text-gray-600 font-semibold tracking-wide">Valgt tid:</span>
          <span class="text-gray-800 ml-2">{{ value3.toISOString() }}</span>
        </div>

        <!-- Kan eventuelt brukes senere -->
        <!-- <DatePicker
          v-model="customer.birthday"
          :model-config="modelConfig"
          is-required
        />
        <p>name {{ customer.name }}</p>
        <p>name {{ customer.birthday }}</p>
         <div class="flex items-baseline mt-2">
          <span class="text-gray-600 font-semibold tracking-wide">Valgt tid:</span>
          <span class="text-gray-800 ml-2">{{ date.toISOString() }}</span>
        </div> -->
        <!-- <v-date-picker
          :value="null"
          color="red"
          is-dark
          is-range
        /> -->
        <!-- <DatePicker v-model="date" /> -->
        <!-- ---------------------------------------------------------------SEVDEEEEE -->
      </div>
      <div class="flex md8" v-if="step4">
        <va-list-label>
            <button type="button" class="toggle-btn" @click="login()">Log In</button>
            <button type="button" class="toggle-btn" @click="displayRegister()">Register</button>
        </va-list-label>
        <div class="item">
          <!-- <va-button-toggle
            toggle-color="black"
            color="#7e06ae"
            v-model="model"
            :options="options"
            class="mb-4"
          /> -->
          <LoginForm v-if="loginForm"></LoginForm>
          <RegisterForm v-if="registerForm"></RegisterForm>
          <va-button v-if="diplayLoggInnBtn" @click="loggInn()"> Logg inn </va-button>
          <va-button v-if="diplayRegisterBtn" @click="register()"> Register </va-button>
          <!-- <div>
            <va-button-toggle
              outline
              v-model="model"
              :options="options"
            />

            <div class="mb-2" />

            <va-button-toggle
              flat
              v-model="model"
              :options="options"
            />

            <div class="mb-2" />

            <va-button-toggle
              :rounded="false"
              v-model="model"
              :options="options"
            />
          </div> -->
        </div>
      </div>
      <va-button v-if="displayBtn" @click="nextBtn()" style="margin:auto;"> Gå videre </va-button>
      <!-- STEP 5 -->
      <div class="flex md8" v-if="step5">
        <va-list-label>
            Ordreinfo
        </va-list-label>
        <div class="item">
          <table class="va-table">
            <thead>
            <tr>
              <th>Time info </th>
            </tr>
            </thead>
            <tr>
              <td><strong>Dato: </strong> {{ value3 }}</td>
              <td> Tid </td>
            </tr>
            <tr>
              <td><strong>Klient:</strong> {{ value2 }}</td>
              <td><strong>Behandling</strong> {{ value }}</td>
            </tr>
            <thead>
            <tr>
              <th>Kunde info</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td>Navn</td>
                <td>Telefon</td>
                <td>
                  <!-- <va-badge
                    :text="user.status"
                    :color="user.status"
                  /> -->
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <!-- <va-badge
                    :text="user.status"
                    :color="user.status"
                  /> -->
                </td>
              </tr>
              <thead>
            <tr>
              <th>Betalings info</th>
              <!-- <th>Email</th>
              <th>Country</th>
              <th>Status</th> -->
            </tr>
            </thead>
            <tr>
                <td>Totalpris</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- ---------------------------------------------------------------SEVDEEEEE -->
      </div>
      <!-- <button style="display:none">gå videre</button> -->
    <!-- <form @submit.prevent="addOrdre">
      <select v-model="value">
        <option value="developer">web developer</option>
        <option value="designer">web designer</option>
      </select>
      <button>Order</button>
    </form> -->
    <!-- VIKTIG info om kvittering -->
    <!-- <p>Step1: {{ value }}</p>
    <p>Step2: {{ value2 }}</p>
    <p>Step3: {{ value3 }}</p> -->
    </Modal>
  <!-- </div> -->
  <!-- <button @click="toggleModal">, InfoOp, Infoen Modal</button> -->
</template>
<script>
import Modal from './components/Modal.vue'
import behandlingsInfo from './components/behandlingsInfo.vue'
import klientInfo from './components/klientInfo.vue'
import datoTidInfo from './components/datoTidInfo.vue'
import userInfo from './components/userInfo.vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import { projectFirestore } from './main'
// import { Calendar } from 'v-calendar'
import { DatePicker } from 'v-calendar'

export default ({
  name: 'App',
  components: {
    Modal,
    behandlingsInfo,
    klientInfo,
    datoTidInfo,
    userInfo,
    LoginForm,
    RegisterForm,
    // Calendar
    DatePicker
  },
  data () {
    return {
      // options: [
      //   { label: 'One', value: 'one' },
      //   { label: 'Two', value: 'two' },
      //   { label: 'Three', value: 'three' }
      // ],
      // model: 'two',
      value3: new Date(),
      timezone: '',
      show: false,
      // contacts: [
      //   { name: 'Audrey Clay', address: '644 Vermont Court, Freelandville, Kentucky, 2619', img: 'https://randomuser.me/api/portraits/women/5.jpg' },
      //   { name: 'Aguirre Klein', address: '626 Carroll Street, Roulette, Ohio, 1477', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
      //   { name: 'Tucker Kaufman', address: '887 Winthrop Street, Tryon, Florida, 3912', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
      //   { name: 'Herbert Keller', address: '286 NW. Shore St.Longwood, FL 32779', img: 'https://randomuser.me/api/portraits/men/5.jpg' }
      // ],
      showModalSizeLarge: true,
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      registerForm: false,
      loginForm: true,
      diplayLoggInnBtn: true,
      diplayRegisterBtn: false,
      // showContent: true,
      behandlingstyper: [],
      klienter: [],
      value: null,
      value2: null,
      // value3: new Date(),
      getNavn: null,
      displayBtn: false,
      displayBehandling: true,
      displayKlient: false,
      displayDatoTid: false,
      userInfo: false
      // customer: {
      //   name: 'Nathan Reyes',
      //   birthday: '1983-01-21'
      // },
      // modelConfig: {
      //   type: 'string',
      //   mask: 'YYYY-MM-DD' // Uses 'iso' if missing
      // }
      // showModalSizeLarge: true
      // showModal: false
    }
  },
  methods: {
    // Get name for step 1
    getId (typeNavn) {
      console.log('klikket på get ID')
      this.displayBehandling = false
      this.displayKlient = true
      this.value = typeNavn
      console.log(this.value)
      this.step1 = false
      // this.fetchKlienter()
      this.step2 = true
      this.displayBehandling = false
      this.displayKlient = true
    },
    // Get current time
    // currentDate () {
    //   const current = new Date()
    //   const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`
    //   console.log(date)
    //   return date
    // },
    getKlientNavn (klientNavn) {
      console.log('klikket på klient navn funk')
      this.displayKlient = false
      this.value2 = klientNavn
      console.log(this.value2)
      this.step1 = false
      this.step2 = false
      this.step3 = true
      this.displayKlient = false
      this.displayDatoTid = true
    },
    getDato (value3) {
      console.log(value3)
      this.displayDatoTid = true
      value3 = this.value3
      console.log(value3)
      this.step1 = false
      this.step2 = false
      this.step3 = true
      this.step5 = false
      this.displayBtn = true
      // this.addOrdre()
    },
    nextBtn () {
      console.log('klikket på knapp')
      this.displayDatoTid = true
      this.step3 = false
      this.step4 = true
      this.displayBtn = false
      this.displayDatoTid = false
      this.userInfo = true
      // this.step5 = true
      this.addOrdre()
    },
    login () {
      this.registerForm = false
      this.loginForm = true
      this.diplayRegisterBtn = false
      this.diplayLoggInnBtn = true
    },
    displayRegister () {
      this.loginForm = false
      this.registerForm = true
      this.diplayLoggInnBtn = false
      this.diplayRegisterBtn = true
    },
    loggInn () {
      this.step4 = false
      this.step5 = true
    },
    register () {
      this.step4 = false
      this.step5 = true
    },
    // showButton (value3) {
    //   console.log('clikced')
    // },
    // showModalSizeLargeer () {
    //   console.log('kliker på modal')
    //   this.fetchBehandlingstyper()
    // },
    // vaList () {
    //   console.log('clicked on va-list')
    // },
    // handleSubmit () {
    //   console.log('trykket på submit')
    //   console.log(this.role)
    //   this.addOrdre()
    // },
    // handlerNavn () {
    //   console.log('klikket på en av items')
    //   console.log(this.getNavn)
    // },
    // FUNGERER FOR Å ADDE I DATABASE
    addOrdre () {
      console.log('inne i add message')
      if (this.value && this.value2 && this.value3) {
        // this.feedback = null
        projectFirestore.collection('ordre').add({
          type: this.value,
          navn: this.value2,
          dato: this.value3
          // to: this.$route.params.id,
          // from: this.authUser.email,
          // description: this.message,
          // createdAt: new Date(),
        }).then(() => {
          // this.value = null
          // this.value2 = null
          // this.value3 = null
        })
      } else {
        console.log('feil')
      }
    },
    // Fetcher alle behandlingstyper for step1
    fetchBehandlingstyper () {
      console.log('inne i behandlingstyper')
      projectFirestore.collection('behandlingstyper').get().then(behandlingstyper => {
        behandlingstyper.docs.forEach(doc => {
          console.log('data')
          // console.log(doc.id)
          const type = doc.data()
          // console.log(type)
          type.id = doc.id //  Iden over mot autogenerert id
          console.log('id')
          console.log(type.id)
          this.behandlingstyper.push(type)
        })
        console.log('alle behandlingstyper:', this.behandlingstyper)
      })
    },
    // Fetcher alle klienter for step2
    fetchKlienter () {
      console.log('inne i Klienter')
      projectFirestore.collection('klient').get().then(klienter => {
        klienter.docs.forEach(doc => {
          console.log('KLIENTDATA')
          // console.log(doc.data().id)
          const klient = doc.data()
          console.log(klient)
          klient.id = doc.id //  Iden over mot autogenerert id
          console.log('KLIENTid')
          console.log(klient.id)
          this.klienter.push(klient)
        })
        console.log('alle klienter:', this.behandlingstyper)
      })
    }
  },
  created () {
    this.fetchBehandlingstyper()
    this.fetchKlienter()
  }
  // methods: {
  //   toggleModal () {
  //     this.showModal = !this.showModal
  //   }
  // }
})
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
/* .item > button {
  top: 0;
  bottom: 0;
  position: absolute;
  width: 110px;
  height: 100%;
  background: linear-gradient(to right, #ff105f, #ffad06, blue);
  border-radius: 30px;
  transition: .5s;
}

.toggle-btn:hover {
  background: linear-gradient(to right, #ff105f, #ffad06);
  top: 0;
  bottom: 0;
  width: 110px;
  height: 100%;
  background: linear-gradient(to right, #ff105f, #ffad06, blue);
  border-radius: 30px;
  transition: .5s;
}

.toggle-btn:visited {
  background: linear-gradient(to right, #ff105f, #ffad06);
  top: 0;
  bottom: 0;
  width: 110px;
  height: 100%;
  background: linear-gradient(to right, #ff105f, #ffad06, blue);
  border-radius: 30px;
  transition: .5s;
}
.toggle-btn {
  padding: 10px 20px;
  cursor: pointer;
  background:transparent;
  border:0;
  outline: none;
  position: relative;
} */
#nav a.router-link-exact-active {
  color: #42b983;
}
.toggle-btn{
  background-color: blue;
  color: white;
  width: 200px;
  height: 40px;
  border-radius: 30px;
  font-size: 190%;
}
.item {
    border: 1px solid rgb(212, 205, 205);
    background-color: #ffffff;
    text-align: center;
  }
.va-list-item:hover {
  background-color: lightblue;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

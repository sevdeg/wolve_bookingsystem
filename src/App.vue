<template>
  <router-view/>
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
              <va-list-item-section>
                <va-list-item-label>
                  {{ klient.navn }}
                </va-list-item-label>
                <va-list-item-label caption>
                  {{ klient.beskrivelse }}
                </va-list-item-label>
              </va-list-item-section>
            </va-list-item>
          </va-list>
        </div>
      </div>
      <!-- STEP 3 -->
      <div class="flex md8" v-if="step3">
        <va-list-label>
            Velg dato og tid
        </va-list-label>
        <DatePicker @click="getDato(value3)" isRequired v-model="date" :available-dates='{ start: new Date(), end: null }' mode="dateTime" :timezone="timezone" />
         <div class="flex items-baseline mt-2">
          <span class="text-gray-600 font-semibold tracking-wide">Valgt tid:</span>
          <span class="text-gray-800 ml-2">{{ value3.toISOString() }}</span>
        </div>
      </div>
      <div class="flex md8" v-if="step4">
        <va-list-label>
            <button type="button" class="toggle-btn" @click="login()">Log In</button>
            <button type="button" class="toggle-btn" @click="displayRegister()">Register</button>
        </va-list-label>
        <div class="item">
          <va-form v-if="loginForm">
                 <va-input
                    class="mb-4 mr-4"
                    label="Email"
                    v-model="email"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
                <va-input
                    label="Passord"
                    v-model="passord"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
          </va-form>
           <va-form v-if="registerForm">
                <va-input
                    class="mb-4 mr-4"
                    label="Fornavn"
                    v-model="fornavn"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
                <va-input
                    class="mb-4 mr-4"
                    label="Etternavn"
                    v-model="etternavn"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
                 <va-input
                    class="mb-4 mr-4"
                    label="Email"
                    v-model="email2"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
                <va-input
                    label="Passord"
                    v-model="passord2"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
            </va-form>
          <!-- <RegisterForm v-if="registerForm"></RegisterForm> -->
          <va-button v-if="diplayLoggInnBtn" @click="loggInn()"> Logg inn </va-button>
          <va-button v-if="diplayRegisterBtn" @click="register()"> Register </va-button>
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
              <td><strong>Dato/Tid: </strong> {{ value3 }}</td>
            </tr>
            <tr>
              <td><strong>Klient:</strong> {{ value2 }}</td>
              <td><strong>Behandling:</strong> {{ value }}</td>
            </tr>
            <thead>
            <tr>
              <th>Kunde info</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Navn: </strong>{{ fornavn }}</td>
                <td><strong>Etternavn: </strong>{{ etternavn }}</td>
                <td>
                </td>
              </tr>
              <tr>
                <td><strong> Email: </strong>{{ email2 }}</td>
                <td>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
</template>
<script>
import Modal from './components/Modal.vue'
import behandlingsInfo from './components/behandlingsInfo.vue'
import klientInfo from './components/klientInfo.vue'
import datoTidInfo from './components/datoTidInfo.vue'
import userInfo from './components/userInfo.vue'
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
    DatePicker
  },
  data () {
    return {
      value3: new Date(),
      timezone: '',
      show: false,
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
      userInfo: false,
      email: '',
      passord: '',
      fornavn: '',
      etternavn: '',
      email2: '',
      passord2: ''
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
      console.log(this.email)
      console.log(this.passord)
    },
    register () {
      this.step4 = false
      this.step5 = true
      console.log(this.fornavn)
      console.log(this.etternavn)
      console.log(this.email2)
      console.log(this.passord2)
    },
    // FUNGERER FOR Å ADDE I DATABASE
    addOrdre () {
      console.log('inne i add message')
      if (this.value && this.value2 && this.value3) {
        // this.feedback = null
        projectFirestore.collection('ordre').add({
          type: this.value,
          navn: this.value2,
          dato: this.value3
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
.toggle-btn{
  background-color: blue;
  color: white;
  width: 150px;
  height: 40px;
  border-radius: 20px;
  font-size: 100%;
}

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

<template>
    <div class="hero">
        <div class="form-box" :class="{'register-active' : register, login}">
            <div class="button-box">
                <div id="btn"></div>
                <button type="button" class="toggle-btn" @click="login()">Log In</button>
                <button type="button" class="toggle-btn" @click="displayRegister()">Register</button>
            </div>
            <div v-if="logginn">
              <h1>Please Log in</h1>
              <form id="login" class="input-group">
                  <input type="text" class="input-field" placeholder="Your email" required>
                  <input type="email" class="input-field" placeholder="Your Password" required>
                  <button type="submit" class="submit-btn">Log in </button>
              </form>
            </div>
            <div v-if="registerForm">
              <h1>Register</h1>
              <form id="register" class="input-group">
                  <input type="text" v-model="fName" class="input-field" placeholder="First name" required>
                  <input type="text" v-model="lName" class="input-field" placeholder="Last name" required>
                  <input type="text" v-model="email" class="input-field" placeholder="Your email" required>
                   <input type="int" v-model="phoneNumb" class="input-field" placeholder="Your number" required>
                  <button type="submit" class="submit-btn">Register </button>
              </form>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data: () => {
    return {
      register: false,
      logginn: true,
      registerForm: false
    }
  },
  methods: {
    login () {
      console.log('klikket på')
      const auth = firebase.auth()
      const fName = this.fName
      const lName = this.lname
      const email = this.email
      const phoneNumb = this.phoneNumb
      this.registerForm = false
      this.logginn = true
      auth
        .createUserWithEmailAndPassword(email, phoneNumb)
        .then(async res => {
          console.log('res', res)
          // save data to ls so that our local and db are in sync
          await firebase
            .firestore()
            .collection('users')
            .add({
              fName,
              lName,
              // id: res.user.uid,
              email,
              phoneNumb
            })
            .then(ref => {
            // trengs ikke forløpig
            // localStorage.setItem("id", res.user.uid);
              localStorage.setItem('fName', fName)
              localStorage.setItem('lName', lName)
              localStorage.setItem('email', email)
              localStorage.setItem('phoneNumb', phoneNumb)
              localStorage.setItem('FirebaseDocumentId', ref.id)
              this.fName = ''
              this.lName = ''
              this.email = ''
              this.phoneNumb = ''
            // this.$router.push("/Chatroom");
            })
            .catch(err => alert(err))
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
    },
    displayRegister () {
      console.log('klikket på')
      this.logginn = false
      this.registerForm = true
    }

  }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
.red {
  background-color: red;
}
.login {
  left: 0;
  z-index: 2;
}

.register {
  left: 0;
  z-index: 1;
  opacity: 0;
}

.register-active {
  .login {
    transform: translateX(100%);
  }

  .register {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show .5s;
  }
}
.hero{
    height: 100%;
    width: 100%;
    background-position: center;
    background-color: grey;
    background-size: cover;
    position: absolute;
}
.form-box {
    width: 380px;
    height: 480px;
    position: relative;
    margin: 6% auto;
    background: #fff;
    padding:5px;
    transition: transform .5s ease-in-out;
    z-index: 100;
    transform: translateX(0);
    transition: transform .5s ease-in-out;
}
.button-box{
    width: 220px;
    margin:35px auto;
    position: relative;
    box-shadow: 0 0 20px 9px #ff61242f;
    border-radius: 30px;
}
.toggle-btn{
  &:hover {
    background: linear-gradient(to right, #ff105f, #ffad06);
    top: 0;
    bottom: 0;
    width: 110px;
    height: 100%;
    // background: linear-gradient(to right, #ff105f, #ffad06, blue);
    border-radius: 30px;
    transition: .5s;
  }
  .toggle-btn:visited {
    background: linear-gradient(to right, #ff105f, #ffad06);
    top: 0;
    bottom: 0;
    width: 110px;
    height: 100%;
    // background: linear-gradient(to right, #ff105f, #ffad06, blue);
    border-radius: 30px;
    transition: .5s;
  }
    padding: 10px 20px;
    cursor: pointer;
    background:transparent;
    border:0;
    outline: none;
    position: relative;
}
#btn{
    top: 0;
    bottom: 0;
    position: absolute;
    width: 110px;
    height: 100%;
    // background: linear-gradient(to right, #ff105f, #ffad06, blue);
    border-radius: 30px;
    transition: .5s;
}
.input-group{
    top: 180px;
    position: absolute;
    width: 280px;
    transition: .5s;
}
.input-field{
    width: 100%;
    padding: 10px 0;
    margin:  5px 0;
    border-left: 0;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #999;
    outline: none;
    background: transparent;
}
.submit-btn{
    width: 85;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: linear-gradient(to right, #ff105f,#ffad06);
    border:0;
    outline: none;
    border-radius: 30px;
}
#login{
    left: 50px;
}
#register{
    left: 50px;
}
</style>
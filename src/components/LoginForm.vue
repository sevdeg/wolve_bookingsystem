<template>
    <div class="hero">
        <div>
            <h1>Logg inn form</h1>
            <va-form>
                <va-input
                    class="mb-4 mr-4"
                    label="Email"
                    v-model="inputValue1"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
                <va-input
                    label="Password"
                    v-model="inputValue2"
                    :rules="[value => (value && value.length > 0) || 'Field is required']"
                />
            </va-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      inputValue1: '',
      inputValue2: ''
    }
  }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}
.login {
  left: 0;
  z-index: 2;
}

/* .hero{
    height: 100%;
    width: 100%;
    background-position: center;
    background-color: grey;
    background-size: cover;
    position: absolute;
} */
.form-box {
    width: 380px;
    height: 480px;
    position: relative;
    margin: auto;
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
</style>

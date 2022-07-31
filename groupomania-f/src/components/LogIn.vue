<template>
    <div className='container'>
        <div className='form'>
            <h1>Se connecter</h1>
            <form>
                <label for="email">Email : </label>
                <input v-model="email" type="email" name="email" placeholder="name@fai.country" />
                <br />
                <br />
                <label for="password">Mot de passe : </label>
                <input v-model="password" type="password" name="password" placeholder="********" />
                <br />
                <br />
                <router-link to="/newpass">Mot de passe oublié ?</router-link>
                <br />
                <router-link to="/signup">Créer un compte</router-link>
                <button @click="login()" type="button" class="sent">Se connecter</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'LogIn',
      data () {
    return {
      email:'',
      password:'',
    }
  },
  methods:{
		login() {
      const user = { email: this.email, password: this.password };

      axios.post("http://localhost:3000/api/auth/login", user)

      .then(response => {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem('userId', response.data.userId);
          //Affichage de l'information de connection
          alert(user.email + ', vous êtes maintenant connexté.')
          location = "http://localhost:3001/home"
                  })
      .catch(error => { 
        if (error.response.status == 404) {
          this.msg = 'Utilisateur inconnu !'
        }
        else if (error.response.status == 401) {
          this.msg = "Mot de passe incorrect !"
        }
      })
    },
  }
}

</script>

<style scoped>
.container {
    width: 100%;
    height: 400px;
    padding-top: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    margin-top: 10px;
}

a {
    font-size: 16px;
}

.form {
    width: 500px;
    height: 500px;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #4E5166;
    border-radius: 5%
}

form {
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

input {
    font-size: 25px;
}

.sent {
    font-size: 20px;
    margin-top: 40px;
    background-color: #FFF;
}

.sent:hover {
    background-color: #ffd7d7;
}

.sent::after {
    background-color: #FD2D01;
}
</style>
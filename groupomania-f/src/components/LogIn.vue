<!-- **********Login user********** -->
<template>
  <div className='container'>
    <div className='form'>
      <h1>Se connecter</h1>
      <form>
        <label for="email">Email : </label>
        <span><i class="fas fa-envelope fa-sm"></i><input v-model="email" type="email" name="email"
            placeholder="name@groupomania.fr" /></span>
        <label for="password">Mot de passe : </label>
        <span><i class="fas fa-lock fa-sm"></i><input v-model="password" @keyup.enter="login()" type="password"
            name="password" placeholder="********" /></span>
        <router-link to="/newpass">Mot de passe oublié ?</router-link>
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
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },

  methods: {
    login() {
      const user = { email: this.email, password: this.password };
      axios.post("http://localhost:3000/api/auth/login", user)
        .then(response => {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem('userId', response.data.userId);
          sessionStorage.setItem('isAdmin', response.data.isAdmin);
          this.$router.push('/')
        })
        .catch(error => {
          if (error.response.status == 404) {
            alert('Utilisateur inconnu !')
          }
          else if (error.response.status == 401) {
            alert('Mot de passe incorrect !')
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
  padding-top: 2%;
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
  height: 400px;
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

input {
  margin-left: 10px;
}

/* Media Queries */
@media (min-width: 501px) and (max-width: 576px) {
  .form {
    width: 450px;
  }
}

/* Media Queries */
@media (min-width: 341px) and (max-width: 500px) {
  .form {
    width: 300px;
    height: 320px;
  }

  h1 {
    text-align: center;
    font-size: 25px;
  }

  form {
    font-size: 20px;
  }

  input {
    font-size: 20px;
  }

  .sent {
    margin-top: 20px;
    font-size: 18px;
  }
}

/* Media Queries */
@media (max-width: 340px) {
  .form {
    width: 250px;
    height: 280px;
  }

  h1 {
    text-align: center;
    font-size: 20px;
  }

  form {
    font-size: 15px;
  }

  input {
    font-size: 15px;
  }

  .sent {
    margin-top: 10px;
    font-size: 15px;
  }
}
</style>
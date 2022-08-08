<template>
    <div className='container'>
        <div className='form'>
            <h1>Créer un compte</h1>
            <form>
                <label for="name">Nom : </label>
                <input v-model="name" type="text" name="name" placeholder="Dupont" />

                <label for="email">Email : </label>
                <input v-model="email" type="email" name="email" placeholder="name@fai.country" />

                <label for="password">Mot de passe : </label>
                <input v-model="password" type="password" name="password" placeholder="********" />

                <button @click="signup()" type="button" class="sent">Créer</button>
            </form>
        </div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },

    methods: {
        signup() {
            //Connection a l'API et envoi des datas (input)
            axios.post('http://localhost:3000/api/auth/signup', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(() => {
                    const ok = true
                    const user = { email: this.email, password: this.password };

                    if (ok) {
                        //Connexion de l'utilisateur
                        axios.post("http://localhost:3000/api/auth/login", user)

                            .then(response => {
                                sessionStorage.setItem("token", response.data.token);
                                sessionStorage.setItem('userId', response.data.userId);
                                sessionStorage.setItem('user', this.name);
                                location = "http://localhost:3001/home"
                            })


                            .catch(error => {
                                if (error.response.status == 401) {
                                    this.msg = 'Utilisateur déjà existant !'
                                }
                            })
                    }
                })


        }
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
    font-size: 12px;
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
    margin-top: 20px;
    background-color: #FFF;
}

.sent:hover {
    background-color: #ffd7d7;
}

.sent::after {
    background-color: #FD2D01;
}
</style>
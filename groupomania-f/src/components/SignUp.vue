<!-- **********Signup user********** -->
<template>
    <div className='container'>
        <div className='form'>
            <h1>Créer un compte</h1>
            <form>
                <label for="name">Nom : </label>
                <span><i class="fas fa-user fa-sm"></i><input v-model="name" type="text" name="name"
                        placeholder="Dupont" /></span>

                <label for="email">Email : </label>
                <span class="min">*Email professionnel obligatoire**</span>
                <span><i class="fas fa-envelope fa-sm"></i><input v-model="email" type="email" name="email"
                        placeholder="name@groupomania.fr" /></span>

                <label for="password">Mot de passe : </label>
                <span class="min">*8 caractères, minuscules, majuscules, 1 chiffre*</span>
                <span><i class="fas fa-lock fa-sm"></i><input v-model="password" @keyup.enter="signup()" type="password"
                        name="password" placeholder="********" /></span>

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
            //Connection to API and send datas (input)
            axios.post('http://localhost:3000/api/auth/signup', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(() => {
                    const user = { email: this.email, password: this.password };

                    //Connexion of user
                    axios.post("http://localhost:3000/api/auth/login", user)

                        .then(response => {
                            sessionStorage.setItem("token", response.data.token);
                            sessionStorage.setItem('userId', response.data.userId);
                            sessionStorage.setItem('user', this.name);
                            this.$router.push('/')
                        })

                        .catch(error => {
                            if (error.response.status == 401) {
                                alert(error.response.data.message)
                            }
                        })
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 420px;
    padding-top: 2%;
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
    height: 520px;
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
    margin-top: 10px;
    background-color: #FFF;
}

.sent:hover {
    background-color: #ffd7d7;
}

.sent::after {
    background-color: #FD2D01;
}

input {
    margin-left: 10px;
}

.min {
    font-size: 10px;
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
        height: 370px;
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
        height: 310px;
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
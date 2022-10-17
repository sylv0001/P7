<!-- **********Modify user password********** -->
<template>
    <div className='container'>
        <div className='form'>
            <h1>Changer votre mot de passe</h1>
            <form>
                <label for="email">Email : </label>
                <span><i class="fas fa-envelope fa-sm"></i><input v-model="email" type="email" name="email"
                        placeholder="name@groupomania.fr" /></span>
                <label for="password">Mot de passe : </label>
                <span><i class="fas fa-lock fa-sm"></i><input v-model="password" @keyup.enter="newpass()"
                        type="password" name="password" placeholder="********" /></span>
                <button @click="newpass()" type="button" class="sent">Mettre à jour</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NewPass',

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        newpass() {
            //Connection to API and send datas (input)
            axios.put('http://localhost:3000/api/auth/updatepass', {
                email: this.email,
                password: this.password
            })
                .then(() => {
                    alert('vous avez changé votre mot de passe. Vous pouvez vous reconnecter.');
                    this.$router.push('/login')
                })
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 360px;
    padding-top: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    margin-top: 10px;
}

.form {
    width: 500px;
    height: 320px;
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
        height: 250px;
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
        margin-top: 15px;
        font-size: 15px;
    }
}
</style>
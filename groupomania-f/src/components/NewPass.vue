<template>
    <div className='container'>
        <div className='form'>
            <h1>Changer votre mot de passe</h1>
            <form>
                <label for="email">Email : </label>
                <input v-model="email" type="email" name="email" placeholder="name@fai.country" />
                <br />
                <br />
                <label for="password">Nouveau mot de passe : </label>
                <input v-model="password" @keyup.enter="newpass()" type="password" name="password" placeholder="********" />
                <br />
                <br />
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
            //Connection a l'API et envoi des datas (input)
            axios.put('http://localhost:3000/api/auth/updatepass', { 
                email: this.email, 
                password: this.password 
                })

            //Affichage de l'information de modification du mot de passe
            alert('vous avez changé votre mot de passe. Vous pouvez vus reconnecter.');

            //redirection vers la page de connexion
            location = "http://localhost:3001/login"
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
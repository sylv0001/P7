<!-- **********Delete user********** -->

<template>
    <div className='container'>
        <h1>Attention, vous êtes sur le point de supprimer définitivement votre compte !</h1>
        <button @click="delUser()" type="button" class="sent">Supprimer son compte</button>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: 'Delete',

    methods: {
        //Delete user
        delUser() {
            axios.delete('http://localhost:3000/api/auth/delete/' + sessionStorage.getItem('userId'), {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.token}`,
                }
            })
                .then(() => {
                    alert('Compte supprimé !')
                    sessionStorage.clear()
                    this.$router.push('/login')
                })
                .catch((error) => {
                    console.log(error)
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
    width: 80%;
    color: #FD2D01;
    text-decoration: #FD2D01 double underline;
    text-align: center;
}

.sent {
    font-size: 20px;
    margin: auto;
    background-color: #FFF;
    color: #4E5166;
}

.sent:hover {
    background-color: #FD2D01;
    color: #4E5166
}
</style>
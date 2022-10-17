<!-- **********Error page if user use a bad url********** -->
<template>
    <div class="container">
        <h1>Error 404: Page inexistante.</h1>
        <button class="backHome" @click="backHome">Accueil</button>
    </div>
</template>

<script>
export default {
    name: 'backHome',
    methods: {
        backHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.container {
    width: 500px;
    height: 140px;
    margin-top: 20%;
    margin-bottom: 10%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #4E5166;
    border-radius: 25px;
}

h1 {
    text-align: center;
}

.backHome {
    font-size: 25px;
    background-color: #FFF;
    color: #4E5166
}

.backHome:hover {
    background-color: #ffd7d7;
}
</style>
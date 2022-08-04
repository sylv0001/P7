<template>
    <header>
        <div class="header">
            <div class="logo-box">
                <img src='../assets/images/icon-left-font-monochrome-black.png'>
            </div>
            <nav>
                <ul>
                    <li v-show="connect">
                        <router-link to="/home">Accueil</router-link>
                    </li>
                    <li v-show="connect">
                        <router-link to="/post">Poster</router-link>
                    </li>
                    <li v-show="connect">
                        <router-link to="/home">Profil</router-link>
                    </li>
                    <li v-show="connect">
                        <router-link to="/login" v-on:click="disconnect">Déconnexion</router-link>
                    </li>
                    <li>
                        <span class="connect"
                            :style="connect ? { 'background-color': '#DCFFC8' } : { 'background-color': '' }"></span>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'NavBar',

    data() {
        if (sessionStorage.userId) {
            return {
                connect: true
            }
        }
        else {
            return {
                connect: false
            }
        }
    },

    methods: {
        disconnect() {
            sessionStorage.clear()
        }
    }
}

</script>

<style scoped>
header {
    padding: 0;
    background: #ffd7d7;
    box-shadow: 0 4px 6px rgba(0, 0, 0, .2);
}

.header {
    padding: 0 20px;
    max-width: 960px;
    margin: 0 auto;
}

.logo-box {
    float: left;
    margin-right: 20px;
    width: 210px;
    height: 70px;
}

.logo-box a {
    outline: none;
    display: block;
}

.logo-box img {
    display: block;
    max-width: 100%;
    height: 50px;
    object-fit: cover;
    overflow: hidden;
    padding-top: 10px;
}

nav {
    overflow: hidden;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    float: right;
}

nav li {
    display: inline-block;
    margin-left: 25px;
    height: 70px;
    line-height: 70px;
    transition: .5s linear;
}

nav a {
    text-decoration: none;
    display: block;
    position: relative;
    color: #000;
    text-transform: uppercase;
}

nav a:after {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 15px;
    background: #000;
    transition: width .5s linear;
}

nav a:hover:after {
    width: 100%;
}

.connect {
    width: 30px;
    height: 30px;
    margin-left: 25px;
    top: 10px;
    display: inline-block;
    position: relative;
    border: 2px solid #4E5166;
    border-radius: 50%;
}

@media screen and (max-width: 660px) {
    header {
        text-align: center;
    }

    .logo-box {
        float: none;
        display: inline-block;
        margin: 0 0 16px 0;
    }

    ul {
        float: none;
    }

    nav li:first-of-type {
        margin-left: 0;
    }
}

@media screen and (max-width: 550px) {
    nav {
        overflow: visible;
    }

    nav li {
        display: block;
        margin: 0;
        height: 40px;
        line-height: 40px;
    }

    nav li:hover {
        background: rgba(0, 0, 0, .1);
    }

    nav a:after {
        content: none;
    }
}
</style>
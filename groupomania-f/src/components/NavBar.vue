<!-- **********Navbar********** -->
<template>
    <header>
        <div class="header">
            <div class="logo-box">
                <img src='../assets/images/icon-left-font-monochrome-black.png'>
            </div>
            <nav>
                <ul>
                    <li v-show="connect">
                        <router-link to="/">Accueil</router-link>
                    </li>
                    <li v-show="connect">
                        <router-link to="/post">Poster</router-link>
                    </li>
                    <li v-show="connect">
                        <router-link to="/login" @click="disconnect">Déconnexion</router-link>
                    </li>
                    <li v-show="connect">
                        <router-link to="/delete" class="txt">Supprimer son compte</router-link>
                        <router-link to="/delete" class="icon"><img src='../assets/images/userTrash.svg' />
                        </router-link>
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
    box-shadow: 0 4px 6px rgba(78, 97, 102, .2);
}

.header {
    height: 60px;
    padding: 0 20px;
    max-width: 960px;
    margin: 0 auto;
    display: block;
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
    line-height: 65px;
    transition: .5s linear;
}

nav a {
    text-decoration: none;
    display: block;
    position: relative;
    color: #4E5166;
    text-transform: uppercase;
}

nav a:after {
    content: "";
    width: 0;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 15px;
    background: #4E5166;
    transition: width .5s linear;
}

nav a:hover:after {
    width: 100%;
}

.txt {
    text-transform: none;
}

.connect {
    width: 30px;
    height: 30px;
    top: 10px;
    display: inline-block;
    position: relative;
    border: 2px solid #4E5166;
    border-radius: 50%;
}

.icon {
    display: none;
}

/*Media Querie */
@media (max-width: 770px) {
    header {
        text-align: center;
        height: 105px;
    }

    .logo-box {
        float: none;
        display: inline-block;
        margin: 0;
    }

    nav {
        height: 50px;
        line-height: 50px;
    }

    ul {
        float: none;
        margin-top: -25px;
    }

    nav li:first-of-type {
        margin-left: 0;
    }
}

/*Media Querie */
@media screen and (max-width: 550px) {
    header {
        height: 90px;
    }

    li a {
        font-size: 14px;
    }

    .logo-box {
        height: 40px;
    }

    ul {
        float: none;
        margin-top: -5px;
    }
}

/*Media Querie */
@media screen and (max-width: 470px) {
    nav li {
        margin-left: 25px;
    }
    li a {
        font-size: 12px;
    }

    ul {
        float: none;
        margin-top: -8px;
    }

    .txt {
        display: none;
    }

    .icon {
        display: inline-block;
        width: 30px;
        height: 65px;
    }

}
/*Media Querie */
@media screen and (max-width: 350px) {
    nav li {
        margin-left: 15px;
    }
}
</style>
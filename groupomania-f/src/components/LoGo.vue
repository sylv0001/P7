<!-- **********Logo Groupomania********** -->
<template>
    <div class="logo">
        <img src='../assets/images/icon-central.png'>
    </div>
</template>

<script>
export default {
    name: 'LoGo'
}
</script>

<style scoped>
.logo {
    height: 163px;
    padding-top: 3%;
    text-align: center;
}

.logo img {
    object-fit: cover;
}

/* Media Queries */
@media (min-width: 651px) and (max-width: 992px) {
    .logo img {
        width: 600px;
    }
}

/* Media Queries */
@media (min-width: 501px) and (max-width: 650px) {
    .logo img {
        width: 400px;
    }
}

/* Media Queries */
@media (min-width: 341px) and (max-width: 500px) {
    .logo img {
        width: 340px;
    }
}

/* Media Queries */
@media (max-width: 340px) {
    .logo img {
        width: 250px;
    }
}
</style>
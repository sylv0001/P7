<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale"></div>
        <div class="modale card">
            <img src='../assets/images/closed.png' class="btn-modale btn btn-danger" @click="$emit('toggle-modale')">
            <img :src="imageUrl" alt="image du commentaire" id="modal">
        </div>
    </div>
</template>

<script>

export default {
    name: "Modale",
    props: ["revele", "imageUrl"],
};

</script>


<style scoped>
.bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    background: rgba(255, 215, 215, 0.2);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modale {
    width: 800px;
    height: 600px;
    background: #FFF;
    color: #4E5166;
    padding: 50px;
    position: fixed;
    top: 8%;
}

.btn-modale {
    width: 20px;
    height: 20px;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
}

.btn-danger:hover {
    background-color: red;
    cursor: default;
}
</style>
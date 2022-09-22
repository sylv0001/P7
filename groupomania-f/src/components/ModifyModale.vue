<template>
    <!-- <div class="bloc-modale" v-if="reveleModify"> -->
    <div className='container' v-if="reveleModify">
        <div class="overlay">
            <div className='form'>
                <h1>Commentaire</h1>
                <form>
                    <div class="blocFlex">
                        <div class="img">
                            <img class="photo" :src="imageUrl" alt="image du commentaire">
                        </div>
                        <div class="blocInputs">
                            <label for="title">Titre : </label>
                            <input :value="title" :title="title" type="text" name="title" ref="modifTitle" />

                            <label for="commentaire">Commentaire : </label>
                            <textarea :value="commentaire" :commentaire="commentaire" name="commentaire" ref="modifCommentaire"></textarea>
                        </div>
                    </div>
                    <label for="imageUrl">Votre image : </label>
                    <input @change="handleFileUpload($event)" type="file" name="imageUrl"
                        accept=".jpg, .jpeg, .png, .gif">
                    <button @click="modify(this.id)" type="button" class="sent">Envoyer</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ModifyModale",

    props: ["reveleModify", "id", "title", "commentaire", "imageUrl"],

    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },

        modify(id) {
            const formData = new FormData()
            formData.set('title', this.$refs.modifTitle.value)
            formData.set('commentaire', this.$refs.modifCommentaire.value)
            formData.append('image', this.file)
            console.log(FormData)
            //Connection a l'API et envoi des datas (input)
            axios.put('http://localhost:3000/api/coms/' + id, formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.token}`,
                }
            })
                .then(response => {
                    console.log(response);
                    console.log(this.title)
                    console.log(this.file)
                    location = ('http://localhost:3001/home')
                })
        }
    }

}
</script>


<style scoped>
.container {
    width: 100%;
    height: 600px;
    position: fixed;
    padding-top: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.overlay {
    background: rgba(255, 215, 215, 0.2);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

h1 {
    margin-top: 10px;
}

a {
    font-size: 16px;
}

.form {
    width: 600px;
    height: 470px;
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
    gap: 20px;
}

.blocFlex {
    display: flex;
    flex-direction: row;
    gap: 50px;
}

.blocInputs {
    display: flex;
    flex-direction: column;
    justify-content: right;
    gap: 10px;
}

.img {
    width: 130px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: left;
}

.img>img {
    width: 100%;
    object-fit: contain;
    vertical-align: middle
}

input {
    font-size: 25px;
}

textarea {
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
</style>
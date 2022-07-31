<template>
    <div className='container'>
        <div className='form'>
            <h1>Commentaire</h1>
            <form>
                <label for="title">Titre : </label>
                <input v-model="title" type="text" name="title" placeholder="Titre" />
                <br />
                <label for="commentaire">Commentaire : </label>
                <textarea v-model="commentaire" name="commentaire" placeholder="Votre commentaire"></textarea>
                <br />
                <label for="imageUrl">Votre image : </label>
                <input ref="file" v-on:change="handleFileUpload()" type="file" name="imageUrl">
                <br />
                <button @click="comment()" type="button" class="sent">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
//import ref from "vue";

export default {
    name: 'ComMent',
    data() {
        return {
            title: '',
            commentaire: '',
            imageUrl: '',
        }
    },

    methods: {
        handleFileUpload() {
            {
                let input = this.$refs.file
                let img = input.files
                if (img && img[0]) {
                    let reader = new FileReader
                    reader.onload = e => {
                        this.previewImage = e.target.result
                    }
                }
            }
        },
        comment() {
            //Connection a l'API et envoi des datas (input)
            axios.post('http://localhost:3000/api/coms', {
                title: this.title,
                commentaire: this.commentaire,
                imageUrl: this.imageUrl
            })
        }
    }
}


</script>

<style scoped>
.container {
    width: 100%;
    height: 600px;
    padding-top: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    margin-top: 10px;
}

a {
    font-size: 16px;
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

textarea {
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
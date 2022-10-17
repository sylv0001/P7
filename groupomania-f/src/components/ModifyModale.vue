<!-- **********Modale to modify comment********** -->
<template>
    <div className='container' v-if="reveleModify">
        <div class="overlay">
            <div className='form'>
                <div class="close">
                    <h1>Commentaire</h1>
                    <img src='../assets/images/closed.png' class="btn-modale btn btn-danger"
                        @click="$emit('close-modale')">
                </div>
                <form>
                    <div class="blocFlex">
                        <div class="img">
                            <img class="photo" :src="imageUrl" alt="image du commentaire">
                        </div>
                        <div class="blocInputs">
                            <label for="title">Titre : </label>
                            <input :value="title" :title="title" type="text" name="title" ref="modifTitle" />

                            <label for="commentaire">Commentaire : </label>
                            <textarea :value="commentaire" :commentaire="commentaire" name="commentaire"
                                ref="modifCommentaire"></textarea>
                        </div>
                    </div>
                    <div class="changeImg">
                        <label for="imageUrl">Votre image : </label>
                        <input @change="handleFileUpload($event)" type="file" name="imageUrl"
                            accept=".jpg, .jpeg, .png, .gif">
                    </div>
                    <button @click="modify(this.id), $emit('close-modale')" type="button" class="sent">Valider</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ModifyModale",
    //Variable from parent to children
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

            //Connection  to API et send datas (input)
            axios.put('http://localhost:3000/api/coms/' + id, formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.token}`,
                }
            })
                .then((response) => {
                    this.$emit('modif', response.data.com)
                })
        },
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
    background: rgba(255, 215, 215, 0.5);
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
    height: 450px;
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

.close {
    width: 600px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* align-items: baseline; */
    gap: 50px;
}

.close img {
    width: 25px;
    position: absolute;
    margin-top: 10px;
    margin-left: 550px;
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
    max-height: 210px;
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

.form>img {
    width: 10px;
    height: 10px;
    float: right;
}

.btn-danger:hover {
    background-color: red;
    cursor: default;
}

.changeImg {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    gap: 10px;
}

/* Media Queries */
@media (max-width: 750px) {
    .form {
        width: 500px;
        height: 420px;
    }

    .img {
        width: 100px;
        max-height: 210px;
    }

    h1 {
        font-size: 26px;
    }

    .close img {
        width: 25px;
        margin-top: 10px;
        margin-left: 450px;
    }

    .blocFlex {
        justify-content: space-evenly;
    }

    .blocInputs {
        font-size: 22px;
    }

    .blocInputs input {
        font-size: 22px;
    }

    .blocInputs textarea {
        font-size: 22px;
    }

    .changeImg {
        font-size: 22px;
    }

    .changeImg input {
        font-size: 22px;
    }
}

/* Media Queries */
@media (max-width: 600px) {
    .form {
        width: 400px;
        height: 380px;
    }

    .img {
        width: 100px;
        max-height: 210px;
    }

    h1 {
        font-size: 22px;
    }

    .close img {
        width: 25px;
        margin-top: 10px;
        margin-left: 350px;
    }

    .blocFlex {
        justify-content: space-evenly;
    }

    .blocInputs {
        font-size: 18px;
    }

    .blocInputs input {
        font-size: 18px;
    }

    .blocInputs textarea {
        font-size: 18px;
    }

    .changeImg {
        font-size: 18px;
    }

    .changeImg input {
        font-size: 18px;
    }
}

/* Media Queries */
@media (max-width: 450px) {
    .form {
        width: 300px;
        height: 350px;
    }

    .close img {
        margin-left: 250px;
    }

    .img {
        width: 100px;
        max-height: 210px;
    }

    .blocFlex {
        width: 280px;
        gap: 20px;
    }

    .changeImg input {
        font-size: 16px;
    }

    .sent {
        margin-top: 0;
        font-size: 16px;
    }
}
</style>
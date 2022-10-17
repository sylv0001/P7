<!-- **********Post comment********** -->
<template>
    <div className='container'>
        <div className='form'>
            <h1>Commentaire</h1>
            <form>
                <label for="title">Titre : </label>
                <input v-model="title" type="text" name="title" placeholder="Titre" />
                
                <label for="commentaire">Commentaire : </label>
                <textarea v-model="commentaire" name="commentaire" placeholder="Votre commentaire"></textarea>
                
                <label for="imageUrl">Votre image : </label>
                <input @change="handleFileUpload($event)" type="file" name="imageUrl" accept=".jpg, .jpeg, .png, .gif">
                
                <button @click="comment()" type="button" class="sent">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

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
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },

        comment() {
            const formData = new FormData()

            formData.append('title', this.title)
            formData.append('commentaire', this.commentaire)
            formData.append('image', this.file)

            console.log(FormData)

            //Connect to API et update datas (input/image)
            axios.post('http://localhost:3000/api/coms', formData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.token}`,
                }
            })
                .then(() => {
                    this.$router.push('/')
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

.form {
    width: 500px;
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
    margin-top: 10px;
    background-color: #FFF;
}

.sent:hover {
    background-color: #ffd7d7;
}

.sent::after {
    background-color: #FD2D01;
}

/* Media Queries */
@media (min-width: 501px) and (max-width: 576px) {
    .form {
        width: 450px;
        height: 400px;
    }

    form {
        font-size: 20px;
    }

    input {
        font-size: 20px;
    }

    textarea {
        font-size: 20px;
    }

    .sent {
        font-size: 16px;
    }
}

/* Media Queries */
@media (min-width: 341px) and (max-width: 500px) {
    .form {
        width: 300px;
        height: 320px;
    }

    h1 {
        text-align: center;
        font-size: 25px;
    }

    form {
        font-size: 16px;
    }

    input {
        font-size: 16px;
    }

    textarea {
        font-size: 16px;
    }

    .sent {
        margin-top: 0;
        font-size: 15px;
    }
}

/* Media Queries */
@media (max-width: 340px) {
    .form {
        width: 250px;
        height: 300px;
    }

    h1 {
        text-align: center;
        font-size: 20px;
    }

    form {
        font-size: 14px;
    }

    input {
        font-size: 14px;
    }

    textarea {
        font-size: 14px;
    }

    .sent {
        margin-top: 0;
        font-size: 14px;
    }
}
</style>
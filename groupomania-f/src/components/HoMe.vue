<template>
    <div className='container'>
        <div className='comments'>
            <h1>Commentaires</h1>
<div>









    
</div>
        </div>
    </div>
</template>

<script>
// import axios from "axios";

// export default {
//     name: 'ComMent',

//     data() {
//         return {
//             title: '',
//             commentaire: '',
//             imageUrl: '',
//         }
//     },

//     methods: {
//         handleFileUpload(event) {
//             this.file = event.target.files[0];
//         },

//         comment() {
//             const formData = new FormData()

//             formData.append('title', this.title)
//             formData.append('commentaire', this.commentaire)
//             formData.append('image', this.file)

//             console.log(FormData)

//             //Connection a l'API et envoi des datas (input)
//             axios.post('http://localhost:3000/api/coms', formData, {
//                 headers: {
//                     'Authorization': `Bearer ${sessionStorage.token}`,
//                 }
//             })
//         }

//     }

// }


</script>

<style scoped>
/* .container {
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
} */
</style>
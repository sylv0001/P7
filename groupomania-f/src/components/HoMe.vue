<template>
  <div class="container">
    <h1>Commentaires</h1>
    <div class="commentaires" v-for="(com, index) of coms" :key="index">

      <div class="pseudo" v-text="com.userId.name">
      </div>
      <div class="title" v-text="com.title">
      </div>
      <div class="image">
        <modale :image-url="com.imageUrl" :revele="com.revele" @toggle-modale="com.revele = false"></modale>
        <img class="photo" :src="com.imageUrl" alt="image du commentaire" @click="com.revele = true">
      </div>
      <div class="commentaire" v-text="com.commentaire">
      </div>
      <div class="like">
        <span @click="like(com._id)"><i class="fa fa-thumbs-up fa-xl" aria-hidden="true"></i></span>
        <p>{{ com.likes }}</p>
      </div>
      <div class="dislike">
        <span @click="dislike(com._id)"><i class="fa fa-thumbs-down fa-xl" aria-hidden="true"></i></span>
        <p>{{ com.dislikes }}</p>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import axios from "axios";
import Modale from "./Modale";

export default {
  name: 'HoMe',

  data() {

    return {
      coms: [],
      imageUrl: ''
    }
  },

  created() {
    axios.get('http://localhost:3000/api/coms', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`,
      }
    })
      .then(response => (
        this.coms = response.data,
                this.coms.forEach(com => {
          com.revele = false
          this.id = com._id
          console.log(com.userId._id)
        })
      ))

      .catch(error => console.log(error))
  },

  components: {
    modale: Modale
  },

  methods: {
    //like to like
    //ANGULAR : { userId: this.auth.getUserId(), like: like ? 1 : 0 }
    like(id) {
      axios.post('http://localhost:3000/api/coms/' + id + '/like', { userId: sessionStorage.userId, like: 1 }, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        }
      })
      //.then(()=>window.location.reload())
      //Update value of likes
    .then(()=>axios.get('http://localhost:3000/api/coms', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`,
      }
    })
    .then(response => (
        this.coms = response.data,
        this.coms.forEach(com => {
          com.revele = false
          this.id = com._id
        })
      ))
      .catch(error => console.log(error))
    )
    },

    //Dislike to dislike
    dislike(id) {
      axios.post('http://localhost:3000/api/coms/' + id + '/like', { userId: sessionStorage.userId, like: -1 }, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        }
      })
      //.then(()=>window.location.reload())
      //Update value of dislikes
      .then(()=>axios.get('http://localhost:3000/api/coms', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`,
      }
    })
    .then(response => (
        this.coms = response.data,
        this.coms.forEach(com => {
          com.revele = false
          this.id = com._id
        })
      ))
      .catch(error => console.log(error))
    )     
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 1500px;
  overflow-y: auto;
}

h1 {
  text-align: center;
}

.commentaires {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.pseudo,
.title,
.image,
.commentaire,
.like,
.dislike {
  border: 1px solid #4E5166;
  text-align: center;
}

.pseudo {
  width: 10%;
  font-size: 20px;
  padding-top: 10px;
}

.title {
  width: 10%;
  height: 100px;
  font-size: 20px;
  padding: 10px;
  overflow-y: auto;
  hyphens: auto;
}

.image {
  width: 15%;
}

.image>img {
  width: 100px;
  height: 75px;
  object-fit: contain;
  padding-top: 10px;
  padding-bottom: 10px;
}

.image>img:hover {
  cursor: zoom-in;
}

div>img {
  cursor: zoom-out;
}

.commentaire {
  width: 50%;
  height: 100px;
  font-size: 20px;
  padding: 10px;
  overflow-y: auto;
}

.like,
.dislike {
  width: 7.5%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

}

.fa-xl:hover {
  cursor: pointer;
}
</style>
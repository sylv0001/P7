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
        <div class="blocImg" v-if="com.imageUrl"><img class="photo" :src="com.imageUrl" alt="image du commentaire"
            @click="com.revele = true">
        </div>
      </div>
      <div class="commentaire" v-text="com.commentaire">
      </div>
      <div class="like">
        <span @click="like(com._id)"><i class="fa fa-thumbs-up fa-xl" aria-hidden="true"></i></span>
        <!--v-show="!com.usersDisliked.includes(com.userId._id)"-->
        <p>{{ com.likes }}</p>
      </div>
      <div class="dislike">
        <span @click="dislike(com._id)"><i class="fa fa-thumbs-down fa-xl" aria-hidden="true"></i></span>
        <p>{{ com.dislikes }}</p>
      </div>
      <div class="DeleteAndModify">
        <button @click="del" type="button">Supprimer</button>
        <button @click="modify" type="button">Modifier</button>
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
      imageUrl: '',
      //user: false
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
        console.log(response.data),
        this.coms.forEach(com => {
          com.revele = false
          this.id = com._id
          this.userLik = com.usersLiked.includes(sessionStorage.userId)
          this.userDislik = com.usersDisliked.includes(sessionStorage.userId)
          console.log(com.userId._id)
        })
      ))
      .catch(error => console.log(error))
  },

  components: {
    modale: Modale
  },

  methods: {
    //like to like or reset like
    like(id) {
      let likeObject ={}
      //If the user is not in the usersLikes array -> + like
      if(!this.userLik) {likeObject = { userId: sessionStorage.userId, like: 1 }}
      //If the user is in the usersLikes array -> reset like
      else { likeObject = { userId: sessionStorage.userId, like: 0 } }
      axios.post('http://localhost:3000/api/coms/' + id + '/like', likeObject, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        }
      })
        //Update number of likes in real time
        .then(response => {
          this.coms.forEach(com => {
            if (id === com._id) {
              { com.likes = response.data.numLikes }
            }
          })
        }
        )
    },

    //Dislike to dislike or reset dislike
    dislike(id) {
      let dislikeObject ={}
      //If the user is not in the usersDislikes array -> + dislike
      if(!this.userDislik) {dislikeObject = { userId: sessionStorage.userId, like: -1 }}
      //If the user is in the usersDislikes array -> reset dislike
      else { dislikeObject = { userId: sessionStorage.userId, like: 0 } }
      axios.post('http://localhost:3000/api/coms/' + id + '/like', dislikeObject, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        }
      })
        //Update number of dislikes in real time
        .then(response => {
          this.coms.forEach(com => {
            if (id === com._id) {
              com.dislikes = response.data.numDislikes
            }
          })
        }
        )
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
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
  width: 8%;
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
  width: 10%;
}

.blocImg {
  width: 100%;
}

.blocImg>img {
  width: 100px;
  height: 75px;
  object-fit: contain;
  padding-top: 10px;
  padding-bottom: 10px;
}

.blocImg>img:hover {
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

.DeleteAndModify {
  width: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid #4E5166;
}
</style>
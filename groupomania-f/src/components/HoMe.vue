<!-- **********Home => Screen all comments********** -->
<template>
  <div class="container">
    <h1>Commentaires</h1>
    <div class="commentaires" v-for="(com, index) of coms.slice().reverse()" :key="index">

      <div class="pseudo" v-text="com.user.name">
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
        <span @click="like(com._id)"><i class="fa-regular fa-thumbs-up fa-xl" aria-hidden="true"></i></span>
        <p>{{ com.likes }}</p>
      </div>
      <div class="dislike">
        <span @click="dislike(com._id)"><i class="fa-regular fa-thumbs-down fa-xl" aria-hidden="true"></i></span>
        <p>{{ com.dislikes }}</p>
      </div>
      <div class="DeleteAndModify">
        <button v-if="isAdmin === 'true' || isCreator === com.userId" @click="del(com._id)"
          type="button">Supprimer</button>
        <img src='../assets/images/trash.svg' v-if="isAdmin === 'true' || isCreator === com.userId"
          @click="del(com._id)" />
        <modifymodale :id="com._id" :title="com.title" :commentaire="com.commentaire" :imageUrl="com.imageUrl"
          :reveleModify="com.modify" @close-modale="com.modify = false"
          @modif="(newValues) => { modifyCom(newValues, com) }" @delete="() => { delImage(com) }"></modifymodale>
        <button v-if="isAdmin === 'true' || isCreator === com.userId" @click="com.modify = true"
          type="button">Modifier</button>
        <img src='../assets/images/modif.svg' v-if="isAdmin === 'true' || isCreator === com.userId"
          @click="com.modify = true" />
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import axios from "axios";
import Modale from "./Modale";
import ModifyModale from "./ModifyModale";

export default {
  name: 'HoMe',

  data() {
    return {
      coms: [],
      imageUrl: '',
      title: '',
      commentaire: '',
      id: '',
      user: '',
    }
  },

  //Function launched at page start to get all comments
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
          com.modify = false
          if (com.user === null) { com.user = { name: "Compte supprimé" } }
          this.id = com._id
          this.userLik = com.usersLiked.includes(sessionStorage.userId)
          this.userDislik = com.usersDisliked.includes(sessionStorage.userId)
        })
      ))
      .catch(error => console.log(error))
  },

  //Childs components
  components: {
    modale: Modale,
    modifymodale: ModifyModale
  },

  // Watch if items of array coms (comments) change to update them
  watch: {
    coms(newValue, oldValue) {
      this.coms = newValue
      console.log(oldValue)
    }
  },

  methods: {
    //like to like or reset like
    like(id) {
      //If the user is not in the usersLikes array -> + like
      if (!this.userLik) { this.sendLike(id, { userId: sessionStorage.userId, like: 1 }, true) }
      //If the user is in the usersLikes array -> reset like
      else { this.sendLike(id, { userId: sessionStorage.userId, like: 0 }, true) }
    },
    //Dislike to dislike or reset dislike
    dislike(id) {
      //If the user is not in the usersDislikes array -> + dislike
      if (!this.userDislik) { this.sendLike(id, { userId: sessionStorage.userId, like: -1 }, false) }
      //If the user is in the usersDislikes array -> reset dislike
      else { this.sendLike(id, { userId: sessionStorage.userId, like: 0 }, false) }
    },
    //request to like, dislike or delete this one
    sendLike(id, object, isLike) {
      axios.post('http://localhost:3000/api/coms/' + id + '/like', object, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        }
      })
        //Update number of dislikes in real time
        .then(response => {
          this.coms.forEach(com => {
            if (id === com._id) {
              if (isLike) {
                { com.likes = response.data.numLikes }
              } else {
                com.dislikes = response.data.numDislikes
              }
            }
          })
        }
        )
    },

    //Delete Comment
    del(id) {
      axios.delete('http://localhost:3000/api/coms/' + id, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.token}`,
        }
      })
        .then((response) => {
          axios.get('http://localhost:3000/api/coms', {
            headers: {
              'Authorization': `Bearer ${sessionStorage.token}`,
            }
          })
            .then(response => (
              this.coms = response.data
            ))
        })
    },

    //Modify Comment
    modifyCom(comModif, com) {
      com.title = comModif.title
      com.commentaire = comModif.commentaire
      com.imageUrl = comModif.imageUrl
    },

    //delete image
    delImage(com) {
      com.imageUrl = ''
    }
  },

  //Create variable if user's connected and if is Admin
  computed: {
    isAdmin() {
      return sessionStorage.getItem("isAdmin")
    },
    isCreator() {
      return sessionStorage.getItem("userId")
    }
  },

  //Redirect route if user isn't connected
  mounted() {
    if (this.isCreator === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  padding-bottom: 80px;
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
  overflow-y: auto;
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
  width: 12%;
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
  width: 53%;
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
}

.fa-xl:hover {
  cursor: pointer;
}

.DeleteAndModify {
  width: 7%;
  min-width: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid #4E5166;
}

.DeleteAndModify img {
  display: none;
}

/* Media Queries */
@media (max-width: 1200px) {
  .commentaire {
    width: 49%;
  }

  .DeleteAndModify {
    width: 11%;
  }

  .like,
  .dislike {
    width: 8%;
  }

  .image {
    width: 14%;
  }
}

/* Media Queries */
@media (max-width: 1000px) {
  .blocImg>img {
    width: 80%;
  }

  .pseudo,
  .title,
  .commentaire {
    font-size: 16px;
  }

  button {
    font-size: 11px;
  }
}

/* Media Queries */
@media (max-width: 800px) {
  .title {
    width: 12%;
    padding-left: 0;
    padding-right: 0;
  }

  .commentaire {
    width: 46%;
  }

  .DeleteAndModify {
    width: 12%;
    gap: 20px;
    padding-top: 5px;
  }
}

/* Media Queries */
@media (max-width: 700px) {
  .commentaire {
    width: 45%;
  }

  .pseudo,
  .title {
    width: 13%;
  }

  .DeleteAndModify {
    width: 14%;
  }
}

/* Media Queries */
@media (max-width: 630px) {

  .pseudo,
  .title,
  .commentaire {
    font-size: 14px;
  }

  .commentaire {
    width: 43%;
  }

  .pseudo,
  .title {
    width: 13%;
  }

  .like,
  .dislike {
    width: 9.5%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .DeleteAndModify {
    width: 10%;
    padding-top: 8px;
  }

  .DeleteAndModify>button {
    display: none;
  }

  .DeleteAndModify img {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}

/* Media Queries */
@media (max-width: 450px) {

  .pseudo,
  .title {
    width: 12%;
  }

  .commentaire {
    width: 45%;
  }
}
</style>
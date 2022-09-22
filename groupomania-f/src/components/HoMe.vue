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
        <button @click="del(com._id)" type="button">Supprimer</button>
        <modifymodale :id="com._id" :title="com.title" :commentaire="com.commentaire" :imageUrl="com.imageUrl" :reveleModify="com.modify" @close-modale="com.modify = false"></modifymodale>
        <button @click="com.modify = true" type="button">Modifier</button>
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
          com.modify = false
          this.id = com._id
          this.userLik = com.usersLiked.includes(sessionStorage.userId)
          this.userDislik = com.usersDisliked.includes(sessionStorage.userId)
        })
      ))
      .catch(error => console.log(error))
  },

  components: {
    modale: Modale,
    modifymodale: ModifyModale
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
    sendLike(id, object, isLike) {
      console.log(object)
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
    
    //Delete Com
    del(id) {
      if (!this.coms) { //if no comment
        return
      }
      this.coms.forEach(com => {
        if (sessionStorage.userId === com.userId._id || sessionStorage.isAdmin){
          axios.delete('http://localhost:3000/api/coms/' + id, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.token}`,
            }
          })
            .then((response) => {
              this.coms = response.data
            })       
        }
        else {
          return
        }
      }
      )
    },
    //Modify comment 
    //  modify(id) {
      
    //   this.coms.forEach(com => {
    //     if (sessionStorage.userId === com.userId._id || sessionStorage.isAdmin) {
    //       localStorage.setItem("title", com.title),
    //       localStorage.setItem("commentaire", com.commentaire),
    //       localStorage.setItem("imageUrl", com.imageUrl),
    //       location = ('http://localhost:3001/modify/')
    //       return id
    //       }
    //     else {
    //       return
    //       }
    //     })
    //   }
    //*************************************************************************** */
        // if (sessionStorage.userId !== com.userId._id || sessionStorage.isAdmin === 'false') { //if user isn't creator of post
        //   return
        // }
        // else if (sessionStorage.userId === com.userId._id || sessionStorage.isAdmin){
        //   localStorage.setItem("title", com.title)
        //   localStorage.setItem("commentaire", com.commentaire)
        //   localStorage.setItem("imageUrl", com.imageUrl)
        //   location = ('http://localhost:3001/modify/')
        //   return id
        // }
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
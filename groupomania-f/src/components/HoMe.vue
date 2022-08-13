<template>
  <div id="app" class="container">

    <h1>Commentaires</h1>
    <div class="commentaires" v-for="(com, index) in coms" :key="index">

      <div class="pseudo" v-text="com.userId.name">
      </div>
      <div class="title" v-text="com.title">
      </div>
      <div class="image">
        <img :src="coms[index].imageUrl" alt="image du commentaire" @click.stop="displayModal = true">
      </div>

                <div>
                <img :src="com.imageUrl" alt="image du commentaire" id="modal" v-if="displayModal">
                </div>
      
      <div class="commentaire" v-text="com.commentaire">
      </div>
      <div class="like">
        <i class="fa fa-thumbs-up fa-xl" aria-hidden="true" @click="like"></i>
      </div>
      <div class="dislike">
        <i class="fa fa-thumbs-down fa-xl" aria-hidden="true" @click="dislike"></i>
      </div>
    </div>
  </div>

</template>

<script>
//import axios from "axios";
import axios from "axios";


export default {
  name: 'HoMe',

  data() {

    return {
      coms: [],
      displayModal: false
    }
  },

  created() {
    axios.get('http://localhost:3000/api/coms', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`,
      }
    })
      .then(response => (
        //response.data.forEach(item => {
        // this.pseudo = item.userId.name;
        // this.title = item.title;
        //this.image = item.imageUrl;
        // this.commentaire = item.commentaire;
        //console.log(response.data),
        //})
        this.coms = response.data
      ))

      .catch(error => console.log(error))
  },

  methods: {
    onClickOutsode(e) {
      if (e.target.localName !== "button") {
        this.displayModal = false;
      }
    },
  },

  mounted() {
    window.addEventListener("click", this.onClickOutsode);
  },

}
</script>

<style scoped>
.container {
  width: 100%;
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
  font-size: 20px;
  padding-top: 10px;
  overflow-y: auto;
}

.image {
  width: 15%;
}

.image>img {
  width: 100px;
  object-fit: contain;
  padding-top: 10px;
  padding-bottom: 10px;
 }
.image>img:hover {
  cursor:zoom-in;
}
div>img {
  cursor:zoom-out;
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
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>

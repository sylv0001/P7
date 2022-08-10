<template>
  <div id="app" class="container">

    <h1>Commentaires</h1>
    <div class="commentaires">

      <div class="pseudo">
      </div>
      <div class="title">
      </div>
      <div class="image">
      </div>
      <div class="commentaire">
      </div>

    </div>
  </div>

</template>

<script>
//import axios from "axios";
import axios from "axios";

export default {

  name: 'app',

  created() {
    axios.get('http://localhost:3000/api/coms', {
      headers: {
        'Authorization': `Bearer ${sessionStorage.token}`,
      }
    })
      .then(response => (
        response.data.forEach(item => {
          console.log(item.userId.name)
          console.log(item.title)
          console.log(item.commentaire)
        })

      ))

      .catch(error => console.log(error))

  }
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
.commentaire {
  border: 1px solid #4E5166;
  text-align: center;
}

.pseudo {
  width: 10%;
}

.title {
  width: 20%;
}

.image {
  width: 20%;
}

.commentaire {
  width: 50%;
}
</style>

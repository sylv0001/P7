<template>
  <div id="app" class="container">

    <h1>Commentaires</h1>
    <table>
      <thead>
        <!-- En-tête du tableau -->
        <tr>
          <th>Nom</th>
          <th>Titre</th>
          <th>Image</th>
          <th>Commentaire</th>
        </tr>
      </thead>
      <tbody>
        <!-- Corps du tableau (3 colonnes (td) et 1 ligne (tr))-->
        <tr>
          <td>{{ user }}</td>
          <td>Mon titre</td>
          <td>Img</td>
          <td>1er Com</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import axios from "axios";
import axios from "axios";
const user = sessionStorage.getItem('user')

export default {
 
 name: 'app',

  data() {
    return {
      user
   }
  },

  method() {
        axios.get('http://localhost:3000/api/coms')
      .then(response => (this.all_users = response.data))
      .catch(error => console.log(error))
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

table {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 30px;
  border-collapse: collapse;
  /* Les bordures du tableau seront collées (plus joli) */
}

td,
th {
  border: 1px solid black;
  height: auto;
}
</style>
<!-- **********Delete page to import all necessary components********** -->
<template>
  <NavBar></NavBar>
  <LoGo></LoGo>
  <Delete></Delete>
  <FooTer></FooTer>
  <router-view></router-view>
</template>
  
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import LoGo from '@/components/LoGo.vue'
import Delete from '@/components/Delete.vue'
import FooTer from '@/components/FooTer.vue'

export default {
  components: {
    NavBar,
    LoGo,
    Delete,
    FooTer
  }
}
</script>
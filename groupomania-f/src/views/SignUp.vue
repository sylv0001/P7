<template>
  <NavBar></NavBar>
  <LoGo></LoGo>
  <SignUp></SignUp>
  <FooTer></FooTer>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import LoGo from '@/components/LoGo'
import SignUp from '@/components/SignUp'
import FooTer from '@/components/FooTer.vue'

export default {
    components: {
    NavBar,
    LoGo,
    SignUp,
    FooTer
  }
}
</script>
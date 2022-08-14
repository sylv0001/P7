<template>
  <NavBar></NavBar>

  <HoMe></HoMe>
  <FooTer></FooTer>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import HoMe from '@/components/HoMe'
import FooTer from '@/components/FooTer.vue'

export default {
  components: {
    NavBar,
    HoMe,
    FooTer
  }
}
</script>
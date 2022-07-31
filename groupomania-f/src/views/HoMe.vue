<template>
  <NavBar></NavBar>
  <LoGo></LoGo>
  <ComMent></ComMent>
  <FooTer></FooTer>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import LoGo from '@/components/LoGo'
import ComMent from '@/components/ComMent'
import FooTer from '@/components/FooTer.vue'

export default {
  components: {
    NavBar,
    LoGo,
    ComMent,
    FooTer
  }
}
</script>
<template>
    <div>
        <img :src="coms[index].imageUrl" />
    </div>
</template>

<script>

export default {
    name: "displayModal",

    mountd() {
        this.$root.$options("img", (msg) => {
            coms[index].imageUrl
        })
    },
}
</script>

<style scoped>
</style>
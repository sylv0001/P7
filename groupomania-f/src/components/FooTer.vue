<template>
    <footer>
        <div className="copyright">
            <p>Create by Sylvain Galy &#169;</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooTer'
}
</script>

<style scoped>
footer {
    width: 100%;
    height: 5%;
    bottom: 0;
    position: fixed;
    background: #ffd7d7;
    border-top: 4px solid rgba(0, 0, 0, .2);
}

p {
    margin-bottom: 10px;
}
.copyright {
    margin-top: 20px;
    text-align: center;
}
</style>
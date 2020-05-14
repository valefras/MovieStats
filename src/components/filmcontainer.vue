<template>
    <div class="bigcontainer">
        <div class="container">
            <div class="title">
                <h3>{{ decade.decade }}s</h3>
                <p>{{ decade.films.length }} films</p>
                <p>average: {{ decade.average }}/5</p>
            </div>
            <div v-for="index in 16" :key="index">
                <img
                    :src="decade.films[index - 1][1]"
                    class="poster"
                    @mouseover="hover = true"
                    @mouseleave="hover = false"
                    :class="{ hover: hover }"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'container',
    props: {
        decade: Object,
    },
    data() {
        return {
            hover: false,
        }
    },
    created() {
        this.decade.films.sort(function(a, b) {
            return b[2] - a[2]
        })
    },
}
</script>

<style>
.container {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 20% 10% 10% 10% 10% 10% 10% 10% 10%;
    max-width: 65%;
}
.bigcontainer {
    margin: 25px 0 0 0;
}
.poster {
    height: 125px;
    margin: 5px 0 5px 0;
    transition: height 0.5s;
}
.poster.hover {
    height: 175px;
}
.title {
    grid-row-start: 1;
    grid-row-end: span 2;
}
</style>

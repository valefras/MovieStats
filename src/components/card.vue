<template>
    <div>
        <img
            :src="film[1]"
            class="poster"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :class="{ hover: hover }"
        />
    </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        film: Array,
    },
    data() {
        return {
            hover: false,
        }
    },
}
</script>

<style>
.poster {
    height: 130px;
    margin: 5px 0 5px 0;
    transition: height 0.5s;
}
.poster.hover {
    height: 165px;
}
</style>

<template>
    <div>
        <img
            :src="film[1]"
            class="poster"
            @mouseover="hover = true"
            @mouseout="hover = false"
            :class="{ hover: hover }"
            v-tippy="{ followCursor: true, delay: [300, 0] }"
            :content="tooltipContent"
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
            tooltipContent: '',
        }
    },
    created() {
        this.tooltipContent = this.film[0] + ' - Rating: ' + this.film[2] / 2
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

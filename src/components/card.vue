<template>
    <a
        :href="link"
        target="_blank"
        @mouseover="hover = true"
        @mouseout="hover = false"
    >
        <div class="wrap" :class="{ hover: hover }">
            <img :src="film[1]" class="poster" />
            <transition name="fade">
                <p class="caption" v-if="hover">
                    {{ film[0] }}<br />
                    Rating: {{ this.film[2] / 2 }}/5
                </p>
            </transition>
        </div>
    </a>
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
            link: 'https://www.themoviedb.org/movie/' + this.film[3],
        }
    },
    created() {
        this.tooltipContent = this.film[0] + ' - Rating: ' + this.film[2] / 2
    },
}
</script>

<style>
.wrap {
    position: relative;
    height: 150px;
    margin: 5px 0 5px 0;
    transition: height 0.5s;
}
.poster {
    height: 100%;
}
/*.wrap.hover {
    height: 185px;
}*/

.caption {
    margin: auto 0;
    font-weight: 300;
    position: absolute;
    bottom: 0px;
    color: #f0f5f9;
    background: rgb(0, 0, 0); /* fallback color */
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

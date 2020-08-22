<template>
    <router-link
        :to="{
            name: 'Film',
            params: { id: film.id },
        }"
    >
        <div @mouseover="hover = true" @mouseleave="hover = false">
            <div class="wrap" :class="{ hover: hover }">
                <img :src="film.poster" class="poster" />
                <transition name="fade">
                    <p class="caption" v-if="hover">
                        {{ film.title }}<br />
                        ({{ film.date }})
                    </p>
                </transition>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'card',
    props: {
        film: Object,
    },
    data() {
        return {
            hover: false,
            // link: 'https://www.themoviedb.org/movie/' + this.film.id,
        }
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
    display: block;
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

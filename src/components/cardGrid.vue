<template>
    <div>
        <input type="checkbox" id="checkbox" v-model="show" />
        <label for="checkbox">Show ratings</label>
        <div class="box">
            <div v-for="index in current.length" :key="index" style="margin-bottom: 4px">
                <card :film="current[index - 1]" />
                <transition name="fade">
                    <star-rating
                        :rating="current[index - 1].rating"
                        :increment="0.5"
                        :read-only="true"
                        :star-size="16"
                        :show-rating="false"
                        :border-width="2"
                        :max-rating="5"
                        active-color="#949494"
                        inactive-color="#000000"
                        :padding="1"
                        border-color="#949494"
                        style="margin-bottom: 6px;"
                        :inline="true"
                        v-show="show"
                    />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import card from '../components/card.vue'
export default {
    name: 'cardGrid',
    props: { current: Array },
    components: {
        StarRating,
        card,
    },
    data() {
        return {
            show: false,
        }
    },
}
</script>

<style>
.box {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
@media screen and (max-width: 800px) {
    .box {
        margin: auto;
        display: grid;
        align-items: center;
        grid-template-columns: 25% 25% 25% 25%;
    }
}
@media (min-width: 800px) and (max-width: 1000px) {
    .box {
        margin: auto;
        display: grid;
        align-items: center;
        grid-template-columns: 20% 20% 20% 20% 20%;
    }
}
/* @media (min-width: 1001px) and (max-width: 1300px) {
    .box {
        margin: auto;
        display: grid;
        align-items: center;
        grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
    }
}
@media screen and (min-width: 1200px) {
} */
</style>

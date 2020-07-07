<template>
    <div>
        <h1>{{ decade.decade }}s</h1>
        <p>{{ decade.films.length }} films</p>
        <input type="checkbox" id="checkbox" v-model="show" />
        <label for="checkbox">Show ratings</label>
        <div class="box">
            <div v-for="index in current.length" :key="index" style="margin-bottom: 4px">
                <cardDecade :film="current[index - 1]" />
                <transition name="fade">
                    <star-rating
                        :rating="current[index - 1][2]"
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
        <div v-if="decade.films.length > pageNum">
            <router-link
                :to="{
                    name: 'Decade',
                    path: '/:year/:page',
                    params: { page: page + 1 },
                }"
            >
                <button class="btn" @click="page--" v-if="decade.films.length > pageNum && page >= 1">
                    Prev
                </button>
            </router-link>
            <router-link
                :to="{
                    name: 'Decade',
                    path: '/:year/:page',
                    params: { page: page + 1 },
                }"
            >
                <button class="btn" @click="page++" v-if="decade.films.length > pageNum && page < pageNum">
                    Next
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import cardDecade from '../components/cardDecade.vue'
export default {
    name: 'Decade',
    props: {
        decade: Object,
    },
    data() {
        return {
            show: false,
            current: [],
            page: 0,
            pageNum: 1,
            numPerPage: 40,
        }
    },
    components: {
        cardDecade,
        StarRating,
    },
    created() {
        this.decade.films.sort((a, b) => (a[4] > b[4] ? -1 : 1))

        if (this.decade.films.length > this.pageNum) {
            this.currentPage()
        }
        this.pageNum = Math.ceil(this.decade.films.length / this.numPerPage) - 1
    },
    methods: {
        currentPage() {
            for (
                let i = this.page * this.numPerPage;
                i < this.page * this.numPerPage + this.numPerPage;
                i++
            ) {
                if (this.decade.films[i]) {
                    this.current.push(this.decade.films[i])
                }
            }
        },
    },
    watch: {
        page: function() {
            this.current = []
            this.currentPage()
        },
    },
}
</script>

<style>
.box {
    margin: auto;
    display: grid;
    align-items: center;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
    max-width: 80%;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>

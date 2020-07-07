<template>
    <div class="cnt">
        <router-link to="/stats">
            <button class="btn">
                Home
            </button>
        </router-link>
        <h1>{{ decade.decade }}s</h1>
        <p>{{ decade.films.length }} films</p>
        <cardGrid :current="current" />
        <div v-if="decade.films.length > pageNum" class="pagination-nav">
            <router-link
                :to="{
                    name: 'Decade',
                    path: '/:year/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page--"
                    v-if="decade.films.length > pageNum && page >= 1"
                    style="float: left"
                >
                    Prev
                </button>
            </router-link>
            <span></span>
            <router-link
                :to="{
                    name: 'Decade',
                    path: '/:year/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page++"
                    v-if="decade.films.length > pageNum && page < pageNum"
                    style="float: right"
                >
                    Next
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import cardGrid from '../components/cardGrid'
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
        cardGrid,
    },
    created() {
        this.decade.films.sort((a, b) => (a.rating > b.rating ? -1 : 1))

        if (this.decade.films.length > this.pageNum) {
            this.currentPage()
        }
        this.pageNum = Math.ceil(this.decade.films.length / this.numPerPage) - 1
    },
    methods: {
        currentPage() {
            for (let i = this.page * this.numPerPage; i < this.page * this.numPerPage + this.numPerPage; i++) {
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

<style></style>

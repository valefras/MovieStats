<template>
    <div class="cnt">
        <router-link to="/stats">
            <button class="btn">
                Home
            </button>
        </router-link>
        <h1>{{ person.name }}</h1>
        <p>{{ person.films.length }} films</p>
        <cardGrid :current="current" />
        <div v-if="person.films.length > pageNum" class="pagination-nav">
            <router-link
                :to="{
                    name: 'Person',
                    path: '/:name/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page--"
                    v-if="person.films.length > pageNum && page >= 1"
                    style="float: left"
                >
                    Prev
                </button>
            </router-link>
            <span></span>
            <router-link
                :to="{
                    name: 'Person',
                    path: '/:name/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page++"
                    v-if="person.films.length > pageNum && page < pageNum"
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
    name: 'Person',
    props: { person: Object },
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
        this.person.films.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        this.pageNum = Math.ceil(this.person.films.length / this.numPerPage) - 1
        if (this.person.films.length > this.numPerPage) {
            this.currentPage()
        } else {
            this.current = this.person.films
        }
    },
    methods: {
        currentPage() {
            for (let i = this.page * this.numPerPage; i < this.page * this.numPerPage + this.numPerPage; i++) {
                if (this.person.films[i]) {
                    this.current.push(this.person.films[i])
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

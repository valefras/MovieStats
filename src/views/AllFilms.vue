<template>
    <div class="cnt">
        <router-link to="/stats">
            <button class="btn">
                Home
            </button>
        </router-link>
        <h1>All films</h1>
        <cardGrid :current="current" />
        <div v-if="filmdata.length > pageNum" class="pagination-nav">
            <router-link
                :to="{
                    name: 'All',
                    path: 'all/:page',
                    params: { page: page + 1 },
                }"
            >
                <button class="btn" @click="page--" v-if="filmdata.length > pageNum && page >= 1" style="float: left">
                    Previous
                </button>
            </router-link>
            <span></span>
            <router-link
                :to="{
                    name: 'All',
                    path: 'all/:page',
                    params: { page: page + 1 },
                }"
            >
                <button
                    class="btn"
                    @click="page++"
                    v-if="filmdata.length > pageNum && page < pageNum"
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
    /* props: {
        filmdata: Array,
    },*/
    components: {
        cardGrid,
    },
    data() {
        return {
            filmdata: JSON.parse(localStorage.getItem('filmdata')),
            selected: '',
            current: [],
            page: 0,
            pageNum: 1,
            numPerPage: 40,
        }
    },
    created() {
        this.filmdata.sort((a, b) => (a.date > b.date ? -1 : 1))
        this.pageNum = Math.ceil(this.filmdata.length / this.numPerPage) - 1
        if (this.filmdata.length > this.numPerPage) {
            this.currentPage()
        }
    },
    methods: {
        currentPage() {
            for (let i = this.page * this.numPerPage; i < this.page * this.numPerPage + this.numPerPage; i++) {
                if (this.filmdata[i]) {
                    this.current.push(this.filmdata[i])
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

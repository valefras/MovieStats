<template>
    <div>
        <div style="height: 49px; position: absolute; z-index: 1">
            <router-link to="/stats">
                <button class="btn" style="float:left">
                    Home
                </button>
            </router-link>
        </div>
        <div :style="{ 'background-image': 'url(' + data.backdrop + ')' }" id="backdrop"></div>
        <div id="grid">
            <div>
                <h1 style="font-size: 3em; display: inline ">{{ data.title }}&nbsp;</h1>
                <router-link
                    :to="{
                        name: 'All',
                        params: { mode: data.date, page: 1 },
                    }"
                >
                    <p style="font-size: 1.3em;  display: inline">{{ data.date }}</p>
                </router-link>
                <p style="font-weight: lighter;  display: inline">&nbsp;directed by&nbsp;</p>
                <div v-for="n in dir.length" :key="dir[n - 1].credit_id" style="display: inline">
                    <router-link
                        :to="{
                            name: 'All',
                            params: { mode: dir[n - 1].name + ' (Director)', page: 1 },
                        }"
                    >
                        <p style="font-size: 1.3em; display: inline">{{ dir[n - 1].name }}</p>
                        <span v-if="n < dir.length">,&nbsp;</span>
                    </router-link>
                </div>
            </div>
            <p style="font-style: italic">{{ data.tagline.toUpperCase() }}</p>
            <div id="info">
                <div>
                    <h4>Crew</h4>
                    <div v-for="n in data.crew.length" :key="data.crew[n - 1].credit_id">
                        <p style="font-weight: lighter; display: inline">{{ data.crew[n - 1].job }}&nbsp;</p>
                        <router-link
                            :to="{
                                name: 'All',
                                params: {
                                    mode: data.crew[n - 1].name + ' (' + data.crew[n - 1].job + ')',
                                    page: 1,
                                },
                            }"
                        >
                            <p style="display: inline">{{ data.crew[n - 1].name }}</p>
                        </router-link>
                    </div>
                </div>

                <div>
                    <h4>Cast</h4>
                    <div v-for="n in data.cast.length" :key="data.cast[n - 1].credit_id">
                        <router-link
                            :to="{
                                name: 'All',
                                params: { mode: data.cast[n - 1].name + ' (Cast)', page: 1 },
                            }"
                        >
                            <p style="display: inline">{{ data.cast[n - 1].name }}</p>
                        </router-link>
                    </div>
                </div>
                <div>
                    <h4>Genres</h4>
                    <div v-for="n in gn" :key="gn[n - 1]">
                        <router-link
                            :to="{
                                name: 'All',
                                params: { mode: n, page: 1 },
                            }"
                        >
                            <p style="display: inline">{{ n }}</p>
                        </router-link>
                    </div>
                    <h4 style="margin-top: 32px">Runtime</h4>
                    <p>{{ data.runtime }} minutes</p>
                </div>
            </div>
            <div style="grid-column-start: 2;   grid-row-start: 1; grid-row-end: span 3;">
                <img :src="data.poster" style="width: 100%" />
                <star-rating
                    :rating="data.rating"
                    :increment="0.5"
                    :read-only="true"
                    :star-size="42"
                    :show-rating="false"
                    :border-width="2"
                    :max-rating="5"
                    active-color="#f9ed69"
                    inactive-color="#000000"
                    :padding="2"
                    border-color="#949494"
                    style="margin-top: 12px;"
                    :inline="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
    name: 'Film',
    components: {
        StarRating,
    },
    props: {
        filmdata: Array,
        genres: Array,
    },
    data() {
        return {
            id: this.$route.params.id,
            //filmdata: JSON.parse(localStorage.getItem('filmdata')),
            //genres: JSON.parse(localStorage.getItem('genres')),
            data: null,
            gn: [],
            dir: [],
        }
    },
    created() {
        for (var i = 0; i < this.filmdata.length; i++) {
            if (this.id == this.filmdata[i].id) {
                this.data = this.filmdata[i]
                break
            }
        }

        for (let i = 0; i < this.data.genre_id.length; i++) {
            for (let x = 0; x < this.genres.length; x++) {
                if (this.data.genre_id[i] == this.genres[x].id) {
                    this.gn.push(this.genres[x].name)
                }
            }
        }

        for (let i = 0; i < this.data.crew.length; i++) {
            if (this.data.crew[i].job == 'Director') {
                this.dir.push(this.data.crew[i])
            }
        }
    },
}
</script>

<style scoped>
#grid {
    display: grid;
    grid-template-columns: 70% 20%;
    grid-template-rows: 22% 15% auto;
    align-items: center;
    z-index: 1;
    position: relative;
    margin-bottom: 50px;
}
#info {
    display: grid;
    grid-template-columns: 40% 30% 30%;
}
a p:hover {
    text-decoration: underline;
}
#backdrop {
    height: 450px;
    background-repeat: no-repeat;
    background-position: 50% 0%;
    box-shadow: 0 0 50px 50px #2d3234 inset;
    background-size: 100%;
    opacity: 0.4;
    margin-bottom: -150px;
    position: relative;
    z-index: 0;
}
</style>

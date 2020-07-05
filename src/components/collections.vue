<template>
    <div>
        <div v-for="coll in collections" :key="coll.title">
            <p>{{ coll.title }}, {{ coll.collection.name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'collections',
    props: {
        collections: Array,
    },
}
</script>

<style></style>

<template>
    <div id="pagination-container" v-if="totalPages > 1">
        <button 
            v-for="page in totalPages" 
            :key="page" 
            class="pagination-button"
            :class="{ active: page === currentPage }"
            @click="changePage(page)">
            {{ page }}
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['page-changed']);

function changePage(page) {
    if (page !== props.currentPage) {
        emit('page-changed', page);
    }
}
</script>

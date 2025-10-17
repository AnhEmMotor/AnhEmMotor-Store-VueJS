<template>
    <div class="mt-8 flex justify-center items-center space-x-1">
        <!-- Previous Page Button -->
        <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="pagination-btn prev-btn">
            &laquo;
        </button>

        <!-- Page Number Buttons -->
        <button 
            v-for="page in totalPages" 
            :key="page"
            @click="changePage(page)"
            :class="['pagination-btn', { 'active': page === currentPage }]">
            {{ page }}
        </button>
        
        <!-- Next Page Button -->
        <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="pagination-btn next-btn">
            &raquo;
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

const emit = defineEmits(['page-change']);

const changePage = (page) => {
    // Đảm bảo số trang hợp lệ trước khi gửi sự kiện
    if (page > 0 && page <= props.totalPages) {
        emit('page-change', page);
    }
};
</script>

<style scoped>
.pagination-btn {
    min-width: 40px;
    height: 40px;
    padding: 0 0.5rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #de0000;
    color: #de0000;
    background-color: #fff5f5;
}

.pagination-btn.active {
    background: linear-gradient(135deg, #de0000, #b30000);
    color: white;
    border-color: #de0000;
    font-weight: 600;
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f8f9fa;
}
</style>


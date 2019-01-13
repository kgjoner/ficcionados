<template>
    <footer class="footer">
        <span>© 2019 Ficcionados</span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #4d4d4d;
        color:rgba(255, 255, 255, 0.8);
        font-size: 0.8rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 10px;
    }
</style>

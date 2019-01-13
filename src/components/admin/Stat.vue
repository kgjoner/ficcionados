<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style(){
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>

    .stat {
        flex: 1;
        background-color:#fff;
        margin: 0px 20px 20px 0px;
        padding: 20px;
        border: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0px 1px 5px rgba(0,0,0,0.5);
        border-radius: 10px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .stat-icon{
        display: flex;
        align-items: center;
    }

    .stat-icon i{
        font-size: 3.5rem;
    }

    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
    }

    .stat-title {
        font-size: 1rem;
    }

    .stat-value{
        font-size: 2rem;
    }


</style>

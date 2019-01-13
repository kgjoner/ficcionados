<template>
    <div class="page-title">
        <div>
            <p>{{sub}}</p>
            <h1>{{main}}</h1>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        bottom: 0;
        top: 0;

        display: block;
        background-image: linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('../../assets/blankcover.png');
        background-size: cover !important;
        background-position: bottom center;

        filter: opacity(0.9)
    }

    .page-title {
        position: relative;
        padding-top: 20px;
        color: #fafafa;
        height: 12rem;

        background-color:rgb(0,0,0,0.2);

        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .page-title div {
        padding-left: 50px;
        padding-right: 20px;
        max-width: 45rem;
        z-index: 1;
    }

    .page-title h1 {       
        font-family: 'Kaushan Script', 'PT Serif';
        font-size: 3rem;
        /* font-weight: 600; */
        line-height: 120%;
        margin-bottom: 0;

    }

    .page-title p {
        text-transform: uppercase;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    .page-title hr {
        margin-top: 0;
        height: 1px;
        background: linear-gradient(to right, rgba(250,250,250,0.4), rgba(250,250,250, 0.8),
            rgba(250,250,250, 0.8), rgba(250,250,250, 0.8), rgba(250,250,250,0.4));
    }

</style>

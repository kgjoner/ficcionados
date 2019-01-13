<template>
    <div class="cover">
        <div class="cover-content">
            <h1 class="home-title">Trazendo a ficção para a realidade.</h1>
            <h3 class="home-sub">Pelo sonho de viver escrevendo.</h3>
            <div class="flex-buttons">
                <router-link to="/sobre" class="main-button button">O MANIFESTO</router-link>
                <a href="/artigos" class="sec-button button">ARTIGOS RECENTES</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cover'
}
</script>

<style>

    .cover {
        position: relative;
        height: 90vh;
        width: 100%;
        background-image: url('../../assets/homecover.png');
        background-size: cover;
        background-position: center bottom;
    }


    .cover-content {
        position: absolute;
        bottom: 0px;
        padding-bottom: 28vh;
        padding-left: 20vw;
    }

    .home-title {
        font-family: 'Kaushan Script', cursive;
        color: rgba(255,255,255,0.9);
        font-size: 3rem;
        letter-spacing: 1px;
        line-height: 140%;
    }

    .home-sub {
        color: rgba(255,255,255,0.7);
        font-size: 1rem;
        line-height: 140%;
        padding: 10px;
        letter-spacing: 0.8px;
        font-style: italic;
        text-transform: uppercase;
    }

    .flex-buttons {
        display: flex;
        align-items: center;
    }

    .cover-content .button {
            height: 60px;
            width: 34vw;
            min-width: 160px;
            max-width: 200px;
            margin-top: 40px;

            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            outline: 0;
    }

    .cover .cover-content .main-button {
        font-size: 15px;
        margin-right: 20px;
        background-color: #4d4d4d;
        color: #fff;
        border: none;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 0px #333;
    }

    .cover .cover-content .main-button:hover {
        background-color: #fff;
        color: #4d4d4d;
    }

    .sec-button {
        font-size: 15px;
        background-color: transparent;
        color: #fff;
        border: solid 1px #fff;
        border-radius: 5px;
        box-shadow: 0px 0px 2px 0px #333;
    }

    .sec-button:hover {
        background-color: #fff;
        color: #1d7fd8;
    }

    @media (max-width: 1140px) {
        .cover-content {
            padding-left: 20vw;
            padding-right: 20px;
        }
    }

    @media (max-width: 960px) {
        .cover-content {
            padding-left: 15vw;
            padding-right: 20px;
        }
    }

    @media (max-width: 768px) {
        .cover-content {
            padding-left: 12vw;
            padding-right: 10vw;
        }
    }

    @media (max-width: 576px) {
        .cover-content {
            padding-left: 5vw;
            padding-right: 5vw;
        }
    }

    @media (max-width: 396px) {
        .cover-content {
            padding-bottom: 20vh;
        }
    }

</style>

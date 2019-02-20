<template>
    <div class="home-banner">
        <div>
            <h3>Liberte suas <strong>histórias</strong></h3>
            <p>Nem sempre é fácil colocar uma história no papel. 
            Pode ser que você mal consiga tempo para escrever, e quando o faz, as palavras lhe escapam. 
            Se esse for o caso...</p>
        </div>
        <a class="button" href="/desbloqueando-a-escrita" target="_blank">Descubra Mais</a>
    </div>
</template>

<script>
export default {
    name: "HomeBanner",
}
</script>

<style>

    .home-banner {
        background-image: url('../../assets/homebanner.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        background-position: center center;
        padding: 150px 0px 100px 0;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .webp .home-banner {
        background-image: url('../../assets/homebanner.webp');
    }

    .home-banner h3 {
        font-size: 2.5rem;
        font-family: 'Kaushan Script';
        color: #f2f2f2;
        letter-spacing: 2px;
        margin-left: 18vw;
        font-weight: bold;
    }

    .home-banner strong {
        color: #3ba0ff;
        font-family: 'Kaushan Script';
    }

    .home-banner p {
        max-width: 40vw;
        margin: 40px 0 0 18vw;
        color: #eee;
        font-size: 1.2rem;
    }

    .home-banner .button {
        margin-right: 10vw;
        background-color: #f2f2f2;
        padding: 15px 40px;
        height: 100%;
        border-radius: 8px;
        font-size: 0.9rem;
        text-decoration: none;
        color: #000;
        text-transform: uppercase;
        margin-top: 4rem;
    }

    .home-banner .button:hover {
        background-color: #1d7fd8;
        color: #f2f2f2;
    }

    @media(max-width: 900px) {
        .home-banner h3, .home-banner p {
            margin-left: 10vw;
        }

        .home-banner button {
            margin-right: 5vw;
        }
    }

    @media(max-width: 768px) {
        .home-banner {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: url('../../assets/homebanner-66.jpg');
        }

        .webp .home-banner {
            background-image: url('../../assets/homebanner-66.webp');
        }

        .home-banner h3, .home-banner p {
            margin-left: 0;
            max-width: 70vw;
        }

        .home-banner button {
            margin-right: 0;
        }
    }

</style>

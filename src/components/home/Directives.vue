<template>
    <div class="directive">
        <router-link to="/categorias/1" class="directive-option">
            <div class="option-sign">
                <i class="icon-quill"></i>
            </div>
            <h2>Sobre Escrita</h2>
            <hr>
            <p>Dicas para refinar seus roteiros, encontrar seu estilo e ganhar 
                confiança em seus textos.</p>
        </router-link>
        <router-link :to="{ path: '/categorias/2' }" class="directive-option">
            <div class="option-sign">
                <i class="icon-book"></i>
            </div>
            <h2>Sobre Publicação</h2>
            <hr>
            <p>Confira as etapas pelas quais um livro deve passar, desde a primeira 
                palavra escrita até tê-lo em suas mãos.</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Directives'
}
</script>

<style>

    .directive {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 40px;
    }

    .directive a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: #000;
        padding: 60px 20px;
        max-width: 540px;
    }

    .option-sign {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #333;
        color: #f2f2f2;
        height: 80px;
        width: 80px;
        padding: 30px;
        margin-bottom: 20px;
        border-radius: 50%;
    }

    .option-sign:hover {
        background-color: #1d7fd8;
    }

    .option-sign i {
        font-size: 1.9rem;
    }

    .directive-option h2 {
        font-family: 'Philosopher';
        font-size: 1.8rem;
        text-align: center;
    }

    .directive-option hr {
        width: 200px;
        height: 1px;
        border: none;
        text-align: center;
        background: linear-gradient(to right, rgba(54,54,54,0), rgba(54, 54, 54, 0.75),
            rgba(54, 54, 54, 0.75), rgba(54, 54, 54, 0.75), rgba(54,54,54,0));
    }

    .directive-option p {
        text-align: center;
        font-family: 'Verdana';
        font-size: 1rem;
        color: rgba(0,0,0,0.7);
        padding: 0px 20px;
    }

    .directive-option:hover .option-sign {
        background-color: #1d7fd8;
    }

    .directive-option:hover hr {
        background: linear-gradient(to right, rgba(29, 127, 216, 0.1), rgba(29, 127, 216, 1),
            rgba(29, 127, 216, 1), rgba(29, 127, 216, 1), rgba(29, 127, 216, 0.1));
    }

    @media (max-width: 768px) {
        .directive {
            flex-wrap: wrap;
        }
    }

</style>

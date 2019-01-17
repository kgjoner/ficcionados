<template>
    <div class="about">
        <div class="about-title">
            <div>
                <p> a que viemos... </p>
                <h1> O Manifesto do Escritor de Ficção </h1>
            </div>
        </div>
        <div class="article-content" v-html="content"></div>
        <div class="mailchimp-form">
            <hr>
            <div class="article-content">
                <p>Curtiu? Você também é um ficcionado?</p>
                <p>Então fique por dentro de tudo o que acontece aqui no blog!</p>
            </div>
            <!-- <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css"> -->
            <div id="mc_embed_signup">
                <form action="//ficcionados.us15.list-manage.com/subscribe/post?u=27613588b850606cebd9fa4cd&amp;id=c022e8edfb"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
                    novalidate>
                    <div id="mc_embed_signup_scroll">
                        <div class="mc-field-group">
                            <label for="mce-FNAME">Nome</label>
                            <input type="text" value="" name="FNAME" class="required" id="mce-FNAME">
                        </div>
                        <div class="mc-field-group">
                            <label for="mce-EMAIL">Email</label>
                            <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                        </div>
                        <div id="mce-responses" class="clear">
                            <div class="response" id="mce-error-response" style="display:none"></div>
                            <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>
                        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_27613588b850606cebd9fa4cd_c022e8edfb"
                                tabindex="-1" value=""></div>
                        <div class="clear"><input type="submit" value="Junte-se a nós!" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "About",
    data: function() {
        return {
            content: `
<p>Apaixonado pela escrita?</p>
<p>Já pensou em escrever um conto ou dois? Um livro?</p>
<p>Talvez já tenha começado? Terminado?</p>
<br> 
<p>Se você respondeu sim ou com certeza para ao menos uma das perguntas acima, pode relaxar… as chances são que você também seja um ficcionado.</p>
<br>
<br>
<h3><strong>Uma Insatisfação Positiva</strong></h3>
<hr>
<p>Esse é um projeto que começou com uma paixão… um sonho… uma dor. Talvez a dor seja a mais importante, pois ela se esconde por trás da paixão e do sonho; é a dor de um vazio não preenchido, de uma realidade que não satisfaz.</p>
<br><p>Se ela não incomodasse tanto e não nos tocasse lá no fundo, jamais teríamos tirado esse projeto do papel.</p>
<br><p>E que dor é essa?</p>
<br><p>O caminho aparentemente tortuoso e árduo enfrentado por um aspirante a autor de ficção.</p>
<br><p>Colocando isso de uma outra forma, o quão propenso você estaria para largar o emprego, a faculdade ou o cursinho a fim de escrever e publicar aquele romance que sempre sonhou?</p>
<br><p>Sim, sim, estou falando de alguém que queira ganhar a vida apenas escrevendo livros de ficção.</p>
<br><p>Improvável? Talvez. Possível? Com certeza.</p>
<br><p>Aqui tocamos no ponto-chave. Se é realmente possível, como podemos masterizar essa arte de modo que o caminho trilhado não pareça tão desencorajador? De que forma essa dor pode ser atenuada?</p>
<br><p>Uma resposta curta e direta poderia ser: olhando para aqueles que conseguiram.</p>
<br><p>É um ponto de partida. Mas quem sabe você pense que isso é um lance de sorte.</p>
<br><p>Bem, a sorte ajuda. Mas a habilidade também. E não apenas a da escrita em si, como também a do pensamento, ao meu ver empreendedor, de saber o que fazer com ela.</p>
<br><p>O cenário nacional pode não ser dos mais animadores. Porém ao olhar para fora, conseguimos enxergar uma amostragem maior de autores que estão conseguindo tirar proveito da era digital para se lançarem no mercado. Muitos deles, inclusive, oferecem dicas aos aventureiros no início da jornada.</p>
<br><p>Aventureiros como eu, você, nós, ficcionados.</p>
<br>
<br>
<h3><strong>O Propósito</strong></h3>
<hr>
<p>Nós, aqui, estamos em busca de publicar nossos livros.</p>
<br><p>Ao mesmo tempo que escrevemos, também passamos a consumir bastante material, tanto sobre a escrita quanto sobre o seu lado empreendedor. E muito desse material é estrangeiro.</p>
<br><p>Assim sendo, criamos esse site com dois propósitos:</p>
<ul>
<li> Encontrar pessoas como você; 🙂</li>
<li> E compartilhar o que estamos descobrindo ao longo do caminho.</li>
</ul>
<br><p>O primeiro é o mais importante, afinal, se você não estivesse aqui, o último seria inconsistente.</p>
<br><p>Quanto ao conteúdo, vamos compartilhá-lo em duas frentes, dividindo-o por assuntos da seguinte forma:</p>
<br><ul>
<li><strong>Escrita:</strong> a arte de escrever em si.<ul>
<li>Roteiro</li>
<li>Forma</li></ul></li>
<br>
<li><strong>Metaescrita:</strong> o lado empreendedor de viver da escrita.<ul>
<li>Organização Pessoal</li>
<li>Planejamento e Publicação</li></ul></li>
</ul>
<br>
<em>Bacana, mas e quem são vocês?</em> `
        }
    }
}
</script>

<style>

    .about-title::before {
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        bottom: 0;
        top: 0;

        display: block;
        background-image: linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('../../assets/homecover.jpg');
        background-size: cover !important;
        background-position: bottom center;

        filter: opacity(0.9)
    }

    .about-title {
        position: relative;
        padding-top: 20px;
        color: #fafafa;
        height: 70vh;

        background-color:rgb(0,0,0,0.2);

        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .about-title div {
        padding-left: 20px;
        padding-right: 20px;
        margin-bottom: 20vh;
        max-width: 45rem;
        z-index: 1;
    }

    .about-title h1 {       
        font-family: 'Kaushan Script', 'PT Serif', cursive;
        font-size: 3rem;
        color: rgba(255,255,255,0.9);
        letter-spacing: 1px;
        line-height: 140%;

    }

    .about-title p {
        text-transform: uppercase;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }

    .mailchimp-form {
        padding-left: 20px;
        padding-right: 20px;
        margin: 100px auto 50px auto;
        max-width: 45rem;
        line-height: 100%;
    }

    #mc_embed_signup {
        max-width: 25rem;
        padding-top: 50px;
        color: #4c4c4c;
    }

    .mc-field-group {
        display: flex;
        flex-direction: column;
    }

    #mc_embed_signup form {
        display:block; position:relative; text-align:left; padding:10px 0 10px 3%;
    }

    #mc_embed_signup input {
        border: 1px solid #ABB0B2; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;
    }

    #mc_embed_signup .button {
        clear:both; background-color: #1d7fd8; border: 0 none; border-radius:4px; 
        transition: all 0.23s ease-in-out 0s; color: #FFFFFF; cursor: pointer; 
        display: inline-block; font-size: 90%; font-weight: normal; height: 50px; 
        line-height: 32px; margin: 10px 5px 10px 0; padding: 0px 22px; text-align: center; 
        text-decoration: none; vertical-align: top; white-space: nowrap; min-width: 160px;
        text-transform: uppercase; letter-spacing: 0.5px;
    }

    #mc_embed_signup .button:hover {
        background-color: #1d7ed8d0;
    }

    #mc_embed_signup .mc-field-group input {
        padding:8px 0; text-indent:2%; margin-bottom: 20px;
    }

    @media (max-width: 850px) and (max-height: 500px), (max-width: 400px) {
        .about-title h1 {
            font-size: 2.7rem;
        }
    }

</style>

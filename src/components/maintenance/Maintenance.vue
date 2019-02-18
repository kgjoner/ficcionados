<template>
    <div class="maintenance">
        <div class="maintenance-box">
            <img src="@/assets/logomarca.svg" alt="Ficcionados">
            <h1>Ops... Estamos em manutenção</h1>
            <hr>
            <p>Voltamos quarta, 20 de fev, com um site novinho!</p>
            <div id="mc_embed_signup">
                <form action="//ficcionados.us15.list-manage.com/subscribe/post?u=27613588b850606cebd9fa4cd&amp;id=c022e8edfb"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
                    novalidate>
                    <div id="mc_embed_signup_scroll">
                        <div class="mc-field-group">
                            <input type="text" value="" name="FNAME" class="required" id="mce-FNAME" placeholder="Nome">
                        </div>
                        <div class="mc-field-group">
                            <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="E-mail">
                        </div>
                        <div id="mce-responses" class="clear">
                            <div class="response" id="mce-error-response" style="display:none"></div>
                            <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>
                        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_27613588b850606cebd9fa4cd_c022e8edfb"
                                tabindex="-1" value=""></div>
                        <div class="clear"><input type="submit" value="Seja o primeiro a saber!" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Maintenance",
    head: {
        meta: [
            {name: "robots", content: "noindex"}
        ]
    }
}
</script>

<style>
    .maintenance {
        background-image: url("../../assets/blankcover.jpg");
        background-size: cover;
        min-height: 100vh;
        padding: 20px;
    }

    .maintenance-box {
        background-color: rgba(0,0,0,0.5);
        max-width: 40rem;
        margin-left: auto;
        margin-right: auto;
        border-radius: 8px;

        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .maintenance img {
        height: 60px;
        margin: 20px;
        opacity: 0.8;
    }

    .maintenance h1 {
        font-family: 'Kaushan Script';
        text-align: center;
        color: #f2f2f2;
        font-size: 2.5rem;
        letter-spacing: 1px;
        line-height: 140%;
    }

    .maintenance hr {
        width: 80%;
        height: 1px;
        border: none;
        background: linear-gradient(to right, rgba(250,250,250,0.4), rgba(250,250,250, 0.8),
            rgba(250,250,250, 0.8), rgba(250,250,250, 0.8), rgba(250,250,250,0.4));
    }

    .maintenance p {
        margin-top: 20px;
        color: #f2f2f2;
        font-size: 1.2rem;
        line-height: 160%;
        letter-spacing: 0.8px;
        font-style: italic;
        text-align: center;
    }

    .maintenance #mc_embed_signup {
        padding-top: 30px;
        width: 100%;
    }

    .maintenance .mc-field-group {
        width: 100%;
    }

    .maintenance .mc-field-group #mce-FNAME,
    .maintenance .mc-field-group #mce-EMAIL {
        margin-bottom: 10px;
    }

    .maintenance #mc-embedded-subscribe {
        margin: 0 0 40px 0;
        width: 100%;
    }
</style>

<template>
    <footer class="footer">
        <div class="flex-footer">
            <div class="med-footer">
                <h3>Receba nossos conteúdos exclusivos</h3>
                <div id="mc_embed_signup">
                    <form action="//ficcionados.us15.list-manage.com/subscribe/post?u=27613588b850606cebd9fa4cd&amp;id=c022e8edfb"
                        method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="dummyframe"
                        novalidate>
                        <div id="mc_embed_signup_scroll">
                            <!-- <div class="mc-field-group">
                                <input type="text" v-model="name" value="" name="FNAME" class="required" id="mce-FNAME" placeholder="Nome">
                            </div> -->
                            <div class="mc-field-group">
                                <label for="mce-EMAIL" style="display: none;">Email</label>
                                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="E-mail">
                            </div>
                            <input type="checkbox" value="4" name="group[3581][4]" id="mce-group[3581]-3581-0" checked="true" style="display:none">
                            <div id="mce-responses" class="clear">
                                <div class="response" id="mce-error-response" style="display:none"></div>
                                <div class="response" id="mce-success-response" style="display:none"></div>
                            </div>
                            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_27613588b850606cebd9fa4cd_c022e8edfb"
                                    tabindex="-1" value=""></div>
                            <div class="clear"><input type="submit" value="Junte-se a nós!" name="subscribe" id="mc-embedded-subscribe" 
                                @click.prevent="afterSubscription" class="button"></div>
                        </div>
                    </form>
                </div>
                <p>dicas de escrita, publicação e muita motivação!</p>
                <hr>
                <div class="social-media">
                    <a class="social-icon fb" href="https://www.facebook.com/blogficcionados/" title="Facebook">
                        <i class="fa fa-facebook-f"></i></a>
                    <a class="social-icon" href="https://www.instagram.com/blogficcionados/" title="Instagram">
                        <i class="fa fa-instagram"></i></a>
                </div>
            </div>
            <div class="upfront">
                <h3>Transparência</h3>
                <p>Fazemos parte do programa <a href="https://amzn.to/2Ej0SLD">Associados da Amazon</a>, isso significa que nosso conteúdo é monetizado através de links comissionados.</p>
            </div>
        </div>
        <span>© 2017–2019 Ficcionados | Feito com <i class="fa fa-heart"></i></span>
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
        position: relative;
        background-color: #4d4d4d;
        color:rgba(255, 255, 255, 0.8);
        font-size: 0.8rem;
        padding-top: 30px;
    }

    .flex-footer {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        padding-left: 10px;
        margin-bottom: 40px;
    }

    .footer h3 {
        font-size: 1.6rem;
        font-family: "Philosopher";
    }

    .footer .med-footer h3 {
        text-align: center;
    }

    .footer hr {
        width: 250px;
        background: linear-gradient(to right, rgba(250,250,250,0.4), rgba(250,250,250, 0.8),
        rgba(250,250,250, 0.8), rgba(250,250,250, 0.8), rgba(250,250,250,0.4));
        height: 1px;
        border: none;
        margin-top: 0;
        margin-bottom: 10px;
    }

    .footer .med-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 6;
        margin: 0 20px;
    }

    .footer .med-footer .social-media {
        display: flex;
        flex-grow: 1;
        margin-top: 15px;
    }

    .footer .med-footer .social-media .social-icon {
        height: 35px;
        width: 35px;
        font-size: 1rem;
        background-color: #f2f2f2;
    }

    .footer .med-footer .social-media [title="Facebook"]:hover {
        background-color: rgba(66,103,178);
    }

    .footer .med-footer .social-media [title="Instagram"]:hover {
        background-color: rgba(240,102,89);
    }

    .footer .med-footer {
        max-width: 800px;
    }

    .footer .med-footer p {
        font-size: 0.9rem;
    }

    .footer .upfront {
        max-width: 22rem;
        flex-grow: 1;
    }

    .footer .upfront p {
        font-size: 0.9rem;
        margin: 20px 30px 0 0;
        letter-spacing: 0.8px;
    }

    .footer .upfront a {
        text-decoration: none;
        color: #2c8fec;
        font-weight: 500;
    }

    .footer .upfront a:hover {
        color: #4c9fec;
    }


    .footer #mc_embed_signup {
        padding-top: 0;
    }

    .footer #mc_embed_signup form {
        padding-left: 0;
    }

    .footer #mc_embed_signup_scroll {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .footer #mc_embed_signup .mc-field-group input {
        margin-bottom: 0px;
        margin-right: 5px;
        width: 250px;
        height: 32px
    }

    .footer #mc_embed_signup .mc-field-group input:focus {
        outline-color: #1d7fd8;
        box-shadow: 0 0 0 1px #1d7fd8aa
    }

    .footer #mc_embed_signup .button {
        background-color: #1d7fd8;
        border: solid 1px #1660a5;
        text-transform: none;
        font-size: 1rem;
        margin: 5px 0;
        padding: 0;
        height: 34px;
        min-width: 0px;
        width: 140px;
    }

    .footer #mc_embed_signup .button:hover {
        background-color: #1c68af;
    }

    .footer span {
        position: absolute;
        margin-top: 30px;
        padding: 10px 30px;
        bottom: 0px;
        right: 0px;
        letter-spacing: 0.8px;
    }

    .footer span i {
        color: rgb(212, 65, 65);
        margin-left: 2px;
    }

    @media(max-width: 834px) {
        .flex-footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .footer .upfront {
            justify-self: flex-end;
            margin: 60px 10px 20px 10px;
        }
    }

    @media(max-width: 520px) {
        .footer .med-footer {
            margin: 5px;
        }
    }

    @media(max-width: 428px) {
        .footer #mc_embed_signup {
            margin-left: 10vw;
        }
    }


</style>

<template>
	<footer class="footer">
		<div class="footer__container">

			<div class="footer__contact">
				<h3 class="footer__title">
					Receba nossos conteúdos exclusivos
				</h3>
				<MailchimpForm short addToList />
				<p class="footer__content">
					dicas de escrita, publicação e muita motivação!
				</p>
				<hr class="footer__rule" />

				<div class="footer__medias">
					<a
						class="footer__social-icon footer__social-icon--fb"
						href="https://www.facebook.com/blogficcionados/"
						title="Facebook"
					>
						<i class="fa fa-facebook-f"></i
					></a>
					<a
						class="footer__social-icon footer__social-icon--ig"
						href="https://www.instagram.com/blogficcionados/"
						title="Instagram"
					>
						<i class="fa fa-instagram"></i
					></a>
				</div>
			</div>

			<div class="footer__disclaimer">
				<h3 class="footer__title">
					Transparência
				</h3>
				<p class="footer__content">
					Fazemos parte do programa
					<a href="https://amzn.to/2Ej0SLD">Associados da Amazon</a>, isso
					significa que nosso conteúdo é monetizado através de links
					comissionados.
				</p>
			</div>

		</div>
		<span>© 2017–2020 Ficcionados | Feito com <i class="fa fa-heart"></i></span>
	</footer>
</template>

<script>
import MailchimpForm from '@/components/utils/MailchimpForm'

export default {
	name: 'Footer',
	components: { MailchimpForm }
}
</script>

<style>
.footer {
	grid-area: footer;
	position: relative;
	background-color: #4d4d4d;
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.8rem;
	padding-top: 30px;
}

.footer__container {
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	margin-bottom: 40px;
}

.footer__contact {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 6;
	margin: 0 20px;
	max-width: 800px;
}

.footer__title {
	font-size: 1.6rem;
	font-family: 'Philosopher';
}

.footer__contact .footer__title {
	text-align: center;
	margin-bottom: 24px;
}

.footer__content {
	font-size: 0.9rem;
}

.footer__contact .footer__content {
	margin-top: 8px;
}

.footer__rule {
	width: 250px;
	background: linear-gradient(
		to right,
		rgba(250, 250, 250, 0.4),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.8),
		rgba(250, 250, 250, 0.4)
	);
	height: 1px;
	border: none;
	margin-top: 0;
	margin-bottom: 10px;
}

.footer__medias {
	display: flex;
	flex-grow: 1;
	margin-top: 15px;
}

.footer__social-icon {
	height: 35px;
	width: 35px;
	font-size: 1rem;
	background-color: #f2f2f2;
	border-radius: 50%;
	margin-left: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #4c4c4c;
}

.footer__social-icon:hover {
	color: #fafafa;
	text-decoration: none;
}

.footer__social-icon--fb:hover {
	background-color: rgba(66, 103, 178);
}

.footer__social-icon--ig:hover {
	background-color: rgba(240, 102, 89);
}

.footer__disclaimer {
	max-width: 22rem;
	flex-grow: 1;
}

.footer__disclaimer .footer__content {
	margin: 20px 30px 0 0;
	letter-spacing: 0.8px;
}

.footer__disclaimer a {
	text-decoration: none;
	color: #2c8fec;
	font-weight: 500;
}

.footer__disclaimer a:hover {
	color: #4c9fec;
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

@media (max-width: 834px) {
	.footer__container {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.footer__disclaimer {
		justify-self: flex-end;
		margin: 60px 10px 20px 10px;
	}
}

@media (max-width: 520px) {
	.footer__contact {
		margin: 5px;
	}
}

@media (max-width: 350px) {
	.footer__disclaimer {
		padding-left: 20px;
	}
}
</style>

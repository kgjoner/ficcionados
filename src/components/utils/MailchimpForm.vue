<template>
  <div id="mc_embed_signup"
    class="mailchimp-form" 
    :class="{ 'mailchimp-form--short': short }">
    <form
      action="//ficcionados.us15.list-manage.com/subscribe/post?u=27613588b850606cebd9fa4cd&amp;id=c022e8edfb"
      method="post"
      class="validate"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="dummyframe"
      novalidate
    >
      <div id="mc_embed_signup_scroll"
        class="mailchimp-form__scroll">
        <div class="mc-field-group mailchimp-form__group ">
          <label for="mce-FNAME" style="display: none;">Nome</label>
          <input
            v-show="!short"
            type="text"
            v-model="name"
            name="FNAME"
            class="required mailchimp-form__field "
            id="mce-FNAME"
            placeholder="Nome"
          />
        </div>
        <div class="mc-field-group">
          <label for="mce-EMAIL" style="display: none;">Email</label>
          <input
            type="email"
            v-model="email"
            name="EMAIL"
            class="required email mailchimp-form__field"
            id="mce-EMAIL"
            placeholder="E-mail"
          />
        </div>
        <input v-if="addToList"
          type="checkbox"
          value="4"
          name="group[3581][4]"
          id="mce-group[3581]-3581-0"
          checked="true"
          style="display:none"
        />
        <div id="mce-responses" class="clear">
          <div
            class="response"
            id="mce-error-response"
            style="display:none"
          ></div>
          <div
            class="response"
            id="mce-success-response"
            style="display:none"
          ></div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true">
          <input
            type="text"
            name="b_27613588b850606cebd9fa4cd_c022e8edfb"
            tabindex="-1"
            value=""
          />
        </div>

        <div class="clear">
          <input
            type="submit"
            :value="btnMessage"
            name="subscribe"
            id="mc-embedded-subscribe"
            @click.prevent="trySubscription"
            class="mailchimp-form__btn"
            :class="{ 'mailchimp-form__btn--full-width': fullWidthBtn }"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import displayError from '@/utils/displayError'

export default {
  name: "MailchimForm",
  props: {
    btnMessage: {
      type: String,
      default: 'Junte-se a nós!'
    },
    short: {
      type: Boolean
    },
    addToList: {
      type: Boolean
    },
    fullWidthBtn: {
      type: Boolean
    }
  },
  data: function() {
		return {
			name: '',
			email: '',
		}
	},
  methods: {
		trySubscription() {
			try {
        this.existOrError(this.name, 'O nome não foi informado.')
				this.existOrError(this.email, 'O e-mail não foi informado.')
			} catch (e) {
        console.log(e)
				return displayError(e)
			}

      document.getElementById('mc-embedded-subscribe-form').submit()
      this.$emit('subscribe')
		},
		existOrError(value, msg) {
			if (!value) throw msg
			if (Array.isArray(value) && value.length == 0) throw msg
			if (typeof value === 'string' && !value.trim()) throw msg
		},
  },
  mounted() {
    if(this.short) this.name = 'ficcionado'
  }
}
</script>

<style>
.mailchimp-form {
	padding-top: 0;
	width: 100%;
}

.mailchimp-form--short .mailchimp-form__scroll {
  display: flex;
  justify-content: center;
}

.mailchimp-form__field {
  padding: 8px;
	margin-bottom: 10px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid transparent;
}

.mailchimp-form--short .mailchimp-form__field {
  padding: 6px 5px;
  width: 250px;
  margin-right: 5px;
	border-radius: 3px;
  border-color: #abb0b2;
}

.mailchimp-form:not(.mailchimp-form--short) .mailchimp-form__field:focus {
	outline: 1px solid #fff;
  box-shadow: 0 0 0 3px var(--main-color);
  border-color: var(--main-color);
  border-style: solid;
}

.mailchimp-form--short .mailchimp-form__field:focus {
  outline-color: var(--main-color);
  box-shadow: 0 0 0 1px #1d7fd8aa;
}

.mailchimp-form__btn {
  padding: 10px 25px;
	margin: 5px 0;
  color: #fff;
	background-color: var(--main-color);
	border: 2px solid rgba(0,0,0,0.1);
  border-radius: 4px;
	letter-spacing: 0.5px;
  font-size: 1.1rem;
  transition: 0.2s ease-in-out;
}

.mailchimp-form__btn:hover {
	filter: brightness(85%) contrast(150%) hue-rotate(-10deg);
}

.mailchimp-form__btn--full-width {
  width: 100%;
}

.mailchimp-form--short .mailchimp-form__btn {
  padding: 3px 12px;
  font-size: 1rem;
  margin: 0;
}

@media(max-width: 500px) {
  .mailchimp-form--short .mailchimp-form__scroll {
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  .mailchimp-form--short .mailchimp-form__field {
    margin-bottom: 5px;
    margin-right: 0;
  }

  .mailchimp-form--short .mailchimp-form__btn {
    width: 250px;
  }
}
</style>
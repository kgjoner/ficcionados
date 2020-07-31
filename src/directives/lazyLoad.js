export default {
	inserted: (el, binding) => {
		function loadImg() {
			if (binding.value === 'background') {
				el.style.setProperty('background-image', `url(${el.dataset.url})`)
			} else {
				el.src = el.dataset.url
			}
		}

		function handleIntersect(entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadImg()
					observer.unobserve(el)
				}
			})
		}

		function createObserver() {
			const options = {
				root: null,
				threshold: '0',
			}
			const observer = new IntersectionObserver(handleIntersect, options)
			observer.observe(el)
		}

		if (window['IntersectionObserver']) {
			createObserver()
		} else {
			loadImg()
		}
	},
}

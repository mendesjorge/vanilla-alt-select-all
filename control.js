//DEFs
const episodes = [
	{id: 1, name:' Trailer'},
	{id: 2, name:' James Q Quick Origin Story'},
	{id: 3, name:' Amy Dutton Origin Story'},
	{id: 4, name:' Starting a New Development Project'},
	{id: 5, name:' How do you Start a New Design Project?'},
	{id: 6, name:' Freelancing (Part 1)'}
]

// page loader
window.onload = (() => {
	const $ = (query) => {
		const result = document.querySelectorAll(query)
		
		if(result.length === 1) return result[0]
		return result
	}

	const listWrapper = $('.pick-list')
	const previewer = $('.previewer')
	let altKeyPressed = false
	listWrapper.innerHTML = ''
	episodes.forEach((data) => {
		const newElement = document.createElement('li')
		
		newElement.setAttribute('id', data.id)
		newElement.classList = ['list-item']
		
		const text = document.createElement('div')
		
		text.classList= ['item-text']
		text.innerText = `${data.id} || ${data.name}`
		
		const img = document.createElement('img')
		img.setAttribute('src', './images/checkbox--unchecked.svg')
		img.onclick = (event) => {
			if(event.altKey && !altKeyPressed){
				altKeyPressed = data.id
			}
			else{
				if(event.altKey){
					let startId = Math.min(data.id, altKeyPressed)
					const endId = Math.max(data.id, altKeyPressed)

					while(startId <= endId){
						checkRow(startId)
						++startId
					}
				}
				else{
					altKeyPressed = undefined
					checkRow(img)
				}
			}
		}

		
		listWrapper.append(newElement)
		newElement.append(img)
		newElement.append(text)
	})
	// in load definitions
	function checkRow(imgOrId){
		const img = typeof (imgOrId) === 'number'? $(`[id="${imgOrId}"] img`) : imgOrId
		if(img.getAttribute('checked') === 'true') {
			img.setAttribute('src', './images/checkbox--unchecked.svg')
			// img.setAttribute('checked', false)
			const text = $(`[id="${img.parentElement.id}"] .item-text`)
			text.classList = [...text.classList, ' cross-text']
		}
		else {
			img.setAttribute('src', './images/checkbox--checked.svg')
			img.setAttribute('checked', true)
		}
	}
})
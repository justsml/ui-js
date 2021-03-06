import DOM from 'ui-js/dom'
import style from './button.styl'


export default class Button {

	static tag = 'button'
	static style = style
	static template = `
		<div .content
		.__left='state is LEFT'
		.__right='state is RIGHT'
		.__bottom='state is BOTTOM'
		.__top='state is TOP'>
			<content></content>
		</div>
	`

	NONE = 0
	LEFT = 1
	RIGHT = 2
	BOTTOM = 3
	TOP = 4


	constructor() {
		this.state = this.NONE
		this.state = this.NONE
		this.on('mousedown', event => this.onMouseDown(event))
	}


	onMouseDown(event) {
		event.prevent()

		let width = this.host.width()
		let height = this.host.height()
		let x = event.layerX
		let y = event.layerY

		let states = []

		states.push({state: this.TOP, distance: y / height})
		states.push({state: this.BOTTOM, distance: (height - y) / height})
		states.push({state: this.LEFT, distance: x / width})
		states.push({state: this.RIGHT, distance: (width - x) / width})

		let minState = states[0]
		states.forEach(state => {
			if (state.distance < minState.distance) {
				minState = state
			}
		})

		this.state = minState.state

		DOM.one('mouseup', ()=> this.state = this.NONE)
	}

}




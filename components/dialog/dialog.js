import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WebDialog extends LitElement {
	static properties = {
		show: { type: Bool, attribute: 'show' },
	};

	static styles = css`
		:host {
			border-radius: calc(0.0625rem * 16);
			background-color: #FFFBFE;
			justify-content: center;
			align-items: center;
			pointer-events: none;
			visibility: hidden;
			position: absolute;
			color: #1C1B1F;
			display: flex;
			z-index: 9898;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
		}
		:host-context(dialog-component[show="true"]) { pointer-events: all; }
		:host-context(dialog-component[show="true"]) .scrim { animation: openScrim 400ms cubic-bezier(0.05, 0.7, 0.1, 1) forwards; }
		:host-context(dialog-component[show="true"]) .container { animation: openContainer 400ms cubic-bezier(0.05, 0.7, 0.1, 1) forwards; animation-delay: 200ms; }
		:host-context(dialog-component[show="false"]) { pointer-events: none; }
		:host-context(dialog-component[show="false"]) .scrim { animation: closeScrim 200ms cubic-bezier(0.3, 0, 0.8, 0.15) forwards; animation-delay: 100ms; opacity: .4; }
		:host-context(dialog-component[show="false"]) .container { animation: closeContainer 200ms cubic-bezier(0.3, 0, 0.8, 0.15) forwards; }
		@keyframes openScrim {
			from { opacity: 0; }
			to { opacity: .4; }
		}
		@keyframes closeScrim {
			from { opacity: .4; }
			to { opacity: 0; }
		}
		@keyframes openContainer {
			from { transform: scaleY(0); }
			to { transform: scaleY(1); }
		}
		@keyframes closeContainer {
			from { transform: scaleY(1); }
			to { transform: scaleY(0); }
		}
		.scrim {
			background-color: black;
			visibility: visible;
			position: absolute;
			opacity: 0;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
		}
		.container {
			box-shadow: 0 calc(0.0625rem * 64) calc(0.0625rem * 128) 0 rgba(0, 0, 0, 0.125),
									0 calc(0.0625rem * 16) calc(0.0625rem * 32) 0 rgba(0, 0, 0, 0.125),
									0 calc(0.0625rem * 4) calc(0.0625rem * 8) 0 rgba(0, 0, 0, 0.125);
			border-radius: inherit;
			max-height: calc(0.0625rem * 640);
			max-width: calc(0.0625rem * 640);
			padding: calc(0.0625rem * 16);
			background-color: inherit;
			flex-direction: column;
			box-sizing: border-box;
			transform: scaleY(0);
			visibility: visible;
			overflow: hidden;
			color: inherit;
			display: flex;
			height: 80%;
			width: 80%;
			z-index: 1;
		}
		.container .header {
			gap: calc(0.0625rem * 16);
			flex-direction: row;
			display: flex;
		}
		.container .content {
			flex-grow: 1;
		}
		.container .actions {
			gap: calc(0.0625rem * 16);
			justify-content: flex-end;
			flex-direction: row;
			align-items: center;
			display: flex;
		}
		.container .actions .spacer {
			flex-grow: 1;
		}
	`;

	constructor() {
		super();
		this.show = false;
	}

	render() {
		return html`
		<span class="scrim"></span>
		<div class="container hidden">
			<div class="header">
				<slot name="header"></slot>
			</div>
			<div class="content">
				<slot name="content"></slot>
			</div>
			<div class="actions">
				<slot name="action_1" @click="${this.close(1)}"></slot>
				<span class="spacer"></span>
				<slot name="action_2" @click="${this.close(2)}"></slot>
				<slot name="action_3" @click="${this.close(3)}"></slot>
			</div>
		</div>
		`;
	}

	open() {
		this.setAttribute('show', true);
	}

	close(action) {
		this.setAttribute('show', false);
	}
}
window.customElements.define('dialog-component', WebDialog);
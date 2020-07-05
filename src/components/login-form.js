import { LitElement, html, css } from 'lit-element';
import { CustomStyles, ViewStyle } from '../utils/custom-styles';
import { seedStyle } from '@seed-catalog/styles';
import { locales } from '../../assets/translations';
import { store } from '../store/store';
import { connect } from 'pwa-helpers';
import { login } from '../store/actions/auth-actions';

class LoginForm extends connect(store)(LitElement) {
  static get styles() {
    return [
      CustomStyles,
      ViewStyle,
      seedStyle,
      css`
        section {
          background-color: rgba(0,0,0, .6);
          padding: 0;
        }

        h5 {
          min-height: 15px;
          text-align: end;
          color: #efa804;
        }

        h2 {
          text-align: center;
          margin-bottom: 40px;
        }

        input[type="submit"] {
          align-self: flex-end;
        }
      `
    ];
  }

  static get properties() {
    return {
      alert: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.alert = '';
  }

  stateChanged(state) {
    this.alert = state.auth.loginError || '';
  }

  render() {
    return html`
      <section>
        <h2>${locales.login_title}</h2>
        <form
          autocomplete="off"
          name="Login"
          onsubmit="return false">
          <input type="text" id="email" placeholder="email@address.com" required>
          <input type="password" id="pass" placeholder="${locales.login_password}" required>
          <input
            type="submit"
            value="${locales.login_submit}"
            @click="${this.login}"
            aria-label="${locales.login_submit}"
            class="sd-btn green-mate"
          >
          <h5>${this.alert}</h5>
        </form>
      </section>
    `;
  }

  login() {
    const mail = this.shadowRoot.querySelector('#email').value;
    const password = this.shadowRoot.querySelector('#pass').value;

    if (mail && password) {
      store.dispatch(login({ mail, password }));
    }
  }
}

window.customElements.define('login-form', LoginForm);

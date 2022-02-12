import { LitElement, html, css } from 'lit-element';
import { countryPath, locales } from '../../assets/translations';
import { close } from '../utils/svg-icons';
import { navigator } from '../routing';
import { logout } from '../store/actions/auth-actions';

import { auth2 } from '../middleware/auth.js';

class NavigationMenu extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0,0,0,.9);
          --app-color-blue-light: #21bfbf;
          min-width: min-content;
          font-family: 'Ubuntu', sans-serif;
        }

        nav {
          display: flex;
          align-items: center;
          flex-flow: row wrap;
          justify-content: center;
          padding: 0;
          height: 100%;
        }

        .link {
          padding: 10px;
          text-decoration: none;
          color: rgb(255, 255, 255);
          transform: all 1s;
          cursor: pointer;
        }

        ul {
          padding: 0;
          list-style: none;
          white-space: nowrap;
          font-size: 22px;
        }

        li {
          padding:20px;
          text-align: center;
        }

        li img {
          width: 100px;
        }

        a:hover {
          color: var(--app-color-blue-light);
        }

        .active {
          border-bottom: 1px solid #929191;
          border-top-right-radius: 10px;
          color: var(--app-color-blue-light);
          animation: all 1s;
        }

        .close {
          position: absolute;
          border: none;
          top: 0;
          left: 0;
          padding: 20px;
          background: unset;
          cursor: pointer;
          outline: none;
        }

        nav button svg {
          fill: #43cdc5;
        }

        @media (min-width: 768px) {
          .close {
            display: none;  
          }

          ul {
            font-size: 15px;
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      logged: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.authenticate();
  }

  async authenticate() {
    // this.logged = await auth2();
  }

  firstUpdated() {
    this.setActiveViaPath();
  }

  render() {
    return html`
      <nav>
        <button class="close" aria-label="Close" @click="${this.closeMobileMenu}">${close}</button>
        <ul>
        <li><img src="assets/logo.png" alt="Logo Mobile"></li>
          ${navigator.map((x, i) => html`
            <li><a class="link" href="${x.path}" @click="${() => this.setActive(i)}">${x.name}</a></li>
          `)}
        ${this.logged ? html`<li><a href="#" @click="${logout}" style="color: red">${locales.login_logout}</a></li>` : ''}
        </ul>
      </nav>
    `;
  }

  closeMobileMenu() {
    this.style.left = '100%';
  }

  setActiveViaPath() {
    this.setActive(!countryPath ? navigator.findIndex((i) => i.path === location.pathname) : 0);
  }

  setActive(index) {
    const navList = this.shadowRoot.querySelectorAll('a');
    this.closeMobileMenu();

    navList.forEach((x, i) => {
      x.className = (i === index) ? 'active link' : 'link';
    });
  }
}

window.customElements.define('navigation-menu', NavigationMenu);

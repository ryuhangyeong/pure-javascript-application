import getGithubAvatarUrl from "./getGithubAvatarUrl.js";

const ERROR_IMAGE = "https://via.placeholder.com/500x500?text=error";
const LOADING_IMAGE = "https://via.placeholder.com/500x500?text=loading";

const AVATAR_LOAD_COMPLETE = "AVATAR_LOAD_COMPLETE";
const AVATAR_LOAD_ERROR = "AVATAR_LOAD_ERROR";

export const EVENTS = {
  AVATAR_LOAD_COMPLETE,
  AVATAR_LOAD_ERROR,
};

export default class GithubAvatar extends HTMLElement {
  constructor() {
    super();
    this.url = LOADING_IMAGE;
  }

  get user() {
    return this.getAttribute("user");
  }

  set user(value) {
    this.setAttribute("user", value);
  }

  render() {
    window.requestAnimationFrame(() => {
      this.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.url;
      this.appendChild(img);
    });
  }

  async loadNewAvatar() {
    const { user } = this;
    if (!user) return;

    try {
      this.url = await getGithubAvatarUrl(user);
      this.onLoadAvatarCompleted();
    } catch (e) {
      this.url = ERROR_IMAGE;
      this.onLoadAvatarError(e);
    }

    this.render();
  }

  connectedCallback() {
    this.render();
    this.loadNewAvatar();
  }

  onLoadAvatarCompleted() {
    const event = new CustomEvent(AVATAR_LOAD_COMPLETE, {
      detail: {
        avatar: this.url,
      },
    });

    this.dispatchEvent(event);
  }

  onLoadAvatarError(error) {
    const event = new CustomEvent(AVATAR_LOAD_ERROR, {
      detail: {
        error,
      },
    });

    this.dispatchEvent(event);
  }
}

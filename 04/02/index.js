import GithubAvatar, { EVENTS } from "./GithubAvatar.js";

window.customElements.define("github-avatar", GithubAvatar);

document.querySelectorAll("github-avatar").forEach((avatar) => {
  avatar.addEventListener(EVENTS.AVATAR_LOAD_COMPLETE, (e) => {
    console.log(EVENTS.AVATAR_LOAD_COMPLETE, e.detail);
  });

  avatar.addEventListener(EVENTS.AVATAR_LOAD_ERROR, (e) => {
    console.log(EVENTS.AVATAR_LOAD_ERROR, e.detail);
  });
});

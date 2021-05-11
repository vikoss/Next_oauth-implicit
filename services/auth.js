import randomString from './../utils/randomString';
import { config } from './../config';
import scopesArray from './../utils/scopesArray';
import getHashParams from './../utils/getHashParams';

export default class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  };

  login() {
    const state = randomString(16);
    localStorage.setItem('auth_state', state);
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += `&client_id=${encodeURIComponent(config.spotifyClientId)}`;
    url += `&scope=${encodeURIComponent(scopesArray.join(' '))}`;
    url += `&redirect_uri=${encodeURIComponent(config.spotifyRedirectUri)}`;
    url += `&state=${encodeURIComponent(state)}`;
    window.location.href = url;
  };

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  };

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      const { access_token, state, expires_in } = getHashParams();
      console.log(getHashParams());
      const auth_state = localStorage.getItem('auth_state');
      if (state === null || state !== auth_state) {
        reject(new Error(`The state doesn't match`));
      }
      localStorage.removeItem('auth_state');
      if (access_token) {
        this.setSession({ accessToken: access_token, expiresIn: expires_in });
        resolve(access_token);
      } else {
        reject(new Error('The token is invalid'));
      }
    })
    .then((accessToken) => this.handleUserInfo(accessToken));
  };

  setSession({ accessToken, expiresIn }) {
    const expiresAt = JSON.stringify(
      expiresIn * 1000 + this.getTime()
    );
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return this.getTime() < expiresAt;
  };

  handleUserInfo(accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    return new Promise((resolve, reject) => {
      fetch('https://api.spotify.com/v1/me', { headers })
      .then((response) => response.json())
      .then((profile) => {
        console.log(profile);
        this.setProfile(profile);
        resolve(profile);
      })
      .catch((error) => reject(error));
    });
  };

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  };

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : {};
  };

  getTime() {
    return new Date().getTime();
  };
};
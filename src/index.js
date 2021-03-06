import md5 from 'md5';
import comic from './comic';
import character from './character';
import creator from './creator';
import event from './event';
import serie from './serie';
import storie from './storie';

import API_URL from './config';
import toJSON from './utils';

export default class MarvelWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.privateKey = options.privateKey;
    this.publicKey = options.publicKey;
    this.limit = options.limit;
    this.ts = new Date().getTime();
    this.hash = md5(`${this.ts}${this.privateKey}${this.publicKey}`);

    this.comic = comic.bind(this)();
    this.character = character.bind(this)();
    this.creator = creator.bind(this)();
    this.event = event.bind(this)();
    this.serie = serie.bind(this)();
    this.storie = storie.bind(this)();
  }

  request(url) {
    if (this.limit) {
      return fetch(`${url}?limit=${this.limit}&ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`).then(toJSON);
    }

    return fetch(`${url}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`).then(toJSON);
  }

  requestSearch(url) {
    return fetch(`${url}ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`).then(toJSON);
  }
}


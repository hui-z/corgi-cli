import { observable } from 'mobx';

export default class AppStore {
    @observable greeting = 'Hello corgi-cli';
};
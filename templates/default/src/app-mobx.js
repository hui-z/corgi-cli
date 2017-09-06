import { createStore, observer } from 'mobx-weapp';

import AppStore from './stores/AppStore';

createStore({
    appStore: new AppStore(),
});

App({
    onLaunch() {
        console.log('launch');
    }
})

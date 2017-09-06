import request from './utils/wx-request';
import {createStore, observer} from 'mobx-weapp';

import TodoStore from './stores/TodoStore';

createStore({
    todoStore: TodoStore.fromJS([]),
});

App({
    async onLaunch() {
        // try {
        //     wx.showLoading({
        //         title: '加载中',
        //         mask: true,
        //     });
        //     wx.hideLoading();
        // } catch (error) {
        //     console.error(error);
        // }
    }
})

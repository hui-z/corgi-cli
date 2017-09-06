import { observer } from 'mobx-weapp';

const mapState = ({ appStore }) => {
    return {
        greeting: appStore.greeting,
    };
}

Page(observer(mapState)({
    data: {},
    onLoad() {
        console.log('load');
    },
}))

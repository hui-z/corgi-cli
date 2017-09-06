import {observer} from 'mobx-weapp';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from '../../constants';

const mapState = ({todoStore}) => {
    return {
        activated: todoStore.activeTodoCount,
        completed: todoStore.completedCount,
        todos: todoStore.todos,
    };
}

const mapActions = ({todoStore}) => {
    return {
        clearCompleted: todoStore.clearCompleted.bind(todoStore),
        toggleAll: todoStore.toggleAll.bind(todoStore),
    }
}

Page(observer(mapState, mapActions)({
    data: {
        todoInput: '',
        selected: [], 
    },
    onUpdate() {
        console.log('update');
    },
    async onPullDownRefresh() {
        this.$store.todoStore.addTodo('fuck wechat');
        wx.showToast({title: '刷新成功'});
        wx.stopPullDownRefresh();
    },
    inputChange({detail}) {
        this.setData({
            todoInput: detail.value,
        });
    },
    addTodo({detail}) {
        if (!detail.value) return;
        this.$store.todoStore.addTodo(detail.value);
        this.setData({todoInput: ''});
    },
    toggleComplete({detail, target}) {
        let id = detail.value[0];
        let todo = target.dataset.todo;
        this.$store.todoStore.toggleTodo(todo.id);
    },
    filterTodos({detail}) {
        let todos = null;
        switch (detail.value) {
            case ALL_TODOS:
                todos = this.$store.todoStore.todos;
                break;
            case ACTIVE_TODOS:
                todos = this.$store.todoStore.activeTodos;
                break;
            case COMPLETED_TODOS:
                todos = this.$store.todoStore.completedTodos;
                break;
            default:
                todos = this.$store.todoStore.todos;
        }
        this.setData({todos});
    }
}))
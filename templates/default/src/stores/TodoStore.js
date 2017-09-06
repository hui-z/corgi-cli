import {observable, computed} from 'mobx';
import {generateId} from '../utils';
import TodoModel from '../models/TodoModel';

export default class TodoStore {
    @observable todos = [];

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

    @computed get activeTodos() {
        return this.todos.filter(todo => !todo.completed);
    }

    @computed get completedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    addTodo (title) {
		this.todos.push(new TodoModel(generateId(), title, false));
	}

	toggleAll () {
		let allCompleted = this.todos.length === this.completedCount;
		this.todos.forEach(
			todo => todo.completed = !allCompleted
		);
	}

    toggleTodo (id) {
        let todo = this.todos.find(t => t.id == id);
        if (!todo) return;
        todo.toggle();
    }

	clearCompleted () {
		this.todos = this.todos.filter(
			todo => !todo.completed
		);
	}

	toJS() {
		return this.todos.map(todo => todo.toJS());
	}

	static fromJS(array) {
		const todoStore = new TodoStore();
		todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
		return todoStore;
	}

};
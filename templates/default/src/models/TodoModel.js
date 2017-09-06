import {observable} from 'mobx';

export default class TodoModel {
	id;
	@observable title;
	@observable completed;

	constructor(id, title, completed) {
		this.id = id;
		this.title = title;
		this.completed = completed;
	}

	toggle() {
		this.completed = !this.completed;
	}

	setTitle(title) {
		this.title = title;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJS(object) {
		return new TodoModel(object.id, object.title, object.completed);
	}
}
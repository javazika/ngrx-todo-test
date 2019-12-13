import { Component, OnInit } from '@angular/core';
import { Todo } from './../../../common/models/todo';
import { Store } from '@ngrx/store';
import * as Todos from './../../../common/store/todo/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Array<Todo>;
  message: string;
  bgClass: string;
  p = 1;
  isForm = false;
  todo = {
    id: 0,
    title: '',
    userId: 0,
    completed: true
  }

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new Todos.GetTodos());
    this.store.select('todos').subscribe(response => {
      this.todos = response.todoList;
      this.message = response.message;
      this.bgClass = response.infoClass;
    }, error => {
      console.log(error);
    });
  }

  onAdd() {
    this.todo.id = 0;
    this.todo.title = '';
    this.isForm = true;
  }

  onEdit(todo: Todo) {
    this.todo.id = todo.id;
    this.todo.title = todo.title;
    this.isForm = true;
  }

  onSave() {
    if (this.todo.id != 0) {
      this.store.dispatch(new Todos.UpdateTodo(this.todo));
    } else {
      this.store.dispatch(new Todos.AddTodo(this.todo));
    }
    this.isForm = false;
  }

  onDelete(id: number) {
    this.store.dispatch(new Todos.DeleteTodo(id));
  }

  onCancel() {
    this.isForm = false;
  }

}
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';


import {
    TodoActionType,
    GetTodosSuccess, GetTodosFailed,
    AddTodoSuccess, AddTodoFailed,
    UpdateTodoSuccess, UpdateTodoFailed,
    DeleteTodoSuccess,
    DeleteTodoFailed
} from './todo.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Injectable()
export class TodoEffects {

    constructor(
        private actions$: Actions,
        private todosService: TodoService
    ) { }

    @Effect()
    getTodos$ = this.actions$.pipe(
        ofType(TodoActionType.GET_TODOS),
        switchMap(() =>
            this.todosService.getAPITodos().pipe(
                map((todos: Array<Todo>) => new GetTodosSuccess(todos)),
                catchError(error => of(new GetTodosFailed(error)))
            )
        )
    );

    @Effect()
    addTodo$ = this.actions$.pipe(
        ofType(TodoActionType.ADD_TODO),
        switchMap((action) =>
            this.todosService.addAPITodo(action['payload']).pipe(
                map((todo: Todo) => new AddTodoSuccess(todo)),
                catchError(error => of(new AddTodoFailed(error)))
            )
        )
    );

    @Effect()
    updateTodo$ = this.actions$.pipe(
        ofType(TodoActionType.UPDATE_TODO),
        switchMap((action) =>
            this.todosService.updateAPITodo(action['payload']).pipe(
                map((todo: Todo) => new UpdateTodoSuccess(todo)),
                catchError(error => of(new UpdateTodoFailed(error)))
            )
        )
    );

    @Effect()
    deleteTodo$ = this.actions$.pipe(
        ofType(TodoActionType.DELETE_TODO),
        switchMap((action) =>
            this.todosService.deleteAPITodo(action['payload']).pipe(
                map((todoId: number) => new DeleteTodoSuccess(todoId)),
                catchError(error => of(new DeleteTodoFailed(error)))
            )
        )
    );

}
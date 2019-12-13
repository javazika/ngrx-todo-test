import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { storeLogger } from 'ngrx-store-logger';
import { NgxPaginationModule } from 'ngx-pagination';
import { TodoReducer } from '../common/store/todo/todo.reducers';
import { TodoEffects } from '../common/store/todo/todo.effects';
import { TodoService } from '../common/services/todo.service';
import { RouterModule, Routes } from '@angular/router';

export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}
const routes: Routes = [
  { path: '', component: TodoListComponent }
];
export const metaReducers = [logger];

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('todos', TodoReducer, { metaReducers }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([TodoEffects])
  ],
  exports: [TodoListComponent],
  providers: [TodoService]
})
export class TodosModule { }
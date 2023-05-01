import {
  useMutation,
  useOwner,
  useOwnerActions,
  // NonEmptyString50,
  // useQuery,
} from "@/lib/db";
import * as Evolu from "evolu";
import {  FC, useState } from "react";
import {Button} from '@/components/Button'
import {NotificationBar} from '@/components/NotificationBar'
import {TodoItem} from '@/components/TodoItem'
import {prompt} from '@/lib/prompt'
import {TodoList} from '@/components/TodoList'
import {TodoCategoryList} from '@/components/TodoCategoryList'
import {AddTodoCategory} from '@/components/AddTodoCategory'
import {AddTodo} from '@/components/AddTodo'
import {OwnerActions} from '@/components/OwnerActions'

export default function Index(): JSX.Element {
  return (
    <div>
      <h1>Evolu Next.js</h1>
      <NotificationBar />
      <TodoList />
      <AddTodo />
      <TodoCategoryList />
      <AddTodoCategory />
      <OwnerActions />
      <p>
        <a href="https://twitter.com/evoluhq">twitter</a>{" "}
        <a href="https://github.com/evoluhq/evolu">github</a>
      </p>
    </div>
  );
}

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
  import {OwnerActions} from '@/components/OwnerActions'
  
  
export  const AddTodo: FC = () => {
    const { create } = useMutation();
  
    return (
      <Button
        title="Add Todo"
        onClick={(): void => {
          prompt(Evolu.NonEmptyString1000, "What needs to be done?", (title) => {
            create("todo", { title, isCompleted: false });
          });
        }}
      />
    );
  };
  
  
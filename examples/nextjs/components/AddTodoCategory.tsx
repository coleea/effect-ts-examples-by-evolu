import {
    NonEmptyString50,
    useMutation,
    useOwner,
    useOwnerActions,
    useQuery,
  } from "@/lib/db";
  import * as Evolu from "evolu";
  import {  FC, useState } from "react";
  import {Button} from '@/components/Button'
  import {NotificationBar} from '@/components/NotificationBar'
  import {TodoItem} from '@/components/TodoItem'
  import {prompt} from '@/lib/prompt'
  import {TodoList} from '@/components/TodoList'
  import {TodoCategoryList} from '@/components/TodoCategoryList'
  
export  const AddTodoCategory: FC = () => {
    const { create } = useMutation();
  
    return (
      <Button
        title="Add Category"
        onClick={(): void => {
          prompt(NonEmptyString50, "Category Name", (name) => {
            create("todoCategory", { name });
          });
        }}
      />
    );
  };
  
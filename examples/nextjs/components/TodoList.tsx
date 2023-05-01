import {
    NonEmptyString50,
    useMutation,
    useOwner,
    useOwnerActions,
    useQuery,
  } from "@/lib/db";
  import * as Evolu from "evolu";
  import {  FC, useState } from "react";
  import {TodoItem} from '@/components/TodoItem'
  
  import {Button} from '@/components/Button'
  import {NotificationBar} from '@/components/NotificationBar'
  import {prompt} from '@/lib/prompt'
  // import * as Schema from "@effect/schema/Schema";
  // import { formatErrors } from "@effect/schema/TreeFormatter";
  
export const TodoList: FC = () => {
    const { rows } = useQuery(
      (db) =>
        db
          .selectFrom("todo")
          .select(["id", "title", "isCompleted", "categoryId"])
          .where("isDeleted", "is not", Evolu.cast(true))
          .orderBy("createdAt"),
      // (row) => row
      ({ title, isCompleted, ...rest }) =>
        title && isCompleted != null && { title, isCompleted, ...rest }
    );
  
    return (
      <>
        <h2 className="mt-6 text-xl font-semibold">Todos</h2>
        <ul className="py-2">
          {rows.map((row) => (
            <TodoItem key={row.id} row={row} />
          ))}
        </ul>
      </>
    );
  };
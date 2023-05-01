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

  
export const TodoCategoryList: FC = () => {
    const { rows } = useQuery(
      (db) =>
        db
          .selectFrom("todoCategory")
          .select(["id", "name"])
          .where("isDeleted", "is not", Evolu.cast(true))
          .orderBy("createdAt"),
      // (row) => row
      ({ name, ...rest }) => name && { name, ...rest }
    );
  
    const { update } = useMutation();
  
    return (
      <>
        <h2 className="mt-6 text-xl font-semibold">Categories</h2>
        <ul className="py-2">
          {rows.map(({ id, name }) => (
            <li key={id}>
              <span className="text-sm font-bold">{name}</span>
              <Button
                title="Rename"
                onClick={(): void => {
                  prompt(NonEmptyString50, "Category Name", (name) => {
                    update("todoCategory", { id, name });
                  });
                }}
              />
              <Button
                title="Delete"
                onClick={(): void => {
                  update("todoCategory", { id, isDeleted: true });
                }}
              />
            </li>
          ))}
        </ul>
      </>
    );
  };
  
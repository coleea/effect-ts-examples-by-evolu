import {
    TodoTable,
    useMutation,
  } from "@/lib/db";
  import * as Evolu from "evolu";
  import {  memo } from "react";
  import {Button} from '@/components/Button'
  import {TodoCategorySelect} from '@/components/TodoCategorySelect'
import {prompt} from '@/lib/prompt'

export const TodoItem = memo<{
    row: Pick<TodoTable, "id" | "title" | "isCompleted" | "categoryId">;
  }>(function TodoItem({ row: { id, title, isCompleted, categoryId } }) {
    const { update } = useMutation();
  
    return (
      <li key={id}>
        <span
          className="text-sm font-bold"
          style={{ textDecoration: isCompleted ? "line-through" : "none" }}
        >
          {title}
        </span>
        <Button
          title={isCompleted ? "completed" : "complete"}
          onClick={(): void => {
            update("todo", { id, isCompleted: !isCompleted });
          }}
        />
        <Button
          title="Rename"
          onClick={(): void => {
            prompt(Evolu.NonEmptyString1000, "New Name", (title) => {
              update("todo", { id, title });
            });
          }}
        />
        <Button
          title="Delete"
          onClick={(): void => {
            update("todo", { id, isDeleted: true });
          }}
        />
        <TodoCategorySelect
          selected={categoryId}
          onSelect={(categoryId): void => {
            update("todo", { id, categoryId });
          }}
        />
      </li>
    );
  });
  
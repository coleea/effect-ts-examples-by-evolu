import {
  NonEmptyString50,
  useMutation,
  useOwner,
  useOwnerActions,
  useQuery,
} from "@/lib/db";
// import * as Schema from "@effect/schema/Schema";
// import { formatErrors } from "@effect/schema/TreeFormatter";
import * as Evolu from "evolu";
import {  FC, useState } from "react";
import {Button} from '@/components/Button'
import {NotificationBar} from '@/components/NotificationBar'
import {TodoItem} from '@/components/TodoItem'
import {prompt} from '@/lib/prompt'
// import {TodoCategorySelect} from '@/components/TodoCategorySelect'

const TodoList: FC = () => {
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

const AddTodo: FC = () => {
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

const TodoCategoryList: FC = () => {
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

const AddTodoCategory: FC = () => {
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

const OwnerActions: FC = () => {
  const [isShown, setIsShown] = useState(false);
  const owner = useOwner();
  const ownerActions = useOwnerActions();

  return (
    <div className="mt-6">
      <p>
        Open this page on a different device and use your mnemonic to restore
        your data.
      </p>
      <Button
        title={`${!isShown ? "Show" : "Hide"} Mnemonic`}
        onClick={(): void => setIsShown((value) => !value)}
      />
      <Button
        title="Restore Owner"
        onClick={(): void => {
          prompt(Evolu.NonEmptyString1000, "Your Mnemonic", (mnemonic) => {
            ownerActions.restore(mnemonic).then((either) => {
              if (either._tag === "Left")
                alert(JSON.stringify(either.left, null, 2));
            });
          });
        }}
      />
      <Button
        title="Reset Owner"
        onClick={(): void => {
          if (confirm("Are you sure? It will delete all your local data."))
            ownerActions.reset();
        }}
      />
      {isShown && owner != null && (
        <div>
          <textarea
            value={owner.mnemonic}
            readOnly
            rows={2}
            style={{ width: 320 }}
          />
        </div>
      )}
    </div>
  );
};


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

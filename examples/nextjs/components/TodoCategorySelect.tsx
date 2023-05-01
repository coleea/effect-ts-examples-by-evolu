import {
    TodoCategoryId,
    useQuery,
  } from "@/lib/db";
  import * as Evolu from "evolu";
  import { ChangeEvent, FC,  } from "react";
  
export const TodoCategorySelect: FC<{
    selected: TodoCategoryId | null;
    onSelect: (value: TodoCategoryId | null) => void;
  }> = ({ selected, onSelect }) => {
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
  
    const nothingSelected = "";
    const value =
      selected && rows.find((row) => row.id === selected)
        ? selected
        : nothingSelected;
  
    return (
      <select
        value={value}
        onChange={({
          target: { value },
        }: ChangeEvent<HTMLSelectElement>): void => {
          onSelect(value === nothingSelected ? null : (value as TodoCategoryId));
        }}
      >
        <option value={nothingSelected}>-- no category --</option>
        {rows.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    );
  };
  
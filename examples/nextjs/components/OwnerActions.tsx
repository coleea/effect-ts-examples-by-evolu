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
  
export  const OwnerActions: FC = () => {
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
  
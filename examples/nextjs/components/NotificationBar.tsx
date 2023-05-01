
import {    useEvoluError, } from "@/lib/db";
import { FC, useEffect, useState } from "react";
import { Button }from "@/components/Button"  

export const NotificationBar: FC = () => {
    const evoluError = useEvoluError();
    const [shown, setShown] = useState(false);
  
    useEffect(() => {
      if (evoluError) setShown(true);
    }, [evoluError]);
  
    if (!evoluError || !shown) return <></>;
  
    return (
      <div>
        <p>{`Error: ${JSON.stringify(evoluError)}`}</p>
        <Button title="Close" onClick={(): void => setShown(false)} />
      </div>
    );
  };
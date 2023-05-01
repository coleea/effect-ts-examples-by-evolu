import * as Schema from "@effect/schema/Schema";
import { formatErrors } from "@effect/schema/TreeFormatter";

export const prompt = <From extends string, To>(
    schema: Schema.Schema<From, To>,
    message: string,
    onSuccess: (value: To) => void
  ): void => {
    const value = window.prompt(message);
    if (value == null) return; // on cancel
    const a = Schema.parseEither(schema)(value);
    if (a._tag === "Left") {
      alert(formatErrors(a.left.errors));
      return;
    }
    onSuccess(a.right);
  };
  
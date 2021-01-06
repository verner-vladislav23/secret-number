import * as yup from 'yup';
import { SchemaOf } from 'yup';

type StartGameSchemaType = {
  level?: number;
}

type MoveGameSchemaType = {
  id: number;
  secretNumber: string;
}

const startGameSchema: SchemaOf<StartGameSchemaType> = yup.object({
  level: yup
    .number()
    .strict()
});

const moveGameSchema: SchemaOf<MoveGameSchemaType> = yup.object({
  id: yup
    .number()
    .required(),
  secretNumber: yup
    .string()
    .strict()
    .required()
});

export {
  startGameSchema,
  moveGameSchema,
}

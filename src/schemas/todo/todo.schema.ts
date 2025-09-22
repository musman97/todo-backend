import Type from "typebox";

export const todoSchemas = {
    idParam: Type.Object(
        {
            id: Type.Number({ minimum: 1 }),
        },
        { additionalProperties: false },
    ),
} as const;

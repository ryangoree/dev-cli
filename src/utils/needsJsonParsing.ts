// import { z } from 'zod/v4';

// function needsJsonParsing(schema: z.ZodType): boolean {
//   // Handle optional, nullable, and other wrapper types
//   let unwrapped = schema.;

//   // Use the new utility methods to unwrap
//   while (unwrapped.isOptional() || unwrapped.isNullable()) {
//     unwrapped = (unwrapped as any).unwrap();
//   }

//   // Use the new _zod.def.type property
//   const typeName = unwrapped._zod.def.type;
//   return (
//     typeName === 'object' ||
//     typeName === 'record' ||
//     typeName === 'array' ||
//     typeName === 'map'
//   );
// }

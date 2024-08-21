"use server";

import { signIn } from "@/auth";
import {
  YupValidationError,
  convertFormDataToJSON,
  response,
  transformYupErrors,
} from "@/helpers/form-validation";
import { AuthSchema } from "@/helpers/schemas/auth-schema";

//import { signIn } from "next-auth/react";


export const loginAction = async (prevState, formData) => {
  const fields = convertFormDataToJSON(formData);

  try {
    AuthSchema.validateSync(fields, { abortEarly: false });

     await signIn("credentials", fields);
  

  } catch (err) {
    if (err instanceof YupValidationError) {
      return transformYupErrors(err.inner);
    } 

    throw err;
  }
};

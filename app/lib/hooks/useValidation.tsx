import { FormInstance, FormRule, Form } from "antd";
import {z} from 'zod'

/**
 * 
 * this hooks is to leveage zod to use with antd useForm hooks for form validation
 * 
 * @param schema any zod schema
 * @returns [form, rule] form instance and form rule
 */

export const useValidation = <T,>(schema: z.ZodObject<any, any, any, T>): [FormInstance<T>, FormRule] => {
    const [form] = Form.useForm();
    const rule = {
      async validator({ field }: any) {
        const object = form.getFieldsValue();
        const result = await schema.safeParseAsync(object);
        if (result.success) return;
        const issues = result.error.issues.filter((x) => x.path[0] == field);
        const message = issues[0]?.message;
        if (message) throw new Error(message);
      },
    };
    return [form, rule];
  };
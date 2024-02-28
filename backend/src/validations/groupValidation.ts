import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
const groupSchema = vine.object({
  name: vine.string().minLength(2).maxLength(30),
  user_id: vine.string().minLength(1),
  description: vine.string().minLength(10).maxLength(400),
});

const groupValidator = vine.compile(groupSchema);

export default groupValidator;

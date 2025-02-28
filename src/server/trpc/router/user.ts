import { router } from "../trpc";
import { read } from "./user/read";

export const userRouter = router({
  getCurrentUser: read,
});

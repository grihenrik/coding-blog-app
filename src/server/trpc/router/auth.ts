import { useContext } from "react";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    const { session } = ctx;
    if (!session) {
      throw new Error("No session found");
    }
    const { userId, setUserId } = useContext(GlobalContext);
    if (!userId && session.user) setUserId(session.user.id);
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

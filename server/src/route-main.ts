// import userRouter from "./components/User/Customer/userRoutes";
// import customerRouter from "./components/User/Auth/Client/customerRoutes";
// import staffRouter from "./components/User/Staff/staffRoutes";

import userRouter from "./components/User/userRoutes";
import authRouter from "./components/Auth/authRoutes";
import menuRouter from "./components/Menu/menuRoutes";
import ingredientRouter from "./components/Ingredient/ingredientRoutes";
import nutriRouter from "./components/Nutrition/nutriRoutes";
import orderRouter from "./components/Order/orderRoutes";
import notificationRouter from "./components/Notification/notificationRoutes";
import shiftRouter from "./components/Shift/shiftRoutes";
import dashboardRouter from "./components/Dashboard/dashboardRoutes";
import vnpayRouter from "./components/Payment/vnpayRoutes";
import menuitemingredientsRouter from "./components/MenuItemIngredient/menuitemingredientsRoutes";

const initRoutes = (app: any) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);

  app.use("/api/menu", menuRouter);
  app.use("/api/ingredient", ingredientRouter);
  app.use("/api/nutrition", nutriRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/shift", shiftRouter);
  app.use("/api/chart", dashboardRouter);
  app.use("/api/vnpay", vnpayRouter);
  app.use("/api/menuitemingredients", menuitemingredientsRouter);
};

export default initRoutes;

import env from "@/configs/env";
import app from "@/app";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

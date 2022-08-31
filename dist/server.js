"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT || 5050;
app_1.app.listen(PORT, () => {
    console.log(`Server it's running in PORT: http://localhost:${PORT}`);
});

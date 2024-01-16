"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const login_1 = require("../controllers/login");
const getUserData_1 = require("../controllers/getUserData");
const checkAuthToken_1 = require("../middleware/checkAuthToken");
const logout_1 = require("../controllers/logout");
const updateUser_1 = require("../controllers/updateUser");
const deleteUsers_1 = require("../controllers/deleteUsers");
const getAllUsers_1 = require("../controllers/getAllUsers");
const router = (0, express_1.Router)();
router.post('/registerUser', controller_1.registerUser);
router.route('/loginUser').post(login_1.loginUser);
router.get('/getuserdata/:id', checkAuthToken_1.checkAuth, getUserData_1.getuserdata);
router.get('/logout', logout_1.logout);
router.put('/user/:id', checkAuthToken_1.checkAuth, updateUser_1.updateUser);
router.delete('/user/:id', checkAuthToken_1.checkAuth, deleteUsers_1.deleteUser);
router.get('/getAllUsers', getAllUsers_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=route.js.map
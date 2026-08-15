"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRegisteredUserData = void 0;
const toRegisteredUserData = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.map((x) => x.description),
        settings: user.user_settings,
    };
};
exports.toRegisteredUserData = toRegisteredUserData;
//# sourceMappingURL=mapper.js.map
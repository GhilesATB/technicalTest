const {unauthorized, unauthenticated} = require("../errors/userError");

exports.hasAccessTo = async (user, permission) => {

    if(!user) {
        throw unauthenticated();
    }

    const results = await user?.getPermissions(user?.id);
    const hasAccess = results?.map((element) => element?.permission_name).includes(permission);

    if(!hasAccess) {
        throw unauthorized();
    }
}
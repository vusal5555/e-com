const { UnauthenticatedError } = require("../errors/index");

const checkPermissions = (requestUser, resourceId) => {
  console.log(requestUser);

  if (requestUser.role === "admin") return;
  if (requestUser.Id === resourceId.toString()) return;
  throw new UnauthenticatedError("Not authorized to access this route");
};

module.exports = checkPermissions;

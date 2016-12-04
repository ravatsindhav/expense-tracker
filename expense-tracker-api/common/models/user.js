'use strict';

module.exports = function(User) {

    User.getRoles = function (id, cb) {
      User.getApp(function (err, app) {
        if (err) throw err;
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;
        RoleMapping.find({ where : { principalId: id }}, function (err, roleMappings) {
            var roleIds = roleMappings.map(function (roleMapping) {
            return roleMapping.roleId;
            });
            var conditions = roleIds.map(function (roleId) {
            return { id: roleId };
            });
            Role.find({ where: { or: conditions}}, function (err, roles) {
            if (err) throw err;
            var roleNames = roles.map(function(role) {
                return role.name;
            });
            cb(null, roleNames);
        });
      });
    });
  };
  User.remoteMethod('getRoles', {
    description: 'Queries roles of user.',
    http: { path: '/:id/roles', verb: 'get' },
    accepts: {arg: 'id', type: 'string', required: 'true', description: 'User Id'},
    returns: {type: 'array', root: true},
    isStatic: true
  });
  
  User.disableRemoteMethod("create", true);
  User.disableRemoteMethod("upsert", true);
  User.disableRemoteMethod("upsertWithWhere", true);
  User.disableRemoteMethod("updateAll", true);
  User.disableRemoteMethod("updateAttributes", false);
  User.disableRemoteMethod("replaceOrCreate", true);
  User.disableRemoteMethod("replaceById", true);
  User.disableRemoteMethod("find", true);
  User.disableRemoteMethod("findById", true);
  User.disableRemoteMethod("findOne", true);
  User.disableRemoteMethod("deleteById", true);
  User.disableRemoteMethod("confirm", true);
  User.disableRemoteMethod("count", true);
  User.disableRemoteMethod("exists", true);
  User.disableRemoteMethod("resetPassword", true);
  User.disableRemoteMethod('createChangeStream', true);	

  User.disableRemoteMethod('__count__accessTokens', false);
  User.disableRemoteMethod('__create__accessTokens', false);
  User.disableRemoteMethod('__delete__accessTokens', false);
  User.disableRemoteMethod('__destroyById__accessTokens', false);
  User.disableRemoteMethod('__findById__accessTokens', false);
  User.disableRemoteMethod('__get__accessTokens', false);
  User.disableRemoteMethod('__updateById__accessTokens', false);

  User.disableRemoteMethod('__create__expenses', false);
  User.disableRemoteMethod('__delete__expenses', false);
  User.disableRemoteMethod('__findById__expenses', false);
  User.disableRemoteMethod('__updateById__expenses', false);
  User.disableRemoteMethod('__destroyById__expenses', false);
  User.disableRemoteMethod('__count__expenses', false);
};

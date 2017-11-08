import "/imports/startup/server";
// For production, user findOne instead of update
Meteor.users.allow({
  update: function(userId, user){
    return true;
  }
});

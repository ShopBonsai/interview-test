import "/imports/startup/server";
Meteor.users.allow({
  update: function(userId, user){
    return true;
  }
});

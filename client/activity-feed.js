
ActivityItems = new Mongo.Collection(null);

Template.activity_feed.onCreated(function(){
  ActivityItems.remove({});
  Meteor.call('getActivityFeed', function(err, feedItems){
    if(err){
      throw err
    }
    _.each(feedItems, function(feedItem){
      ActivityItems.insert(feedItem);
    })
  })
});

Template.activity_feed.helpers({
  populatedFeedItems: function(){
    return ActivityItems.find({}, {sort: {published: -1}});
  }
});
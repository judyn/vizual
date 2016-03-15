SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
});

// stream track id 293
SC.stream('/tracks/293').then(function(player){
  player.play();
});
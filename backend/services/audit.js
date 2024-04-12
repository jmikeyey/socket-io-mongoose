const setupChangeStream = (socket) => {
  const { MongoClient } = require('mongodb');
  const Notes = require('../model/notesModel');

  try {
    const changeStream = Notes.watch();

    changeStream.on('change', (change) => {
      console.log('Change detected:');
      console.log(change);
      socket.emit('event', change);
    });
    // console.log('Change stream set up successfully.');
  } catch (error) {
    console.error('Error setting up change stream:', error);
  }
};

module.exports = { setupChangeStream };
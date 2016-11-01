import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tchats = new Mongo.Collection('tchats');

if (Meteor.isServer) {
  // Ce code se lance uniquement coté serveur
  Meteor.publish('tchats', function tchatsPublication() {
    return Tchats.find({
      $or: [{
        private: {
          $ne: true
        }
      }, {
        owner: this.userId
      }, ],
    });
  });
}

Meteor.methods({
  'tchats.insert' (text) {
    check(text, String);

    // On verifie que l'utilisateur existe avant d'insérer le message
    if (!Meteor.userId()) {
      throw new Meteor.Error('Vous n\'êtes pas autoriser à faire ça !');
    }
    Tchats.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'tchats.setPrivate' (tchatId, setToPrivate) {
    check(tchatId, String);
    check(setToPrivate, Boolean);

    const tchat = Tchats.findOne(tchatId);

    // On s'assure que les propriétaire peuvent créer un message privé
    if (tchat.owner !== Meteor.userId()) {
      throw new Meteor.Error('Vous n\'êtes pas autorisé');
    }
  },
});

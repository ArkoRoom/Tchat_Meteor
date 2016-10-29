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
  'tchats.remove' (tchatId) {
    check(tchatId, String);

    const tchat = Tchats.findOne(tchatId);
    if (tchat.private && tchat.owner !== Meteor.userId()) {
      // On s'assure que seul le propriétaire du message peut le supprimer
      throw new Meteor.Error('Vous n\'êtes pas autorisé à faire ça');
    }

    Tchats.remove(tchatId);
  },
  'tchats.setChecked' (tchatId, setChecked) {
    check(tchatId, String);
    check(setChecked, Boolean);

    const tchat = Tchats.findOne(tchatId);
    if (tchat.private && tchat.owner !== Meteor.userId()) {
      // On s'assure que seul le propriétaire puisse la mettre sur off si privé
      throw new Meteor.Error('Vous n\'êtes pas autorisé à faire ça');
    }

    Tchats.update(tchatId, {
      $set: {
        checked: setChecked
      }
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

    Tchats.update(tchatId, {
      $set: {
        private: setToPrivate
      }
    });
  },
});

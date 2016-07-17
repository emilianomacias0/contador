Contadores = new Mongo.Collection('contadores');

Maquinas = new Mongo.Collection('maquinas');
if (Meteor.isServer) {
	Meteor.publish('LaMaquinas',function(){
	var usuario = this.userId;
	return Maquinas.find({creadoPor:usuario});
});
Meteor.publish('LosContadores',function(){
	return Contadores.find();
});

}


if (Meteor.isClient) {
	Meteor.subscribe('LaMaquinas');
	Meteor.subscribe('LosContadores');
}


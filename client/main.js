Template.formulario.events({
	'submit form':function(evt){
		evt.preventDefault();

		var ubicacion = evt.target.ubicacion.value;
		var alias = evt.target.alias.value;
		var tipo = evt.target.tipo.value;
		Maquinas.insert({tipo:tipo,alias:alias,ubicacion:ubicacion,creadoEl:new Date()});
		evt.target.ubicacion.value = '';
		evt.target.alias.value='';
		evt.target.tipo.value='';



	}
});

Template.menu.helpers({
	maquinas:function(){
		return Maquinas.find();
	}
});
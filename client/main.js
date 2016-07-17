Template.formulario.events({
	'submit form':function(evt){
		evt.preventDefault();

		var ubicacion = evt.target.ubicacion.value;
		var alias = evt.target.alias.value;
		var tipo = evt.target.tipo.value;
		var procentajeComision = parseInt(evt.target.comision.value);
		var denominacion = parseInt(evt.target.denominacion.value);
		Maquinas.insert({tipo:tipo,alias:alias,ubicacion:ubicacion,comision:procentajeComision,denominacion:denominacion,creadoEl:new Date()});
		evt.target.ubicacion.value = '';
		evt.target.alias.value='';
		evt.target.tipo.value='';
		evt.target.comision.value='';
		evt.target.denominacion.value='';



	}
});

Template.menu.helpers({
	maquinas:function(){
		return Maquinas.find();
	}
});

Template.datosMaquina.events({
'blur #entrada':function(evt){
	var entrada = evt.target.value;
	var comision = this.comision;
	var denominacion = this.denominacion;
	Session.set('comision',comision);
	Session.set('denominacion',denominacion);
	Session.set('entrada',entrada);
},
'blur #salida':function(evt){
	var comision = this.comision;
	var denominacion = this.denominacion;
	Session.set('comision',comision);
	Session.set('denominacion',denominacion);
	var salida = evt.target.value;
	Session.set('salida',salida);
}
});

Template.datosMaquina.helpers({
 total_recaudado:function(){
 	var entrada = parseInt(Session.get('entrada'));
 	var salida = parseInt(Session.get('salida'));
 	var denominacion = parseInt(Session.get('denominacion'));
 	var total = entrada - salida;
 	Session.set('total_recaudado',total);
 	total = (entrada - salida)*denominacion;
 	return accounting.formatMoney(total);
 },
 total_comision:function(){
 	var total_recaudado = parseInt(Session.get('total_recaudado'));
 	var porcentaje = parseInt(Session.get('comision'));
 	var denominacion = parseInt(Session.get('denominacion'));
 	var pesosTotal = total_recaudado * denominacion;
 	var totalComision = (pesosTotal*porcentaje)/100;
 	var total = pesosTotal - totalComision;
 	Session.set('total',total);
 	return accounting.formatMoney(totalComision);
 },
 total:function(){
 	var total = parseInt(Session.get('total'));
 	return accounting.formatMoney(total);
 }
});
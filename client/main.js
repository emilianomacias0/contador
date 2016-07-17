Template.formulario.events({
	'submit form':function(evt){
		evt.preventDefault();
		var usuario = Meteor.userId();
		var ubicacion = evt.target.ubicacion.value;
		var alias = evt.target.alias.value;
		var tipo = evt.target.tipo.value;
		var procentajeComision = parseInt(evt.target.comision.value);
		var denominacion = parseInt(evt.target.denominacion.value);
		Maquinas.insert({
			tipo:tipo,alias:alias,
			ubicacion:ubicacion,
			comision:procentajeComision,
			denominacion:denominacion,
			creadoPor:usuario,
			creadoEl:new Date()
		});
		evt.target.ubicacion.value = '';
		evt.target.alias.value='';
		evt.target.tipo.value='';
		evt.target.comision.value='';
		evt.target.denominacion.value='';



	}
});

Template.menu.helpers({
	maquinas:function(){
		return Maquinas.find({});
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
},
'submit form':function(evt){
	evt.preventDefault();
	var fecha = new Date(evt.target.fecha.value);
	var conEnt = parseInt(evt.target.conEntrada.value);
	var conSal = parseInt(evt.target.conSalida.value);
	var totalRec = accounting.unformat(evt.target.total_rec.value);
	var totalCom = accounting.unformat(evt.target.total_com.value);
	var total = accounting.unformat(evt.target.total.value);
	var id = this._id;
	if(Session.get('total') != 0){
	if(confirm('Los Datos son Correctos?')){
			Contadores.insert({
		idMaquina:id,
		fecha:fecha,
		contadores_entrada:conEnt,
		contadores_salida:conSal,
		total_recaudado:totalRec,
		total_comision:totalCom,
		total:total,
		creadoEl:new Date()
	});
			Session.set('comision',0);
			Session.set('denominacion',0);
			Session.set('salida',0);
			Session.set('entrada',0);
			Session.set('total_recaudado',0);
			Session.set('total',0);
			evt.target.fecha.value = '';
			evt.target.conSalida.value = '';
			evt.target.conEntrada.value ='';

		}
	}else{
		alert("Debes llenar todos los campos");
	}
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
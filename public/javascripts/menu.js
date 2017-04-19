$(document).ready(function(){
  //activa la opcion de submenu en el navbar
  $('[data-submenu]').submenupicker();

  //se ejecuta al submit de el boton para cargar el archivo de informacion satisfaccion
  $('#uploadformsatisfaccion').submit(function(event){
    var cx = comprueba_extension($('#filesatisfaccion').val());
    if(cx===0) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Seleccione un archivo!!');
    }
    else if(cx===1) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Formato de archivo no valido!!');
    }
    else{
      loadfile('/uploadfilesatisfaccion','filesatisfaccion');
    }
    event.preventDefault();
  });

  //se ejecuta al submit de el boton para cargar el archivo de informacion cohorte
  $('#uploadformcohorte').submit(function(event){
    var cx = comprueba_extension($('#filescohorte').val());
    if(cx===0) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Seleccione un archivo!!');
    }
    else if(cx===1) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Formato de archivo no valido!!');
    }
    else{
      loadfile('/uploadfilecohorte','filescohorte');
    }
    event.preventDefault();
  });

  //se ejecuta al submit de el boton para cargar el archivo de informacion periodo
  $('#uploadformperiodo').submit(function(event){
    var cx = comprueba_extension($('#filesperiodo').val());
    if(cx===0) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Seleccione un archivo!!');
    }
    else if(cx===1) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Formato de archivo no valido!!');
    }
    else{
      loadfile('/uploadfileperiodo','filesperiodo');
    }
    event.preventDefault();
  });

  //se ejecuta al submit de el boton para cargar el archivo de informacion del nivel de formacion docentes
  $('#uploadformacion').submit(function(event){
    var cx = comprueba_extension($('#fileformacion').val());
    if(cx===0) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Seleccione un archivo!!');
    }
    else if(cx===1) {
      $('#mesage span').addClass('glyphicon glyphicon-alert');
      $('#mesage p').html('Formato de archivo no valido!!');
    }
    else{
      loadfile('/uploadfileformacion','fileformacion');
    }
    event.preventDefault();
  });

  //se ejecuta al dar click para recuperar contraseña
  $('#frmrecover').submit(function(event){
    var formData = {
          'user': $('#txtreuser').val(),
        };
    $.ajax({
     type: "POST", //el el tipo de peticion puede ser GET y POsT
     url: "validarestart", //la url del que realizara la consulta
     data: formData, //los datos que seran enviados al server
     dataType : 'json', //el formato de datos enviados y devueltos del server
     //se ejecutasi todo se realiza bien
     success : function(json) {
       //aqui comprobamos que si el resultado existe lo redirecciona al siguiente pagina
       if(json>0){
         $("#resrecover").text("Por favor reviza tu bandeja de entrada." );
       }else{
         $("#resrecover").text("EL usuario no existe, vuelve a intentar." );
       }
     }
    });
    event.preventDefault();
  });
});


//se invoca para generar el pdf del reporte
function getPDF(){

  //se inicia el servidor de reportes
  jsreport.serverUrl = 'https://localhost:5489';

  //areglo para contener todo lo que se envia a el reporte
  var atrind=[];

  //se saca la info basica del Indicador para el reporte
  for (var i = 1; i < 19; i++) {
    atrind.push($("#atrinfo"+i).val());
  }

  //se saca la tabla de resultados para el reporte
  var tabres = $('#divtab').html().toString();
  atrind.push(tabres);

  //se saca la info de la calificacion y lectura del reporte
  atrind.push($('#txtcal').val().replace(/\n/g,'<br>'));
  atrind.push($('#txtlec').val().replace(/\n/g,'<br>'));

  //se obtiene el svg de la grafica 1
  var $g1 = $('#divg1 div.amcharts-main-div div.amcharts-chart-div').html();
  var img1 = svgtoimg($g1);
  atrind.push(img1);

  //se obtiene si existe una leyend en la primera grafica
  var $gle1 = $('#divg1 div.amcharts-main-div div.amChartsLegend.amcharts-legend-div').html()
  if($gle1 != 'undefined'){
    var imgle1 = svgtoimg($gle1);
    atrind.push(imgle1);
  }else{
    atrind.push("");
  }

  //se obtiene el svg de la grafica 2
  var $g2 = $('#divg2 div.amcharts-main-div div.amcharts-chart-div').html();
  var img2 = svgtoimg($g2);
  atrind.push(img2);

  //se obtiene si existe una leyend en la segunda grafica
  var $gle2 = $('#divg2 div.amcharts-main-div div.amChartsLegend.amcharts-legend-div').html()
  if($gle2 != 'undefined'){
    var imgle2 = svgtoimg($gle2);
    atrind.push(imgle2);
  }else{
    atrind.push("");
  }


  //se crea la variable que contiene todo las configuraciones para e reportes
  var request = {
    template: {
      "shortid":"B1E4W75Ke",
      "engine ":"none",
      "recipe" : "phantom-pdf"
    },
    data: {
      "proceso":atrind[0],
      "lider":atrind[1],
      "objproceso":atrind[2],
      "nombreindi":atrind[3],
      "atrmedir":atrind[4],
      "objcalidad":atrind[5],
      "tipoindi":atrind[6],
      "frecuencia":atrind[7],
      "percalculo":atrind[8],
      "tendencia":atrind[9],
      "meta":atrind[10],
      "objindicador":atrind[11],
      "rango":atrind[12],
      "formula":atrind[13],
      "modografica":atrind[14],
      "puntoregistro":atrind[15],
      "responcalculo":atrind[16],
      "instructivo":atrind[17],
      "resultindi":atrind[18],
      "calificacion":atrind[19],
      "lectura":atrind[20],
      "grafica1":atrind[21],
      "grafica2":atrind[23],
      "leyend1":atrind[22],
      "leyend2":atrind[24],
    },
    options: {
      preview:true,
      "Content-Disposition": "filename=myreport.pdf",
      "authorization": {
        "grantEdit": true
      }
    }
   };

   jsreport.headers['Content-Type'] = "application/json " ;
   jsreport.headers['Authorization'] = "Basic " + btoa("report:123");


  //  jsreport.renderAsync(request).then(function(res) {
  //    console.log(res);
   //
  //    //open in new window
  //    window.open(res.toDataURI())
   //
  //    //open download dialog
  //    res.download('test.pdf')
  //  });
   var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

   if(!isOpera){
    //  alert('hola')
     jsreport.render('_blank', request);

   }else{
     jsreport.download('myReport.pdf', request);
   }

}

//funcion para sacar el svg y convertirlo en imagen
function svgtoimg(svgdiv){
  var $g = svgdiv;
  if($g){
    var arr = $g.split('<a');
    var svg = arr[0];
    if(svg){
      svg = svg.replace(/\r?\n|\r/g, '').trim();

      //se obtiene la img en base64 de grafica 1
      var canvasg = document.createElement("canvas");
      var contextg = canvasg.getContext("2d");
      contextg.clearRect(0, 0, canvasg.width, canvasg.height);
      canvg(canvasg, svg);
      var imgData = canvasg.toDataURL('image/png');

      return imgData
    }
  }
  return "";
}

//se invoca para editar los informes
function editRepor(){

  //se oculta y visibiliza los botones del formulario
  $("#btnsave").css('visibility','visible');
  $("#btnedit").css('visibility','hidden');
  $("#btnpdf").css('visibility','hidden');

  //se recorre los atributos del infomre y se quita el solo lectura

  for (var i = 1; i < 24; i++) {
    $("#atrinfo"+i).removeAttr('readonly');
  }
}

//funcion para guardar cambios de los reportes por parte del susuario administrador
function saveReport(){
  var formData = {};
  for (var i = 1; i < 24; i++) {
    formData['atr'+i]=$("#atrinfo"+i).val();
  }
  formData['indser']=$("#txtindser").val();

  $.ajax({
   type: "POST", //el el tipo de peticion puede ser GET y POsT
   url: "manuales", //la url a la  que se realizara la consulta
   data : formData,
   dataType : 'json',
   success : function(json) {
     //se oculta y visibiliza los botones del formulario
     $("#btnsave").css('visibility','hidden');
     $("#btnedit").css('visibility','visible');
     $("#btnpdf").css('visibility','visible');

     for (var i = 1; i < 19; i++) {
       if(!$("#atrinfo"+i).attr('readonly'))
         $("#atrinfo"+i).attr('readonly','readonly');
     }

     if(json>0){
       $("#lblupdreport").html('Actualización Correcta.');
       setTimeout(function(){
         $("#lblupdreport").html('');
       },1000);
     }
   }
  })
}

//abre el modal de reportes
function openmodalreport(){
  $("#modalinfo").modal('show');

  //se oculta y visibiliza los botones del formulario
  $("#btnsave").css('visibility','hidden');
  $("#btnedit").css('visibility','visible');
  $("#btnpdf").css('visibility','visible');

  for (var i = 1; i < 24; i++) {
    if(!$("#atrinfo"+i).attr('readonly'))
      $("#atrinfo"+i).attr('readonly','readonly');
  }

  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  uploadatareport($("#txtindser").val());

  $("#fecha").html(""+day+" de "+meses[month]+" de "+year);
  $("#divtab").html($("#divtable").html());
  $("#divg1").html($("#divgraph1").html());
  $("#divg2").html($("#divgraph2").html());


}

//llamado ajax para traer informacion de datos del inidcador
function uploadatareport(serialindi){
  $.ajax({
   type: "GET", //el el tipo de peticion puede ser GET y POsT
   url: "manuales", //la url del que realizara la consulta
   dataType : 'json',
   data:{c:serialindi},//Primera consulta
   //se ejecutasi todo se realiza bien
   success : function(json) {
     for (var i = 0; i < 23; i++) {
       if(i===3 && serialindi===1 || i===3 && serialindi===6 || i===3 && serialindi===7)
          $("#atrinfo"+(i+1)).val(json[i]+" "+$("#programa").html());
       else
          $("#atrinfo"+(i+1)).val(json[i])
     }
   },
   error : function(xhr, status) {
        alert('Disculpe, existió un problema');
    },
 });
}

//abre modal de cargar datos satisfaccion
function openmodaluploadsatisfaccion(){
  $("#modaluploadsatisfaccion").modal('show');
  $('#mesage').html("");
}

//abre modal para cargar datos de formacion docentes
function openmodaluploadFormacion(){
  $("#modaluploadFormacion").modal('show');
  $('#mesage').html("");

}

//abre modal cargar datos desercion por cohorte
function openmodaluploadcohorte(){
  $("#modaluploadcohorte").modal('show');
  $('#mesage').html("");
}

//abre modal cargar datos desercion por periodo
function openmodaluploadperiodo(){
  $("#modaluploadperiodo").modal('show');
  $('#mesage').html("");
}

//abre modal para login de la aplicacion
function openmodallogin(){
  $("#modalrestart").modal('hide');
  $("#modallogin").modal('show');
}

//abre modal cambio contraseña
function openmodalrestart(){
  $("#modallogin").modal('hide');
  $("#modalrestart").modal('show');
}

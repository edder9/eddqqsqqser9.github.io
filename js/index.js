let jsonDatas;
let jsonDataRepInfo;
let jsonAtribuciones;
//alert(location.host)

//window.screen.orientation
//    .lock("landscape-primary")
//    .then(
//        success => console.log(success),
//        failure => console.log(failure)
//    )
//
//
//
//
//window.addEventListener("orientationchange", function(){
//  console.log(screen.orientation.type); // e.g. portrait
//
//  console.log(screen);
//});
//
//screen.orientation.lock('landscape');

//SPLASH
$(document).ready(function () {
  var anchor = location;
  var result = anchor.pathname;

  
    location.pathname = "/vbetas/appTram/Beta/";
  

  document.getElementById("optionsDiv2").style.display = "none";
  document.getElementById("tablaDatos").style.marginTop = "none";

  $(".loader-wrapper").addClass("is-active");
  $("body").fadeIn(800);
  /*NAVIgation*/
  ocultarMapa();
  $(".item").click(function () {
    $(".item").removeClass("activeBtn");
    $(this).addClass("activeBtn");
  });

  /*FIN*/
  $(".navbar").css("display", "none");
  $("#menu").css("display", "none");

  setTimeout(function () {
    $(".loader-wrapper").removeClass("is-active");
    $(".navbar").css("display", "block");
    $("#menu").css("display", "block");
  }, 4000);
  //FIN SPLASH

  setTimeout(() => {
    //CARDS BULMA
    $("#server").click(function () {
      $("#server-content").toggleClass("is-hidden");
    });
    //FIN CARDS BULMA

    //Load JSON
    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/index.json",
      function (json) {
        jsonDatas = json;
      }
    );

    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/reporteInfo.json",
      function (json) {
        jsonDataRepInfo = json;
        console.log(jsonDataRepInfo);
      }
    );

    $.getJSON(
      //"https://raw.githubusercontent.com/edder9/app/main/index.json",
      "json/atribuciones.json",
      function (json) {
        jsonAtribuciones = json;
        console.log(jsonAtribuciones);
      }
    );

    page("/vbetas/appTram/Beta/", index);
    //page("*", notFound);
    page("/vbetas/appTram/Beta/buscar", buscar);
    page("/vbetas/appTram/Beta/info", informacionACD);
    page("/vbetas/appTram/Beta/mapa", mapa);
    page("/tramites", tramites);
    page("/atribuciones", atribuciones);
    page("/atribuciones/:tema/:id", atribucionesTema);
    page("/dependencias", dependencias);
    //page("/dependencias/:urs/", urs);
    page("/dependencias/:id", idDependenciaDet);
    page("/dependencias/:id/:detalle", detalleDependencia);
    page("/dependencias/:id/:detalle/:temas", dependenciaTemas);
    page("/temas", temas);
    page("/temas/:id/", temasDetalle);
    page("/temas/:id/:sadt", temasDetSADT);
    page("/temas/:id/:sadt/:idSelect", temasSelect);
    page("/apoyos", tramites);
    page("/servicios", tramites);
    page("/reporte", reporte);
    page("/reporte/:detalle", detalleReportes);
    page("/informacion", informacion);

    page();
    //FIN LOAD JSON
  }, 2500);
});

function reporte(ctx) {
  muestraRegresa();
  $("section").css("padding", "5rem 1.5rem 5rem");
  console.log(ctx);
  $("#menu").html("");
  document.getElementById("tituloNav").innerHTML =
    "REPORTE AMBIENTAL CIUDADANO";

  // const contenedorReporte = document.createElement("div");
  // contenedorReporte.classList = "is-fluid";
  // contenedorReporte.style.marginTop = "3em";
  //
  // $("#menu").append(contenedorReporte);
  //
  // const DivContainerReporte = document.createElement("div");
  // DivContainerReporte.classList = "";
  //
  // $("#menu").append(DivContainerReporte);

  const DBReporte = TAFFY(jsonDataRepInfo);

  const reporteTotal = DBReporte({ tipo: "reporteAMC" }).get();

  for (let i = 0; i < reporteTotal.length; i++) {
    const elemento = reporteTotal[i];

    // const botonesURS = document.createElement("a");
    // botonesURS.classList = "button";
    // botonesURS.id = elemento.tipo;
    // botonesURS.innerHTML =
    //   `<div class="is-mobile"><img src="` +
    //   elemento.img +
    //   `"><p class=""is-small>` +
    //   elemento.titulo +
    //   `</p></div>`;
    // botonesURS.href = ctx.path + "/" + elemento.id;
    // //  crearHref.appendChild(botonesURS);
    // DivContainerReporte.appendChild(botonesURS);

    $("#menu").append(
      `
    <div class="card">
  <header class="card-header">
    <a class="" id="` +
        elemento.id +
        `" href="` +
        ctx.pathname +
        "/" +
        elemento.id +
        `"><div class="row"><div class="col-4 "><img class="imgTemasSizeRep" src="` +
        elemento.img +
        `"></div><div class="col-8 centerTxt">` +
        elemento.titulo +
        `</div></div></a>
  </header>
</div>
    `
    );
  }
}

function detalleReportes(ctx) {
  console.log(ctx);
  $("section").css("padding", "4rem 1.2rem");
  $("#menu").html("");
  const DBReporte = TAFFY(jsonDataRepInfo);

  const reporteTotal = DBReporte({ id: ctx.params.detalle }).get();
  const createheaderImg = document.createElement("figure");
  createheaderImg.classList = "image";

  const ImgReporte = document.createElement("img");
  ImgReporte.src = reporteTotal[0].imgbck;
  $("#menu").append(createheaderImg);
  $("#menu").append(`<p>` + reporteTotal[0].describe + `</p>`);

  if (reporteTotal[0].id == "reporteCiudadano") {
    $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe157;</span></div>
     <div class="col-10"> <a target="_blank" href="` +
        reporteTotal[0].link +
        `">` +
        reporteTotal[0].tituloCorto +
        `</a></div></div>`
    );
    $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
     <div class="col-10"><a href='tel:` +
        reporteTotal[0].telefono +
        `' class='disable-link' cm_dontconvertlink">` +
        reporteTotal[0].telefono +
        `</a></div></div>`
    );
  } else {
    $("#menu").append(
      `<div class="row">
      <div class="col-2"><span class="material-icons">&#xe0b0;</span></div>
     <div class="col-10"><a href='tel:` +
        reporteTotal[0].telefono +
        `' class='disable-link' cm_dontconvertlink">` +
        reporteTotal[0].telefono +
        `</a></div></div>`
    );
  }

  createheaderImg.append(ImgReporte);
  // contenedorReporte.append(createheaderImg)

  console.log(reporteTotal);
}

function informacion(ctx) {
  muestraRegresa();
  console.log(ctx);
  $("#menu").html("");
  document.getElementById("tituloNav").innerHTML = "INFORMACIÓN";

  const DBReporteInfo = TAFFY(jsonDataRepInfo);

  const informacionTotal = DBReporteInfo({ tipo: "informacion" }).get();

  const DivButtons = document.createElement("DIV");
  DivButtons.classList = "container";
  DivButtons.style.marginTop = "10%";

  $("#menu").append(DivButtons);

  for (let i = 0; i < informacionTotal.length; i++) {
    const element = informacionTotal[i];
    const crearHref = document.createElement("a");
    //crearHref.href = ctx.pathname+element;

    const botonesURS = document.createElement("a");
    botonesURS.classList =
      "btnLink button is-small is-fullwidth vertical-center";
    botonesURS.id = element.tipo;
    botonesURS.innerHTML = element.titulo;
    botonesURS.rel = element.link;
    botonesURS.target = "_blank";
    //crearHref.appendChild(botonesURS);
    //DivButtons.appendChild(botonesURS);

    $("#menu").append(
      `<div class="row button btnLink">
      <div class="col-4"><img src="` +
        element.img +
        `"></div>
     <div class="col-8" style="text-align: left;
     font-size: 0.8rem;"><a href="` +
        element.link +
        `">` +
        element.titulo +
        `</a></div></div>`
    );
  }
  //$(".btnLink").click(function (e) {
  //  showHelp(e.target.rel);
  //});
}

function temas(ctx) {
  muestraRegresa();
  console.log(ctx);
  const DBtramites = TAFFY(jsonDatas);
  $("#menu").html("");
  document.getElementById("tituloNav").innerHTML = "TEMAS";
  console.log(DBtramites({ tipo: "tema" }).get());
  const tramitesTotal = DBtramites({ tipo: "tema" }).order("orden").get();

  const DivButtons = document.createElement("DIV");
  DivButtons.classList = "container";
  DivButtons.id = "btnGridTms";
  DivButtons.style.marginTop = "10%";
  $("#menu").append(DivButtons);

  for (let i = 0; i < tramitesTotal.length; i++) {
    const element = tramitesTotal[i];
    //const crearHref = document.createElement("a");
    //crearHref.href = ctx.pathname+element;

    // const botonesURS = document.createElement("a");
    // botonesURS.classList = "button is-medium is-fullwidth vertical-center";
    // botonesURS.id = element.tipo;
    // botonesURS.name = element.id;
    // botonesURS.innerHTML = element.titulo;
    // botonesURS.href = ctx.pathname + "/" + element.titulo;
    // crearHref.appendChild(botonesURS);
    // DivButtons.appendChild(botonesURS);

    $("#btnGridTms").append(
      `
    <div class="card">
  <header class="card-header">
    <a class="" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.titulo +
        `"><div class="row"><div class="col-4 "><img class="imgTemasSize" src="` +
        element.img +
        `"></div><div class="col-8 centerTxt">` +
        element.titulo +
        `</div></div></a>
  </header>
</div>
    `
    );

    /*$("#btnGridTms").append(
      `<div class="card">
      <header class="card-header">
      <a class="button is-medium is-fullwidth vertical-center" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.titulo +
        `"><div class="is-mobile"><img src="` +
        element.img +
        `"><p class="tituloTemas">`+element.titulo+`</p></div></a></header>
        </div>`
    );*/
  }
}

function temasDetalle(ctx) {
  $("section").css("padding", "5rem 1.5rem 5rem");
  console.log(ctx);
  const DBtramites = TAFFY(jsonDatas);
  document.getElementById("tituloNav").innerHTML = ctx.params.id;
  $("#menu").html("");

  const temasAttr = DBtramites({ titulo: ctx.params.id }).get();
  console.log(temasAttr);

  const DivButtonsAtrr = document.createElement("DIV");
  DivButtonsAtrr.classList = "container";
  DivButtonsAtrr.style.marginTop = "0%";

  $("#menu").append(DivButtonsAtrr);

  temasAttr.forEach((element) => {
    if (element.apoyos.length != 0) {
      const titulo = "apoyos";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Apoyos";
      //DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img class="imgPrincipalhv" src="/img/pri_cuatro.png"></div>
        <div class="col-9 centerTxt">Apoyos</div>
      </div>
      </a>`
      );
    }

    if (element.servicios.length != 0) {
      const titulo = "servicios";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Servicios";
      //DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_ocho.png"></div>
        <div class="col-9 centerTxt">Servicios</div>
      </div>
      </a>`
      );
    }

    if (element.sectorAmb.length != 0) {
      const titulo = "sectorAmb";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Sector Ambiental";
      // DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
     <div class="row btnSecCK is-flex-tablet-only">
       <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_dos.png"></div>
       <div class="col-9 centerTxt">Sector ambiental</div>
     </div>
     </a>`
      );
    }
    if (element.tramites.length != 0) {
      const titulo = "tramites";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Trámites";
      //DivButtonsAtrr.appendChild(botonesURS);
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_cinco.png"></div>
        <div class="col-9 centerTxt">Trámites</div>
      </div>
      </a>`
      );
    }
  });
}

function temasDetSADT(ctx) {
  console.log(ctx);

  console.log(ctx.params.sadt);
  console.log(ctx.params.id);

  const DBtramites = TAFFY(jsonDatas);
  const temasAttr = DBtramites({ titulo: ctx.params.id }).select(
    "" + ctx.params.sadt + ""
  );

  $("#menu").html("");
  $("section").css("padding", "4rem 1.2rem");
  const temasAttrFin = temasAttr[0];
  for (const key in temasAttrFin) {
    if (Object.hasOwnProperty.call(temasAttrFin, key)) {
      const element = temasAttrFin[key];
      console.log(element);
      const buscarStr = DBtramites({ id: element }).select(
        "id",
        "titulo",
        "link",
        "img"
      );
      const ibjTramites = buscarStr[0];

      const objectsTramite = {
        ["id"]: ibjTramites[0],
        ["titulo"]: ibjTramites[3],
        ["link"]: ibjTramites[2],
        ["img"]: ibjTramites[1],
      };
      ctx.params.idSlt = objectsTramite.id;
      //SI NO HAY IMAGEN PONEMOS UN BOTON
      if (objectsTramite.img != "") {
        const divCard = document.createElement("div");
        divCard.classList = "card";

        const divCardImage = document.createElement("a");
        divCardImage.classList = "card-image";
        divCardImage.href = ctx.path + "/" + objectsTramite.titulo;

        //const hrefImgSlt = document.createElement("a");
        //hrefImgSlt.href = ctx.path + objectsTramite.titulo;
        //alert(ctx.path + objectsTramite.titulo);
        const crearDivImg = document.createElement("figure");
        crearDivImg.classList = "image is-4by3";

        const imgDiv = document.createElement("img");
        imgDiv.src = objectsTramite.img;
        crearDivImg.append(imgDiv);
        divCardImage.append(crearDivImg);
        divCard.append(divCardImage);

        //$("#menu").append(divCard);
        $("#menu").append(
          `<div class="card-image DivImgDependencias"><a href="` +
            ctx.path +
            "/" +
            objectsTramite.titulo +
            `"><img class="imgDep" src="` +
            objectsTramite.img +
            `"></a></div>`
        );
      } else {
        crearBotones(
          objectsTramite.titulo,
          objectsTramite.link,
          objectsTramite.id
        );
      }
    }
  }
}

function crearBotones(titulo, link, id) {
  console.log(titulo, link, id);
  const DivTramites = document.createElement("DIV");
  DivTramites.classList = "container";
  DivTramites.style.marginTop = "0%";

  const crearHref = document.createElement("a");
  const botonesTR = document.createElement("a");
  botonesTR.classList = "btnLink button is-medium is-fullwidth vertical-center";
  botonesTR.id = id;
  botonesTR.innerHTML = titulo;
  botonesTR.href = link;
  botonesTR.target = "_blank";
  crearHref.appendChild(botonesTR);
  DivTramites.appendChild(botonesTR);
  $("#menu").append(DivTramites);
  //$(".btnLink").click(function (e) {
  //  showHelp(e.target.rel);
  //});
}

function temasSelect(ctx) {
  console.log(ctx);
  $("#menu").html("");

  page("/dependencias/" + ctx.params.idSelect + "");
  page();
  //$("#menu").append(divCard);
  //$("#menu").append(detalleUr);
  //$("#menu").append(direcUR);
  //$("#menu").append(contacoUR);
}

function tramites(ctx) {
  document.getElementById("filtrosDiv").innerHTML = "";
  document.getElementById("historial").innerHTML = "";
  console.log(ctx);
  muestraRegresa();
  ctx.params.tema = ctx.path;
  const temaSeleccion = ctx.params.tema;

  const regex = "/";
  let temaTraeDatos = temaSeleccion.replace(regex, "");

  const regexSinS = "s";
  const temaTraeDatosSinS = temaTraeDatos.slice(0, -1);

  console.log(temaTraeDatosSinS);
  console.log(temaTraeDatos);
  //Limpiamos ventana
  $("#menu").html("");
  escondeMapa();
  //Muestra Btn Filtros
  muestraFiltro();
  //if(temaTraeDatos == "tramites"){temaTraeDatos = "Trámites"}
  //document.getElementById("tituloNav").innerHTML = temaTraeDatos.toUpperCase() + " DEL SECTOR";

  const DBtramites = TAFFY(jsonDatas);
  const allTramites = DBtramites({ tipo: "" + temaTraeDatosSinS + "" })
    .order("titulo")
    .get();

  console.log(allTramites);

  const DivTramites = document.createElement("DIV");
  DivTramites.classList = "container";
  DivTramites.style.marginTop = "10%";

  for (let i = 0; i < allTramites.length; i++) {
    const element = allTramites[i];
    const crearHref = document.createElement("a");
    const botonesTR = document.createElement("a");
    botonesTR.classList =
      "btnLink button is-medium is-fullwidth vertical-center ";
    botonesTR.id = element.id;
    botonesTR.innerHTML = element.titulo;
    botonesTR.href = element.link;
    //botonesTR.targer = element.link;
    botonesTR.target = "_blank";
    //crearHref.appendChild(botonesTR);
    DivTramites.appendChild(botonesTR);
  }

  $("#menu").append(DivTramites);

  //$(".btnLink").click(function (e) {
  //  showHelp(e.target.rel);
  //});

  $(".filtros").click(function (event) {
    document.getElementById("filtrosDiv").innerHTML = "";
    const divBotonesFiltro = document.getElementById("filtrosDiv");
    const idSelecionado = event.target.id;
    //const resultadoOrder = DBtramites({ tipo: idSelecionado }).order("titulo").get();
    const resultado = DBtramites({ tipo: idSelecionado })
      .order("orden")
      .select("tipo", "titulo", "id", "img");
    //resultadoOrder().select("tipo","titulo", "id");
    document.getElementById("historial").innerHTML = "";
    crearTags(idSelecionado);
    console.log(resultado);

    for (let i = 0; i < resultado.length; i++) {
      const restEl = resultado[i];
      const idFil = restEl[0];
      const tipoFil = restEl[2];
      const tituloFil = restEl[3];
      const imgList = restEl[1];

      if (tipoFil == "UR") {
        const botonesFl = document.createElement("a");
        botonesFl.classList = "button is-medium is-fullwidth btnFiltros";
        botonesFl.rel = tipoFil;
        botonesFl.id = idFil;
        botonesFl.innerHTML =
          `<img alt="` +
          tituloFil +
          `" id="` +
          idFil +
          `" src="` +
          imgList +
          `">`;
        divBotonesFiltro.appendChild(botonesFl);
      } else {
        const botonesFl = document.createElement("a");
        botonesFl.classList = "button is-medium is-fullwidth btnFiltros";
        botonesFl.rel = tipoFil;
        botonesFl.id = idFil;
        botonesFl.innerHTML =
          `<div class="row"><div class="col-4 col4"><img class="imgSizeSlide" alt="` +
          tituloFil +
          `" id="` +
          idFil +
          `" src="` +
          imgList +
          `"></div>
    <div class="col-8 centerTxt sizeTxtSlide">` +
          tituloFil +
          `</div></div>`;
        divBotonesFiltro.appendChild(botonesFl);
      }

      /*$("#filtrosDiv").append(`
  <a class="button is-medium is-fullwidth btnFiltros" rel="`+tipoFil+` id="`+idFil+`""><div class="card">
  <header class="card-header">
    <div class="row"><div class="col-4 "><img alt="` +
        tituloFil +
        `" id="` +
        idFil +
        `" src="` +
        imgList +
        `"></div>
    <div class="col-8 centerTxt sizeTxtSlide">`+tituloFil+`</div></div></a>
  </header>
</div></a>
    `);*/
    }

    $(".btnFiltros").click(function (event) {
      //alert("jsjsjus");
      let temaSelect = event.target.innerHTML;
      const idSelect = event.target.id;
      let tituloSelect = event.target.innerHTML;
      if (tituloSelect == "") {
        tituloSelect = event.target.alt;
        temaSelect = event.target.alt;
      }
      // alert(temaSelect);
      if (temaSelect) {
        const resultadoBusqueda = DBtramites({ titulo: tituloSelect }).select(
          "" + temaTraeDatos + ""
        );
        creaBotones(resultadoBusqueda);
      }
      //$('#historial span:last').remove();
      // console.log($('#historial').children().length);
      const totaldeTags = $("#historial").children().length;
      if (totaldeTags > 1) {
        $("#historial span:last").remove();
        $("#historial a:last").remove();
      }
      crearTags(tituloSelect);
    });
  });
}

function crearTags(id) {
  $(".tags").click(function (event) {
    page("/tramites", tramites);
    page();
    document.getElementById("historial").innerHTML = "";
  });
  if (id == "UR") {
    id = "DEPENDENCIA";
  } else {
    id = id.toUpperCase();
  }
  const createTags = document.createElement("DIV");
  createTags.classList = "tags has-addons is-grouped-multiline";

  const spanTags = document.createElement("SPAN");
  spanTags.classList = "tag is-info";
  spanTags.innerHTML = id;

  const crearRestart = document.createElement("a");
  crearRestart.classList = "tag is-delete negro";

  createTags.appendChild(spanTags);
  createTags.appendChild(crearRestart);
  $("#historial").append(createTags);
}

function creaBotones(dependenciasAttr) {
  const DBtramites = TAFFY(jsonDatas);
  $("#menu").html("");
  const DivBut = document.createElement("DIV");
  DivBut.classList = "container";
  DivBut.style.marginTop = "10%";

  for (const key in dependenciasAttr[0]) {
    if (Object.hasOwnProperty.call(dependenciasAttr[0], key)) {
      const element = dependenciasAttr[0][key];

      const buscarStr = DBtramites({ id: element }).select(
        "tipo",
        "titulo",
        "link"
      );

      const arrayBusca = buscarStr[0];

      const objectsTramite = {
        ["tipo"]: arrayBusca[1],
        ["titulo"]: arrayBusca[2],
        ["link"]: arrayBusca[0],
      };

      console.log(objectsTramite);

      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = objectsTramite.tipo;
      botonesURS.href = objectsTramite.link;
      botonesURS.target = "_blank";
      botonesURS.innerHTML = objectsTramite.titulo;
      DivBut.appendChild(botonesURS);
    }
  }
  $("#menu").append(DivBut);
}

function buscar(ctx) {
  $("section").css("padding", "2rem 1.5rem 7rem");
  document.getElementById("menu").style.display = "block";
  escondeMapa();
  escondeFiltro();
  ocultarRegresa();
  //Limpiamos ventana
  $("#menu").html("");

  //Muestra Btn Filtros
  console.log(ctx);
  //Titulo de Nav
  document.getElementById("tituloNav").innerHTML = "BUSCAR";

  $("#menu").append(`<div class="container" style="padding-top: 11%;">
<input class="input is-medium is-rounded "type="text" id="barraBusqueda" placeholder="Buscar">
</div>
<div class="inner" id="resultBusqueda"></div>
`);
  $("#barraBusqueda").keyup(function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      $("#resultBusqueda").html("");
      const DBtramites = TAFFY(jsonDatas);
      let uniqueArray = "";
      const textBusqueda = sinAcentos($("#barraBusqueda").val());
      let val = [];
      $(":checkbox:checked").each(function (i) {
        val[i] = $(this).val();
      });
      console.log(val);
      console.log(textBusqueda.toUpperCase());
      //console.log(jsonDatas);
      const ResultadoSearch = [];
      if (textBusqueda == "") {
        toastr.options = {
          closeButton: true,
          debug: false,
          newestOnTop: false,
          progressBar: false,
          positionClass: "toast-bottom-full-width",
          preventDuplicates: false,
          onclick: null,
          showDuration: "3000",
          hideDuration: "1300",
          timeOut: "3000",
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
        };
        toastr.info("Ingresa un texto.");
      }
      for (let i = 0; i < jsonDatas.length; i++) {
        let textoSinacentos = sinAcentos(jsonDatas[i]["titulo"]);
        let keyWSinacentos = sinAcentos(jsonDatas[i]["keywords"]);

        if (
          textBusqueda !== "" &&
          textoSinacentos.toUpperCase().indexOf(textBusqueda.toUpperCase()) !==
            -1
        ) {
          ResultadoSearch.push(jsonDatas[i]);
          uniqueArray = ResultadoSearch.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
          });
        }

        if (
          textBusqueda !== "" &&
          keyWSinacentos.toUpperCase().indexOf(textBusqueda.toUpperCase()) !==
            -1
        ) {
          ResultadoSearch.push(jsonDatas[i]);
          uniqueArray = ResultadoSearch.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
          });
        }
      }
      console.log(uniqueArray);
      for (const key in uniqueArray) {
        if (Object.hasOwnProperty.call(uniqueArray, key)) {
          const tipo = uniqueArray[key].tipo;
          const titulo = uniqueArray[key].titulo;
          const enlace = uniqueArray[key].link;
          const id = uniqueArray[key].id;
          const icono = uniqueArray[key].icono;

          crearBtnsTipoBusqueda(tipo, titulo, enlace, id, icono, ctx);
        }
      }
    }
  });
}
function informacionACD(ctx) {
  $("section").css("padding", "5rem 1.5rem 7rem");
  document.getElementById("tituloNav").innerHTML = "ACERCA DE";
  document.getElementById("menu").style.display = "block";
  escondeMapa();
  escondeFiltro();
  ocultarRegresa();
  //Limpiamos ventana
  $("#menu").html("");

  $("#menu").append(`
  <div class="conatiner">
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eaque illo perspiciatis aut dolorem? Fugit blanditiis, vel facere iure, officiis asperiores velit a magni saepe incidunt, ullam sequi accusantium aut!</p>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eaque illo perspiciatis aut dolorem? Fugit blanditiis, vel facere iure, officiis asperiores velit a magni saepe incidunt, ullam sequi accusantium aut!</p>
  </div>
  `);
  //Muestra Btn Filtros
  console.log(ctx);
}

function crearBtnsTipoBusqueda(tipo, titulo, link, id, icono, ctx) {
  console.log(titulo, link, id);

  const DivTramites = document.createElement("DIV");
  DivTramites.classList = "container";
  DivTramites.style.marginTop = "10%";

  const crearHref = document.createElement("a");
  const botonesTR = document.createElement("a");
  botonesTR.classList = "btnLink button is-small is-fullwidth vertical-center";
  botonesTR.id = tipo;
  botonesTR.innerHTML = titulo;
  botonesTR.rel = link;
  botonesTR.target = "_blank";
  crearHref.appendChild(botonesTR);
  DivTramites.appendChild(botonesTR);

  $("#resultBusqueda").append(
    `<div class="col-12 snborders btnLinks" id="bynsssss"><a id="` +
      tipo +
      `" title="` +
      titulo +
      `" onclick="btnsCl(this);" rel="` +
      link +
      `"> <span class="material-icons md-dark md-36 centered">&#x` +
      icono +
      `;</span>` +
      titulo +
      `</a></div>`
  );

  /*$("#bynsssss").click(function (e) {
    const textoClick = e.target.text;
    const idClick = e.target.id;
    const buscaStr = textoClick.search(titulo);
    if (idClick == "UR" && buscaStr != -1) {
      page("/dependencias/" + titulo + "");
      page();
    }

    if (idClick == "tema" && buscaStr != -1) {
      page("/temas/" + titulo + "");
      page();
    }

  

    //if (idClick == "tramite" || idClick != "servicio" || idClick == "apoyo") {
      //if(tipo = "UR" || tipo != "tema"){
      //alert(tipo);
     // window.open(e.target.rel, "_blank");
      //}
      //if(tipo != "tema"){ showHelp(e.target.rel)}
      //if(tipo != "tema" || tipo != "UR"){  window.open( e.target.rel, '_blank');}
   // }
  
  });*/
}

function pintaDep(ctx) {
  console.log(ctx);
}

function sinAcentos(dataJson) {
  var string_norm = dataJson.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return string_norm;
}

function mapa(ctx) {
  muestraMapa();
  console.log(ctx);
  escondeFiltro();
  ocultarRegresa();
  $("#menu").html("");
  document.getElementById("menu").style.display = "none";
  $("#viewDiv").css("height", "100%");

  document.getElementById("tituloNav").innerHTML = "MAPA";
}

function index(ctx) {
  page("/", index);
  $("section").css("padding", "2rem 1.5rem 7rem");
  escondeMapa();
  escondeFiltro();
  ocultarRegresa();
  document.getElementById("menu").style.display = "block";
  console.log(ctx);
  document.getElementById("tituloNav").innerHTML = "MEDIO AMBIENTE";
  document.getElementById("menu").innerHTML = `
<div class="container">
  <div class="is-full" id="click">
  <a href="/atribuciones"><div class="row btnMPrin" id="atribuciones"><div class="col-3 centerTxt"><img class="imgPrincipalhv" src="/img/pri_uno.png"></div><div class="col-9 centerTxt">Atribuciones en materia ambiental</div></div></a>
  <a href="/dependencias"><div class="row  btnMPrin" id="UR"><div class="col-3 centerTxt"><img class="imgPrincipalhv" src="/vbetas/appTram/Beta/img/pri_dos.png"></div><div class="col-9 centerTxt">Sector ambiental</div></div></a>
  <a href="/temas"><div class="row btnMPrin is-flex-tablet-only" id="CPT"><div class="col-3 centerTxt"><img class="/imgPrincipalhv" src="/img/pri_tres.png"></div><div class="col-9 centerTxt">Temas</div></div></a>
  <a href="/apoyos"><div class="row btnMPrin" id="ASA"><div class="col-3 centerTxt"><img class="imgPrincipalhv" src="/img/pri_cuatro.png"></div><div class="col-9 centerTxt">Apoyos del sector</div></div></a>
  <a href="/servicios"><div class="row btnMPrin" id="ASA"><div class="col-3 centerTxt"><img class="imgPrincipalhv" src="/img/pri_ocho.png"></div><div class="col-9 centerTxt">Servicios del sector</div></div></a>
   <a href="/tramites"><div class="row btnMPrin" id="tramite"><div class="col-3 centerTxt"><img  class="imgPrincipalhv" src="/img/pri_cinco.png"></div><div class="col-9 centerTxt">Trámites del sector</div></div></a>
   <a href="/reporte"><div class="row btnMPrin" id="RAC"><div class="col-3 centerTxt"><img class="imgPrincipalhv" src="/img/pri_seis.png"></div><div class="col-9 centerTxt">Reporte ambiental ciudadano</div></div></a>
   <a href="/informacion"><div class="row btnMPrin" id="INF"><div class="col-3 centerTxt"><img class="imgPrincipalhv" src="/img/pri_siete.png"></div><div class="col-9 centerTxt">Información ambiental</div></div></a>
  </div>
</div>`;
}

function atribuciones(ctx) {
  $("section").css("padding", "4rem 1.2rem");
  escondeMapa();
  escondeFiltro();
  muestraRegresa();
  $("#menu").html("");
  console.log(ctx);
  ctx.params.tema = "HolaMundo";
  ctx.params.id = "123b";
  ctx.params.id = [2, 3, 4, 5];

  console.log(ctx.pathname);
  const DBtramites = TAFFY(jsonDatas);
  document.getElementById("tituloNav").innerHTML = "ATRIBUCIONES";
  const result = DBtramites({ grupo: "atribuciones" }).order("orden").get();

  for (let i = 0; i < result.length; i++) {
    const titulo = result[i].titulo;
    const imagen = result[i].img;
    const atribucionesarray = result[i].atribuciones;
    const id = result[i].id;
    const pos = i;
    crearCard(titulo, imagen, pos, id, atribucionesarray, ctx);
  }
}

function atribucionesTema(ctx) {
  console.log(ctx);
  $("#menu").html("");
  const DBAtribuciones = TAFFY(jsonAtribuciones);
  const result = DBAtribuciones({ id: ctx.params.id }).select(
    "" + ctx.params.tema + ""
  );
  console.log(result.toString());
  $("#menu").append(
    `<div class="col-12"><p class="detallesP">` +
      result.toString() +
      `</p></div>`
  );
}

function dependencias(ctx) {
  $("section").css("padding", "2rem 1.5rem 5rem");
  escondeMapa();
  escondeFiltro();
  muestraRegresa();
  console.log(ctx);

  $("#menu").html("");
  console.log(ctx.pathname);
  const DBtramites = TAFFY(jsonDatas);

  const tituloURs = document.createElement("h4");
  tituloURs.classList = "title is-4";
  tituloURs.innerHTML = "Dependencias";

  let DivButtons = document.createElement("DIV");
  DivButtons.classList = "container"; //grids
  DivButtons.id = "btnGrid";
  DivButtons.style.marginTop = "10%";

  document.getElementById("tituloNav").innerHTML = "SECTOR AMBIENTAL";
  $("#menu").append(DivButtons);

  // const tramites =  DBtramites({ tipo: "UR" }).get();

  console.log(DBtramites().filter({ tipo: "UR" }).get());

  const dependenciasTotal = DBtramites()
    .filter({ tipo: "UR" })
    .order("orden")
    .get();

  for (let i = 0; i < dependenciasTotal.length; i++) {
    const element = dependenciasTotal[i];
    // //const crearHref = document.createElement("a");
    // const botonesURS = document.createElement("a");
    // botonesURS.classList = "button is-medium is-fullwidth vertical-center";
    // botonesURS.id = element.id;
    // botonesURS.innerHTML = `<img src="` + element.img + `">`;
    // botonesURS.href = ctx.pathname + "/" + element.titulo;
    // //crearHref.appendChild(botonesURS);

    $("#btnGrid").append(
      `<a class="containerDep  snborder" id="` +
        element.id +
        `" href="` +
        ctx.pathname +
        "/" +
        element.titulo +
        `"><img class="imgDeps" src="` +
        element.img +
        `"></a>`
    );

    // DivButtons.appendChild(botonesURS);
  }
}

function urs(ctx) {
  console.log(ctx);
  escondeMapa();
  escondeFiltro();
  const DBtramites = TAFFY(jsonDatas);
  $("#menu").html("");

  /*const DBtramites = TAFFY(jsonDatas);
  const dependenciasResultado = DBtramites({ grupo: ctx.params.urs }).get();

  const dependenciasResultadoCnt = DBtramites({
    grupo: ctx.params.urs,
  }).count();

  const DivButtonsUR = document.createElement("DIV");
  DivButtonsUR.classList = "container";
  DivButtonsUR.style.marginTop = "10%";

  document.getElementById("tituloNav").innerHTML = "UNIDAD RESPONSABLE";
  $("#menu").append(DivButtonsUR);

  for (let i = 0; i < dependenciasResultado.length; i++) {
    const elementUR = dependenciasResultado[i];
    const botonesURS = document.createElement("a");
    botonesURS.classList =
      "button is-medium is-fullwidth vertical-center btnCls";
    botonesURS.id = elementUR.titulo;
    botonesURS.href = ctx.path + "/" + elementUR.titulo;
    botonesURS.innerHTML = elementUR.titulo;
    DivButtonsUR.appendChild(botonesURS);
    //agregar Imagenes
  }*/
}

function idDependenciaDet(ctx) {
  $("section").css("padding", "5rem 1.5rem 5rem");
  console.log(ctx);
  escondeMapa();
  escondeFiltro();
  $("#menu").html("");
  document.getElementById("tituloNav").innerHTML = ctx.params.id;
  const DBtramites = TAFFY(jsonDatas);
  const dependenciasAttr = DBtramites({ titulo: ctx.params.id }).get();
  console.log(dependenciasAttr[0]);

  const llenaDetaURS = dependenciasAttr[0];

  const DivButtonsAtrr = document.createElement("DIV");
  DivButtonsAtrr.classList = "container";
  DivButtonsAtrr.style.marginTop = "10%";

  const divCard = document.createElement("div");
  divCard.classList = "";

  //creamos imagen Automatica
  divCard.append(`
    
  `);

  const createDovContent = document.createElement("div");
  createDovContent.classList = "content is-normal";

  const detalleUr = document.createElement("p");
  detalleUr.innerHTML =
    `<div class="row"><div class="col-12">` +
    llenaDetaURS.describe +
    `</div></div> `;
  detalleUr.classList = "detallesP";

  const direcUR = document.createElement("p");
  direcUR.innerHTML =
    `<div class="row"><div class="col-2"><span class="material-icons">&#xe0c8;</span></div><div class="col-10">` +
    llenaDetaURS.direccion +
    `</div></div> `;
  direcUR.classList = "detallesP";

  const telefonoUR = document.createElement("p");
  telefonoUR.innerHTML =
    `<div class="row"><div class="col-2"><span class="material-icons">&#xe0cd;</span></div><div class="col-10">` +
    llenaDetaURS.telefono +
    `</div></div> `;
  telefonoUR.classList = "telefonoP";

  const contacoUR = document.createElement("p");
  contacoUR.innerHTML =
    `<div class="row"><div class="col-2"><span class="material-icons">&#xe0be;</span></div><div class="col-10">` +
    llenaDetaURS.contacto +
    `</div></div> `;
  contacoUR.classList = "detallesP";

  $("#menu").append(
    `<div class="card-image DivImgDependencias"><img class="imgDep" src="` +
      llenaDetaURS.img +
      `"></div>`
  );
  $("#menu").append(detalleUr);
  $("#menu").append(llenaDetaURS.atribuciones);
  $("#menu").append(direcUR);
  $("#menu").append(telefonoUR);
  $("#menu").append(contacoUR);

  $("#menu").append(DivButtonsAtrr);

  dependenciasAttr.forEach((element) => {
    if (element.apoyos.length != 0) {
      const titulo = "apoyos";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Apoyos";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_cuatro.png"></div>
        <div class="col-9 centerTxt">Apoyos</div>
      </div>
      </a>`
      );
    }

    if (element.servicios.length != 0) {
      const titulo = "servicios";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Servicios";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_ocho.png"></div>
        <div class="col-9 centerTxt">Servicios</div>
      </div>
      </a>`
      );
    }

    if (element.temas.length != 0) {
      const titulo = "temas";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Temas";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_tres.png"></div>
        <div class="col-9 centerTxt">Temas</div>
      </div>
      </a>`
      );
    }
    if (element.tramites.length != 0) {
      const titulo = "tramites";
      //console.log(Object.keys(element));
      const botonesURS = document.createElement("a");
      botonesURS.classList =
        "button is-medium is-fullwidth vertical-center btnCls";
      botonesURS.id = titulo;
      botonesURS.href = ctx.path + "/" + titulo;
      botonesURS.innerHTML = "Trámites";
      $("#menu").append(
        `<a href="` +
          ctx.path +
          "/" +
          titulo +
          `" class="  is-fullwidth">
      <div class="row btnSecCK is-flex-tablet-only">
        <div class="col-3"><img  class="imgPrincipalhv" src="/img/pri_cinco.png"></div>
        <div class="col-9 centerTxt">Trámites</div>
      </div>
      </a>`
      );
    }
  });
}

function detalleDependencia(ctx) {
  console.log(ctx);
  escondeMapa();
  escondeFiltro();

  const titulo = ctx.params.id;
  const tipo = ctx.params.detalle;
  $("#menu").html("");

  const DBtramites = TAFFY(jsonDatas);
  const dependenciasAttr = DBtramites({ titulo: titulo }).select(
    "" + tipo + ""
  );

  const DivButtonsFin = document.createElement("DIV");
  DivButtonsFin.classList = "container";
  DivButtonsFin.style.marginTop = "10%";

  $("#menu").append(DivButtonsFin);
  const fieldsInOrder = [];
  for (const key in dependenciasAttr[0]) {
    if (Object.hasOwnProperty.call(dependenciasAttr[0], key)) {
      const element = dependenciasAttr[0][key];

      const buscarStr = DBtramites({ id: element }).select(
        "tipo",
        "titulo",
        "link",
        "img"
      );
      console.log(buscarStr);
      const arrayBusca = buscarStr[0];
      fieldsInOrder["link"] = arrayBusca[1];
      fieldsInOrder["img"] = arrayBusca[0];
      fieldsInOrder["titulo"] = arrayBusca[3];
      fieldsInOrder["tema"] = arrayBusca[2];

      console.log(fieldsInOrder.tema);
      //console.log(buscarStr.sort());
      //    const creaArray = new Array();
      //            creaArray['tipo'] = buscarStr[0][1];

      //            console.log(creaArray);
      const idTema = arrayBusca[3].toString();
      console.log(idTema);
      if (arrayBusca[2] == "tema") {
        // $("#menu").append(`<a href="`+ctx.path+`/`+arrayBusca[3]+`" class="button is-medium is-fullwidth vertical-center btnCls"><img src='`+arrayBusca[0]+`'></a>`);
        $("#menu").append(
          `
          <div class="card">
        <header class="card-header">
          <a class="" id="` +
            fieldsInOrder.titulo +
            `" href="` +
            ctx.pathname +
            "/" +
            fieldsInOrder.titulo +
            `"><div class="row"><div class="col-4 "><img class="imgTemasSize" src="` +
            fieldsInOrder.img +
            `"></div><div class="col-8 centerTxt">` +
            fieldsInOrder.titulo +
            `</div></div></a>
        </header>
      </div>
          `
        );
      } else {
        const botonesURS = document.createElement("a");
        botonesURS.classList =
          "btnLink button is-medium is-fullwidth vertical-center btnCls";
        botonesURS.id = titulo;
        botonesURS.href = arrayBusca[1];
        botonesURS.target = "_blank";
        botonesURS.innerHTML = arrayBusca[3];
        DivButtonsFin.appendChild(botonesURS);
      }
      // $(".btnLink").click(function (e) {
      //   showHelp(e.target.rel);
      // });
    }
  }
}

function dependenciaTemas(ctx) {
  console.log(ctx);

  page("/temas/" + ctx.params.temas + "");
  page();
}

function escondeMapa(params) {
  $("#viewDiv").css("height", "0");
  ocultarMapa();
}

function muestraFiltro(params) {
  $("#btnFiltro").css("display", "none");
  $("#floats").css("display", "block");
}

function escondeFiltro(params) {
  $("#btnFiltro").css("display", "none");
  $("#floats").css("display", "none");
}

function crearCard(titulo, img, pos, id, atribucones, ctx) {
  // CARD DINAMICO
  const contenedor = document.createElement("DIV");
  contenedor.id = "contenedor";

  $("#menu").append(contenedor);

  $("#contenedor").append(
    `<div class="card">
  <header class="card-header">
    
    <div class="row"><div class="col-4"><img class="" src="` +
      img +
      `"></div><div class="col-8 centerTxt">` +
      titulo +
      `</div></div>
   
    <button onclick="myFunction(` +
      pos +
      `)" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fa-angle-down fas fas` +
      pos +
      `" id="fas` +
      pos +
      `"  aria-hidden="true"></i>
      </span>
    </button>
  </header>
  <footer class="card-footer` +
      pos +
      ` card-footer is-hidden">
    <a href="` +
      ctx.pathname +
      `/Federacion/` +
      id +
      `" id="` +
      id +
      `" class="card-footer-item">Federación</a>
    <a href="` +
      ctx.pathname +
      `/Estado/` +
      id +
      `"" id="` +
      id +
      `" class="card-footer-item">Estado</a>
    <a href="` +
      ctx.pathname +
      `/Municipio/` +
      id +
      `"" id="` +
      id +
      `" class="card-footer-item">Municipio</a>
  </footer>
</div>`
  );

  //FIN CARD DINAMICO
}

function myFunction(pos) {
  $(".card-footer" + pos + "").toggleClass("is-hidden");
  // const remover = document.getElementById("fas"+pos+"").classList.remove("fa-angle-up");
  // const añadir   = document.getElementById("fas"+pos+"").classList.add("fa-angle-down");

  const verifica = document.getElementById("fas" + pos + "").classList;
  console.log(verifica);
  const claseExistente = "fa-angle-";

  const buscar = verifica.value.search("fa-angle-up");

  if (buscar != -1) {
    document.getElementById("fas" + pos + "").classList.remove("fa-angle-up");
    document.getElementById("fas" + pos + "").classList.add("fa-angle-down");
  } else {
    document.getElementById("fas" + pos + "").classList.add("fa-angle-up");
    document.getElementById("fas" + pos + "").classList.remove("fa-angle-down");
  }
}

function ocultarMapa(params) {
  document.getElementById("viewDiv").style.paddingBottom = "0px";
  document.getElementById("viewDiv").style.marginTop = "0px";
  document.getElementById("optionsDiv2").style.display = "none";
  document.getElementById("tablaDatos").style.marginTop = "none";
}

function muestraMapa(params) {
  document.getElementById("viewDiv").style.paddingBottom = "6.5em";
  document.getElementById("viewDiv").style.marginTop = "3em";
  document.getElementById("optionsDiv2").style.display = "block";
  document.getElementById("tablaDatos").style.marginTop = "block";
}

function ocultarRegresa(params) {
  document.getElementById("regresaBCK").style.display = "none";
}

function muestraRegresa(params) {
  document.getElementById("regresaBCK").style.display = "flex";
  //$("#regresaBCK").click(function () {
  // window.history.go(-1)
  //});
}

function showHelp(url) {
  var target = "_blank";

  var options = "location=no,hidden=yes,zoom=no,footer=yes";

  inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);

  inAppBrowserRef.addEventListener("loadstart", loadStartCallBack);

  inAppBrowserRef.addEventListener("loadstop", loadStopCallBack);

  inAppBrowserRef.addEventListener("loaderror", loadErrorCallBack);
}

function loadStartCallBack() {
  $("#status-message").text("loading please wait ...");
}

function loadStopCallBack() {
  if (inAppBrowserRef != undefined) {
    inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;}" });

    $("#status-message").text("");

    inAppBrowserRef.show();
  }
}

function loadErrorCallBack(params) {
  $("#status-message").text("");

  var scriptErrorMesssage =
    "alert('Sorry we cannot open that page. Message from the server is : " +
    params.message +
    "');";

  inAppBrowserRef.executeScript(
    { code: scriptErrorMesssage },
    executeScriptCallBack
  );

  inAppBrowserRef.close();

  inAppBrowserRef = undefined;
}

function executeScriptCallBack(params) {
  if (params[0] == null) {
    $("#status-message").text(
      "Sorry we couldn't open that page. Message from the server is : '" +
        params.message +
        "'"
    );
  }
}

function btnsCl(e) {
  const textoClick = e.title;
  const tipo = e.id;

  if (tipo == "UR") {
    page("/dependencias/" + textoClick + "");
    page();
  }

  if (tipo == "tema") {
    page("/temas/" + textoClick + "");
    page();
  }
  if (tipo != "tema" && tipo != "UR") {
    window.open(e.rel, "_blank");
  }
}

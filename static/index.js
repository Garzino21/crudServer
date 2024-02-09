"use strict"

$(document).ready(function() {
    let divIntestazione = $("#divIntestazione");
    let divFilters = $(".card").eq(0);
    let divCollections = $("#divCollections");
    let table = $("#mainTable");
    let divDettagli = $("#divDettagli");
    let currentCollection = "";

    divFilters.hide();
	$("#lstHair").prop("selectedIndex", -1);

    getCollections();

    /******************************************************/

    function getCollections() {
        let rq = inviaRichiesta("GET", "/api/getCollections");
        rq.then((response) => {
            console.log(response.data);
            let label = divCollections.children("label");
            response.data.forEach((item, i) => {
                let clonedLabel = label.clone().appendTo(divCollections);
                clonedLabel.children("span").text(item.name);
                clonedLabel.children("input:radio").on("click", getDataCollection);
            });
            label.remove();
        });
        rq.catch(errore);
    }

    function getDataCollection() {
        let collection = $(this).next("span").text();
        currentCollection = collection;
        let rq = inviaRichiesta("GET", `/api/${currentCollection}`);
        rq.then((response) => {
            console.log(response.data);
            divIntestazione.find("strong").eq(0).text(collection);
            divIntestazione.find("strong").eq(1).text(response.data.length);
            let _tbody = table.children("tbody");
            _tbody.empty();
            response.data.forEach((item, i) => {
                let tr = $("<tr>").appendTo(_tbody);
                $("<td>").appendTo(tr).text(item._id).on("click", function() {
                    getDetails(item._id);
                });
                $("<td>").appendTo(tr).text(item.name).on("click", function() {
                    getDetails(item._id);
                });
                let td = $("<td>").appendTo(tr);
                $("<div>").appendTo(td);
                $("<div>").appendTo(td);
                $("<div>").appendTo(td);
            });
        });
        rq.catch(errore);
    }
    function getDetails(_id) {
        let rq = inviaRichiesta("GET", `/api/${currentCollection}/${_id}`);
        rq.then((response) => {
            console.log(response.data);
        });
        rq.catch(errore);
    }
});
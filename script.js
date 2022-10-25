window.onload = function () {
  rates.init();
}; // wykonaj init()

class ExchangesRates {
  // utwórz klasę dla obiektu
  url = "https://api.nbp.pl/api/exchangerates/tables/a/last/?format=json"; // dodaj `api` w `url`

  tBody = document.querySelector("#ratesTable tbody");

  init() {
    this.loadData();
  }

  loadData() {
    // pobierz dane z `url` w formacie `json` i przekaż do zmiennej `data`
    fetch(this.url).then((response) => {
      response.json().then((data) => {
        this.parseData(data);
      });
    });
  }

  parseData(data) {
    // opracuj dane z pobranego `api`
    console.log(data);
    data = data[0];
    this.table = data.table;
    this.date = data.effectiveDate;
    this.no = data.no;
    this.ratesData = data.rates;

    document.querySelector("h3").innerHTML =
      "Kursy walut na bazie tabeli nr: " + this.no; // dodaj tytuł z przypisaniem

    for (let v in data.rates) {
      // stwórz pętlę przechodzacą przez wszystkie pola `data`
      this.addRateToTable(data.rates[v]);
    }
  }

  addRateToTable(el) {
    // stówrz funkcję wstrzykującą dane do tabeli
    //console.log(el);

    let tr = document.createElement("tr"); // stwórz element `tr` i przypisz do niego dane
    tr.innerHTML = `
    <td class="align-middle"> ${el.code} </td>
    <td class="align-middle"> ${el.currency} </td>
    <td class="align-middle"> ${el.mid} zł </td>
    `;

    this.tBody.appendChild(tr);
  }
}

const rates = new ExchangesRates(); // zainicjuj obiekt klasy

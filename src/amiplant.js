function elem(el) {
    return document.getElementById(el);
}

function getTotalHours(d) {
    const _MS_PER_HOUR = 1000 * 60 * 60;
    console.log(d);
    const today = new Date();
    const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utc2 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    console.log(utc1);
    console.log(utc2);

    return Math.floor((utc1 - utc2) / _MS_PER_HOUR);
}

function percentPlantMass(obj) {
    percentReplaced = getTotalHours(obj.wentVegan);
    console.log("d: ", obj.wentVegan);
    console.log("t: ", );
    console.log("percentReplaced: ", percentReplaced);
    console.log(obj);
}

function Person(weight, height, wentVegan) {
    this.weight = weight;
    this.height = height;
    this.wentVegan = new Date(wentVegan);
    this.percentPlantMass = function () {
        return percentPlantMass(this);
    };
};

// Form submitted
elem("sbmt").addEventListener("submit", function (event) {
    // Prevent default form behavior
    event.preventDefault();

    // Set variables
    const person = new Person(
        elem('weight').value,
        elem('height').value,
        elem('veganniversary').value,
    )

    person.percentPlantMass();
});

// Form clear button pressed
elem("btn_clr").addEventListener("click", function (event) {
    // Clear values...
    elem('weight').value = "";
    elem('height').value = "";
    elem('veganniversary').value = "";
});
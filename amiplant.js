function elem(el) {
	return document.getElementById(el);
}

function getTotalHours(d) {
	const _MS_PER_HOUR = 1000 * 60 * 60;
	const today = new Date();
	const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	const utc2 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())

	return Math.floor((utc1 - utc2) / _MS_PER_HOUR);
}

function percentPlantMass(c, p) {
	percentReplaced = getTotalHours(p.wentVegan) / c.turnover;
	console.log("d: ", getTotalHours(p.wentVegan));
	console.log("t: ", c.turnover);
	console.log("percentReplaced: ", percentReplaced);
	return Math.min(percentReplaced, 1.0) * c.percentMass(p.weight, p.height, p.gender);
}

function component(turnover, percentMass) {
	this.turnover = turnover;
	this.percentMass = percentMass;
	this.percentPlantMass = ((obj) => percentPlantMass(this, obj));
}

function Person(weight, height, wentVegan, gender) {
	this.weight = weight;
	this.height = height;
	this.wentVegan = new Date(wentVegan);
	this.gender = gender;
};

// Form submitted
elem("sbmt").addEventListener("submit", function (event) {
	// Prevent default form behavior
	event.preventDefault();

	data = new FormData(elem("sbmt"));
	for (entry of data){
		gender = entry[1];
	}

	// Set variables
	const person = new Person(
		elem('weight').value,
		elem('height').value,
		elem('veganniversary').value,
		gender,
	)

	sum = 0.0
	bits["fat"].percentMass = fatfn;
	console.log(bits)
	for ([k, v] of Object.entries(bits)) {
		console.log("Calculating ", k)
		sum += v.percentPlantMass(person)
	}
	elem('result-span').innerText = sum * 100;
	elem('result-div').style.display = "revert";
});

// Form clear button pressed
elem("btn_clr").addEventListener("click", function (event) {
	// Clear values...
	elem('weight').value = "";
	elem('height').value = "";
	elem('veganniversary').value = "";
});

function fatfn(h, w, g) {
	remaining = 1.0;
	for ([k, v] of Object.entries(bits)) {
		if (k.indexOf("fat") == -1) {
			remaining -= v.percentMass(h, w, g)
		}
	}
	return remaining;
}

function id(i) {
	return function (a, b, c) {
		return i;
	}
}

const bits = {
	"skin": new component(
		turnover = 24 * 30,
		percentMass = id(.16),
	),
	"skeleton": new component(
		turnover = 10 * 365 * 24,
		percentMass = id(.2),
	),
	"lean": new component(
		turnover = 5 * 365 * 24,
		percentMass = function(w, h, g) {
			if (g == "male") {
				a = 0.32810;
				b = 0.33929;
				c = 29.5336;
			} else {
				a = 0.29569;
				b = 0.41813;
				c = 43.2933;
			}
			return ((((a*w) + (b*h)) - c) / w) - .36
		}
	),
	"fat": new component(
		turnover = 10 * 365 * 24,
		percentMass = NaN,
	),
}

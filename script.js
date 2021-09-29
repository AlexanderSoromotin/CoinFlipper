	// LiveReload
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')

// Построение графика
function buildGraph (o, total) {
	let r = total - o;

	let oPercent = (o / total) * 100;
	let rPercent = 100 - oPercent;
	// $('.orel').css({"width" : "100%"});
	setTimeout(function () {
		$('.orel').css({"width" : oPercent + "%"});
		$('.reshka').css({"width" : "calc(" + rPercent + "% + 1px)"});
		// из-за бага в графике, справа от "решки", образуется пустой пиксель. Прибавляя 1px убираем этот недочёт
	}, 100)

	$('.percents p:eq(0)').text(oPercent.toFixed(2) + "% (" + o + ")");
	$('.percents p:eq(1)').text(rPercent.toFixed(2) + "% (" + r + ")");
}

// Поиск максимального повторения
function findMax () {
	let text = $('.sample p').text();

	let maxO = "";
	let oText = "";
	// Поиск максмальной комбинации Орлов
	for (let i = 1; i <= text.length; i++) {
		oText = "";
		for (let k = 1; k <= i; k++) {
			oText += "O";
		}
		// console.log("(O) СГЕНЕРИРОВАНО : " + oText + " - (" + i + " шт.)");
		// console.log((text.split(oText)).length)
		if (text.split(oText).length -1 != 0 && oText.length > maxO.length) {
			maxO = oText;
			// console.log("(O) !!!!!!!!!! НАЙДЕНО : " + maxO)
		}
	}

	let maxP = "";
	let pText = "";
	// Поиск максмальной комбинации Решек
	for (let i = 1; i <= text.length; i++) {
		pText = "";
		for (let k = 1; k <= i; k++) {
			pText += "P";
		}
		// console.log("(P) СГЕНЕРИРОВАНО : " + pText + " - (" + i + " шт.)");
		// console.log((text.split(pText)).length)
		if (text.split(pText).length -1 != 0 && pText.length > maxP.length) {
			maxP = pText;
			// console.log("(P) !!!!!!!!!! НАЙДЕНО : " + maxP)
		}
	}

	// Выделяем максимальные комбинации, обернув их в тег <b>
	text = text.replace(maxO, "<b class='o'>" + maxO + "</b>");
	text = text.replace(maxP, "<b class='p'>" + maxP + "</b>");
	$('.sample p').html(text);

	// Знакомим пользователя с максимумом и вероятностью
	$('.max p:eq(0)').text('Орёл: ' + maxO + " (" + maxO.length + " шт.)");
	$('.max h5:eq(0)').text('Вероятность: ' + 1 / (Math.pow(2, maxO.length)) + "%");

	$('.max p:eq(1)').text('Решка: ' + maxP + " (" + maxP.length + " шт.)");
	$('.max h5:eq(1)').text('Вероятность: ' + 1 / (Math.pow(2, maxP.length)) + "%");
}

// Генерация опытов по клику
$('.btn').click(function () {
	$('.sample p').text("")
	let count = $('.sample input').val();

	if (count < 1) {
		return;
	}

	let countO = 0;
	let text;
	for (let i = 1; i <= count; i++) {
		let random = Math.round(Math.random());

		if (random == 1) {
			text = "P";
		} else {
			text = "O";
			countO++;
		}
		$('.sample p').append(text);
	};

	buildGraph(countO, count);
	findMax();
})
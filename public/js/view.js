/*новый элемент добовлять в:
---------------$(MODEL.jsonFiled).change((e)
---------------switch (configElement)
--------------- и в метод класса
в конце метода должен быть апдейтФромЭдитор
*/
class View {
    constructor(MODEL) {
        this.model = MODEL
        this.clearView()
        $(MODEL.jsonFiled).change((e) => {
            MODEL.updateFromTextModel()
            this.clearView()
            this.drawBalls(MODEL)
            this.drawCards(MODEL)
            console.log()
        })
        for (let configElement in MODEL.data) {
            switch (configElement) {
                case "balls": this.drawBalls(MODEL);
                    break;
                case "cards": this.drawCards(MODEL);
                    break;
            }
        }


    }
    clearView() {
        this.model.viewPort.innerHTML = ""
    }
    drawCards(MODEL) {
        var countCards = MODEL.data.cards.length
        for (i = 0; i < countCards; i++) {
            let cardNumber = i
            drawNumberbyCard(cardNumber)
            drawbingoPatternbyCard(cardNumber)
            drawwinChestsbyCard(cardNumber)
            drawwinCoinsbyCard(cardNumber)
        }
        function drawwinChestsbyCard(CardIndex) {
            var template = `<table id="config1_table_chests">Chests:<tr><td>
                            <input class="cellLOng" type="text"></td></tr></table>`
            var $template = $(template);
            $template.find("input").each((i, e) => {
                $(e).val(MODEL.data.cards[CardIndex].chests).data({ "CardIndex": CardIndex, "name": "chests", "count": i }).change(function () {
                    var $this = $(this)
                    var target = $this.data()
                    MODEL.data.cards[target.CardIndex].chests = $this.val().split(",").map(Number)
                    MODEL.updateFromEditorModel()
                })
            })
            $(MODEL.viewPort).append($template)
        }
        function drawwinCoinsbyCard(CardIndex) {
            var template = `<table id="config1_table_coins">Coins:<tr><td>
                            <input class="cellLOng" type="text"></td></tr></table>`
            var $template = $(template);
            $template.find("input").each((i, e) => {
                $(e).val(MODEL.data.cards[CardIndex].coins).data({ "CardIndex": CardIndex, "name": "coins", "count": i }).change(function () {
                    var $this = $(this)
                    var target = $this.data()
                    MODEL.data.cards[target.CardIndex].coins = $this.val().split(",").map(Number)
                    MODEL.updateFromEditorModel()
                })
            })
            $(MODEL.viewPort).append($template)
        }
        function drawbingoPatternbyCard(CardIndex) {
            var template = `<table id="config1_table_win_patterns">Win pattern:
                <tr><td><input class="cell" type="text"></td><td><input class="cell" type="text"></td>
                <td><input class="cell" type="text" style="background: url('data:image/svg+xml;utf8,
                <svg xmlns=&quot;http://www.w3.org/2000/svg&quot;><text x=&quot;25%&quot; y=&quot;75%&quot; font-size=&quot;20&quot; fill=&quot;rgba(255, 0, 0, 0.137)&quot;>✪</text></svg>');
                "></td><td><input class="cell" type="text"></td><td><input class="cell" type="text"></td></tr></table>`
            var $template = $(template);
            $template.find("input").each((i, e) => {
                $(e).val(MODEL.data.cards[CardIndex].bingoPattern[i]).data({ "CardIndex": CardIndex, "name": "bingoPattern", "count": i }).change(function () {
                    var $this = $(this)
                    var target = $this.data()
                    MODEL.data.cards[target.CardIndex].bingoPattern[target.count] = +$this.val()
                    MODEL.updateFromEditorModel()
                });
            });
            $(MODEL.viewPort).append($template)
        }
        function drawNumberbyCard(CardIndex) {
            var template = `<table id="config1_table_numbers"><p>Card ${CardIndex + 1}</p>
        <tr>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
        </tr>
        <tr>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
        </tr>
        <tr>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td>
                <div style="font-size: 160%; text-align: center;width: 30px;height: 30px;">✪</div>
            </td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
        </tr>
        <tr>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
        </tr>
        <tr>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
            <td><input class="cell" type="text"></td>
        </tr>
    </table>`
            var $template = $(template)
            $template.find("input").each((i, e) => {
                $(e).val(MODEL.data.cards[CardIndex].numbers[i]).data({ "CardIndex": CardIndex, "name": "numbers", "count": i }).change(function () {
                    var $this = $(this)
                    var target = $this.data()
                    MODEL.data.cards[target.CardIndex].numbers[target.count] = +$this.val()
                    MODEL.updateFromEditorModel()
                });
            });
            $(MODEL.viewPort).append($template)


        }
    }
    drawBalls(MODEL) {
        var balls = this.model.data["balls"]
        var model = this.model.jsonFiled
        var $config1_table_balls = $('<table id="config1_table_balls">')
        var i, j, temparray, chunk = 10;
        var counter = 0
        for (i = 0, j = balls.length; i < j; i += chunk) {
            temparray = balls.slice(i, i + chunk);
            var $tr = $('<tr>')
            var s
            for (s = 0; s < temparray.length; s++) {

                var $td = $('<td><input class="cell" type="text"></td>')
                $td.find("input").val(temparray[s]).data({ "name": "balls", "count": +counter }).change(function () {
                    var $this = $(this)
                    var target = $this.data()
                    balls[target.count] = +$this.val()
                    MODEL.updateFromEditorModel()
                })
                $tr.append($td)
                counter++
            }
            $config1_table_balls.append($tr)
        }
        $config1_table_balls.prepend('<p>Balls</p>')
        $(this.model.viewPort).append($config1_table_balls)
    }
}


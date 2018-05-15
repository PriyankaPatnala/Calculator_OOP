
//TextBox Class

function TextBox(obj) {
    this.type = obj.type;
    this.value = obj.value;
    this.classList = obj.classList;

}

//setter and Getter methods of textbox

TextBox.prototype.setTextValue = function(domEl,value ) {
    domEl.value = value;
    console.log("set text "+this.value);
};

TextBox.prototype.getTextValue = function() {
    return this.value;
};

//creating a textbox view
TextBox.prototype.create = function() {
    var textBox = document.createElement("input");
    textBox.type=this.type;
    textBox.value=this.value;
    textBox.classList.add(this.classList);
    return textBox;
};

//button class
function Button(obj) {
    this.displayVal = obj.displayValue;
    this.dataValue = obj.dataValue;
    this.type = obj.type;
}

//create a button view
Button.prototype.createButton = function() {
    var btn = document.createElement("button");
    btn.innerText = this.displayVal;
    btn.value = this.dataValue;
    btn.classList.add('button', this.type.toLowerCase());
    return btn;
};

//Main calculator class
function CalculatorApplication() {
    this.createCalculator();
}

//creating a calculator
CalculatorApplication.prototype.createCalculator = function() {
    this.operand1 = "0";
    this.operand2 = "0";
    this.operator = 0;
    this.opflag = false;
    this.Calci = this.createDiv("calci");

    var value= {
        type : "text",
        value : "0",
        classList : "TextBoxClass"
    };

    var textObj = new TextBox(value);

    this.textBox = textObj.create();

    this.buttonPanel = this.createButtonPanel(textObj);
    this.constructView();
};


//creating a div
CalculatorApplication.prototype.createDiv = function (className) {
    var panel = document.createElement("div");
    panel.classList.add(className);
    return panel;
};

//constructing the view of calculator
CalculatorApplication.prototype.constructView = function(){
    this.Calci.appendChild(this.textBox);
    this.Calci.appendChild(this.buttonPanel);
    document.body.appendChild(this.Calci);
};

//operation to be performed if a number is clicked
CalculatorApplication.prototype.onNumberClick = function( $event ,buttonObj,textObj) {

    if( this.operand2 == 0  && (this.operand2.indexOf('.') == -1 ))    {
        this.operand2 = buttonObj.dataValue;
    }
    else{
        this.operand2 += buttonObj.dataValue;
    }
    textObj.setTextValue( this.textBox, this.operand2);
};

//if "." button is clicked
CalculatorApplication.prototype.Dot = function(textObj) {

    if(this.operand2.length == 0 )
        this.operand2 = "0.";
    else {
        if( this.operand2.indexOf(".") == -1)
            this.operand2 += '.';

    }
    textObj.setTextValue( this.textBox, this.operand2);

};

//if "+-" button is clicked
CalculatorApplication.prototype.PlusMinus = function(textObj) {

    if ( this.operand2.toString().indexOf("-") == 0 )    {
        this.operand2 = this.operand2.toString().substring(1);
    }
    else{
        this.operand2 = "-" + this.operand2;
    }
    textObj.setTextValue( this.textBox, this.operand2);
};

//if "CE" is clicked
CalculatorApplication.prototype.Clear = function(textObj) {

    this.operand2 = "";
    textObj.setTextValue( this.textBox, this.operand2);
};


//if "C" is clicked
CalculatorApplication.prototype.allClear = function(textObj) {

    this.operand1 = "";
    this.operand2 = "";
    this.operator = 0;
    textObj.setTextValue( this.textBox, this.operand2);

};

//assigning values to operators
CalculatorApplication.prototype.Operate = function(op,textObj) {


    if ( op.indexOf("*") > -1 ) { this.operator = 1; };       //codes for *
    if ( op.indexOf("/") > -1 ) { this.operator = 2; };       // slash (divide)
    if ( op.indexOf("+") > -1 ) { this.operator = 3; };       // sum
    if ( op.indexOf("-") > -1 ) { this.operator = 4; };       // difference
    if ( op.indexOf("%") > -1 ) { this.operator = 5; };       //modulus

    this.operand1 = this.operand2;                 //store value
    this.operand2 = "";                     //or we could use "0"
    textObj.setTextValue( this.textBox, this.operand2);
};

//computation of  2 numbers
CalculatorApplication.prototype.Calculate = function(textObj){

    if ( this.operator == 1 ) { this.operand2 = Number(this.operand1) * Number(this.operand2); };
    if ( this.operator == 2 ) { this.operand2 = Number(this.operand1) / Number(this.operand2); };
    if ( this.operator == 3 ) { this.operand2 = Number(this.operand1) + Number(this.operand2); };
    if ( this.operator == 4 ) { this.operand2 = Number(this.operand1) - Number(this.operand2); };
    if ( this.operator == 5 ) { this.operand2 = Number(this.operand1) % Number(this.operand2); };

    this.operator = 0;                //clear this.operator
    this.operand1    = "0";              //clear this.operand1
    textObj.setTextValue( this.textBox, this.operand2);
};

//opreation to be performed when an operator is clicked
CalculatorApplication.prototype.onOperatorClick = function($event, buttonObj ,textObj) {

    if(buttonObj.dataValue == "." )
        this.Dot(textObj);

    else if( buttonObj.dataValue == "+-" )
        this.PlusMinus(textObj);

    else if( buttonObj.dataValue == "CE" )
        this.Clear(textObj);

    else if( buttonObj.dataValue == "C" )
        this.allClear(textObj);

    else if( buttonObj.dataValue == "+" || buttonObj.dataValue == "-" || buttonObj.dataValue == '*' || buttonObj.dataValue == "/" || buttonObj.dataValue == "%" ){
        this.Operate(buttonObj.dataValue,textObj);
    }
    else if( buttonObj.dataValue == "=" )
        this.Calculate(textObj);

};

//creating a button panel for buttons
CalculatorApplication.prototype.createButtonPanel = function(textObj){

    var values = [ {
        displayValue : "CE",
        dataValue  :  "CE",
        type : "OPERATOR"
    },{
        displayValue : "C",
        dataValue : "C",
        type : "OPERATOR"
    },{
        displayValue : "%",
        dataValue : "%",
        type : "OPERATOR"
    },{
        displayValue : "/",
        dataValue : "/",
        type : "OPERATOR"
    },{
        displayValue : "7",
        dataValue : "7",
        type : "NUMBER"
    },{
        displayValue : "8",
        dataValue : "8",
        type : "NUMBER"
    },{
        displayValue : "9",
        dataValue : "9",
        type : "NUMBER"
    },{
        displayValue : "*",
        dataValue : "*",
        type : "OPERATOR"
    },{
        displayValue : "4",
        dataValue : "4",
        type : "NUMBER"
    },{
        displayValue : "5",
        dataValue : "5",
        type : "NUMBER"
    },{
        displayValue : "6",
        dataValue : "6",
        type : "NUMBER"
    },{
        displayValue : "-",
        dataValue : "-",
        type : "OPERATOR"
    },{
        displayValue : "1",
        dataValue : "1",
        type : "NUMBER"
    },{
        displayValue : "2",
        dataValue : "2",
        type : "NUMBER"
    },{
        displayValue : "3",
        dataValue : "3",
        type : "NUMBER"
    },{
        displayValue : "+",
        dataValue : "+",
        type : "OPERATOR"
    },{
        displayValue : "+-",
        dataValue : "+-",
        type : "OPERATOR"
    },{
        displayValue : "0",
        dataValue : "0",
        type : "NUMBER"
    },{
        displayValue : ".",
        dataValue : ".",
        type : "OPERATOR"
    },{
        displayValue : "=",
        dataValue : "=",
        type : "OPERATOR"
    }];


    //creating a panel for buttons
    var buttonPanel = this.createDiv("buttonPanel");


    var that = this;
    var Panel,i=1;
    values.forEach(function (obj, index) {
        var buttonObj = new Button(obj),
            button = buttonObj.createButton();


        if(index % 4 == 0) {

            Panel = that.createDiv("Panel"+(i));
            i++;
        }
        Panel.appendChild(button);

        button.addEventListener('click', function ($event) {

            if (buttonObj.type == 'NUMBER') {
                that.onNumberClick.call(that, $event, buttonObj,textObj);
            } else {
                that.onOperatorClick.call(that, $event, buttonObj,textObj);
            }
        });
        buttonPanel.appendChild(Panel);
    });
    return buttonPanel;
};


new CalculatorApplication();

new CalculatorApplication();
//      new CalculatorApplication();
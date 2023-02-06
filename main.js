pontos = 0;

function bodyLoaded(){
    setTimeout(time(), 400000);
    for (i=400; i--;) {
        document.querySelector("#tempo").innerHTML=" Tempo: "+i;
        if(i=0){
            gotResult();
        }
    }
    names = ["beach", "rain", "stitches", "line"];
    indice = Math.floor(Math.random()*3);
    console.log(indice);
    choosen=names[indice];
    document.querySelector("#esboçoSerDesenhado").innerHTML=" Esboço A Ser Desenhado: "+choosen;
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center(); // deixa no centro o canvas
    canvas.position(700, 300);
    background("white");

    canvas.mouseReleased(classifyCanvas); // quando mouse clicar
    synth=window.speechSynthesis; // e a voz da moça 
}
function draw(){
    strokeWeight(10); // tamanho do lapis
    stroke(0); // cor do lapis
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result)
        confidence = result[0].confidence*100;
        document.querySelector("#label").innerHTML=" Esboço Detectado: "+result[0].label.replace("_", " ");
        document.querySelector("#confidence").innerHTML=" Precisão: "+confidence.toFixed(1);
        if(result[0].label==choosen){
            pontos++;
            document.querySelector("#pontos").innerHTML=" Pontuação: "+pontos;
            bodyLoaded();
        }
    }   
}
function time(){
    document.querySelector("#esboçoSerDesenhado").innerHTML=" ACABOU O TEMPO"
}
function clearScreen(){
    background("white");
}

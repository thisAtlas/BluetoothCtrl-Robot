//Adressen på Bluetooth-Dongle, Password er 1234
var macAddress = "00:06:66:7D:83:8D";

function onLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
	/*forward.addEventListener(touchstart, sendForward(), false);
	forward.addEventListener(touchend, sendOff(), false);
	left.addEventListener(touchstart, sendLeft(), false);
	left.addEventListener(touchend, sendOff(), false);
	right.addEventListener(touchstart, sendRight(), false);
	right.addEventListener(touchend, sendOff(), false);
	back.addEventListener(touchstart, sendBack(), false);
	back.addEventListener(touchend, sendOff(), false);*/
}

function sendOff() {
	sendToArduino('s');
}
function sendSpeedDown() {
	sendToArduino('-');
}
function sendSpeedUp() {
	sendToArduino('+');
}
function sendForward() {
	sendToArduino('a');
}
function sendLeft() {
	sendToArduino('v');
}
function sendRight() {
	sendToArduino('h');
}
function sendBack() {
	sendToArduino('b');
}




function onDeviceReady(){
	bluetoothSerial.connect(macAddress, onConnect, onDisconnect);
}

/* I onConnect kaldes bluetoothSerial.subscribe, der kaldes når data modtages
 * data skal sendes med et slut tegn i dette eksempel er det \n, der indgår i
 * Arduino-kommandoen println()
 */
function onConnect() {
    bluetoothSerial.subscribe("\n", onMessage, subscribeFailed);
    document.getElementByID("statusDiv").innerHTML="Connected to " + macAddress + ".";        		
}

/* Data vises i "fraArduino"
 */
function onMessage(data) {
    document.getElementById("fraArduino").innerHTML =""+ data;       
}

/* bluetoothSerial.write sender data af formen 
 * ArrayBuffer, string, array of integers, or a Uint8Array.
 * I dette eksempel sendes en string 
 */
function sendToArduino(data) {
        bluetoothSerial.write(data);
}

function onDisconnect() {
        alert("Disconnected");
        statusDiv.innerHTML="Disconnected.";
}

function subscribeFailed() {
        alert("subscribe failed");
}
	
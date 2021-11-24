/*This script demonstrates sending of user input*/

//Is called if this script shall be exited.
function stopScript() 
{
	scriptThread.setMainWindowAndTaskBarIcon("default.ico");
    scriptThread.appendTextToConsole("script has been stopped");
}

//The dialog is closed.
function dialogFinished(e)
{
	scriptThread.stopScript()
}

//Called by timer (Currently at 1 second)
function timerSlot()
{
	var data = ":";
	data += axisToSend.toString();
	data += "p\r";	
	axisToSend += 1;	
	if(axisToSend > 4){
		axisToSend = 1;
		}			
	UI_textConsole.append("Data Sent to Axis: " + data);
	if(!scriptInf.sendString(data))
		{
		scriptThread.messageBox("Critical", "Error", "Sending failed. Check if ScriptCommunicator is connected.");
		}
}
function parseData()
{
	var data = receivedData[1];
	var cmd = receivedData[2];
		
	receivedData.shift();//shift out the :
	receivedData.shift();//shfit out the axis number
	receivedData.shift();//shfit out the command
	//----------Save this...this is how you convert a number to a string...
	//stringData = data.toString();
	//UI_lineDisplay_4.setText(stringData);
	if (cmd == 112){
		if(data == 49){
			
			}
		else if(data == 50){
			
			}
		else if(data == 51){
			
			}
		else if(data == 52){
			
			}
	}
	receivedData.length = 0;
}
//------------------------------------------------------------------
function dataReceivedSlot(data)
{
	var j = 0;	
	for(var i = 0; i < data.length; i++)
			{
			receivedData.push(data[i]);
			if(data[i] == 13)
				j = 1;
			}	
	if(j == 1)
			{
			parseData();
			}	
}
//------------------------------------------------------------------

function setMicroSteps(){
	var data = ":4i1\r";
	UI_textConsole.append(data);	
	if(!scriptInf.sendString(data))
		{
		scriptThread.messageBox("Critical", "Error", "Sending failed. Check if ScriptCommunicator is connected.");
		}
}
function setRunI(){}
function setHoldI(){}
function setCPR(){}
function setCw(){}
function setAccel(){}
function setVel(){}
function setCurScale(){}
function setLoadError(){}
function setInitError(){}
function setInput1(){}
function setInput2(){}
function setInput3(){}
function setInput4(){}
function setOut1(){}
function setOut2(){}
function setMotor(){}
function sendUnlock(){}
function setAddr(){}
function sendDefaults(){}
function readAll(){}
function sendAll(){}


//timer.start(250);//timer interval= 250ms
//timer.stop();

scriptThread.appendTextToConsole('script has started');
UI_Dialog.finishedSignal.connect(dialogFinished);

//--------------------------------------------------------
//--------Send Buttons--------------------------------
//Motor Settings
UI_uStepRes.clickedSignal.connect(UI_uStepRes, setMicroSteps)
UI_runI.clickedSignal.connect(UI_runI, setRunI)
UI_holdI.clickedSignal.connect(UI_holdI, setHoldI)
UI_encCPR.clickedSignal.connect(UI_encCPR, setCPR)
UI_cW.clickedSignal.connect(UI_cW, setCw)
UI_globalAccel.clickedSignal.connect(UI_globalAccel, setAccel)
UI_globalVel.clickedSignal.connect(UI_globalVel, setVel)
UI_currentScale.clickedSignal.connect(UI_currentScale, setCurScale)
UI_loadError.clickedSignal.connect(UI_loadError, setLoadError)
UI_initError.clickedSignal.connect(UI_initError, setInitError)
//I/O's
UI_inputOne.clickedSignal.connect(UI_inputOne, setInput1)
UI_inputTwo.clickedSignal.connect(UI_inputTwo, setInput2)
UI_inputThree.clickedSignal.connect(UI_inputThree, setInput3)
UI_inputFour.clickedSignal.connect(UI_inputFour, setInput4)
UI_outputOne.clickedSignal.connect(UI_outputOne, setOut1)
UI_outputTwo.clickedSignal.connect(UI_outputTwo, setOut2)
//Addressing
UI_motorAddr.clickedSignal.connect(UI_motorAddr, setMotor)
UI_unLock.clickedSignal.connect(UI_unLock, sendUnlock)
UI_setAddr.clickedSignal.connect(UI_setAddr, setAddr)
//Global Send/Reads
UI_sendDefaults.clickedSignal.connect(UI_sendDefaults, sendDefaults)
UI_readAll.clickedSignal.connect(UI_readAll, readAll)
UI_sendAll.clickedSignal.connect(UI_sendAll, sendAll)
//---------------------------------------------------------

//scriptThread.appendTextToConsole("serial port signals: " + scriptInf.getSerialPortSignals().toString(16));
//scriptThread.setMainWindowAndTaskBarIcon("mainWindowIcon.ico");
//UI_Dialog.setWindowIcon("dialogIcon.png");

//--------------------------------------------
var axisToSend = 1;
var receivedData = Array();
scriptInf.dataReceivedSignal.connect(dataReceivedSlot);
//--------------------------------------------

//Create, start and connect the send timer.
var timer = scriptThread.createTimer();
timer.timeoutSignal.connect(eval("timerSlot"));


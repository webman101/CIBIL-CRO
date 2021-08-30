function Resampler(fromSampleRate,toSampleRate,channels,outputBufferSize,noReturn){this.fromSampleRate=fromSampleRate;this.toSampleRate=toSampleRate;this.channels=channels|0;this.outputBufferSize=outputBufferSize;this.noReturn=!!noReturn;this.initialize()}
Resampler.prototype.initialize=function(){if(this.fromSampleRate>0&&this.toSampleRate>0&&this.channels>0){if(this.fromSampleRate==this.toSampleRate){this.resampler=this.bypassResampler;this.ratioWeight=1}else{this.compileInterpolationFunction();this.resampler=this.interpolate;this.ratioWeight=this.fromSampleRate/this.toSampleRate;this.tailExists=!1;this.lastWeight=0;this.initializeBuffers()}}else{throw(new Error("Invalid settings specified for the resampler."))}}
Resampler.prototype.compileInterpolationFunction=function(){var toCompile="var bufferLength = Math.min(buffer.length, this.outputBufferSize);\
	if ((bufferLength % "+this.channels+") == 0) {\
		if (bufferLength > 0) {\
			var ratioWeight = this.ratioWeight;\
			var weight = 0;";for(var channel=0;channel<this.channels;++channel){toCompile+="var output"+channel+" = 0;"}
toCompile+="var actualPosition = 0;\
			var amountToNext = 0;\
			var alreadyProcessedTail = !this.tailExists;\
			this.tailExists = false;\
			var outputBuffer = this.outputBuffer;\
			var outputOffset = 0;\
			var currentPosition = 0;\
			do {\
				if (alreadyProcessedTail) {\
					weight = ratioWeight;";for(channel=0;channel<this.channels;++channel){toCompile+="output"+channel+" = 0;"}
toCompile+="}\
				else {\
					weight = this.lastWeight;";for(channel=0;channel<this.channels;++channel){toCompile+="output"+channel+" = this.lastOutput["+channel+"];"}
toCompile+="alreadyProcessedTail = true;\
				}\
				while (weight > 0 && actualPosition < bufferLength) {\
					amountToNext = 1 + actualPosition - currentPosition;\
					if (weight >= amountToNext) {";for(channel=0;channel<this.channels;++channel){toCompile+="output"+channel+" += buffer[actualPosition++] * amountToNext;"}
toCompile+="currentPosition = actualPosition;\
						weight -= amountToNext;\
					}\
					else {";for(channel=0;channel<this.channels;++channel){toCompile+="output"+channel+" += buffer[actualPosition"+((channel>0)?(" + "+channel):"")+"] * weight;"}
toCompile+="currentPosition += weight;\
						weight = 0;\
						break;\
					}\
				}\
				if (weight == 0) {";for(channel=0;channel<this.channels;++channel){toCompile+="outputBuffer[outputOffset++] = output"+channel+" / ratioWeight;"}
toCompile+="}\
				else {\
					this.lastWeight = weight;";for(channel=0;channel<this.channels;++channel){toCompile+="this.lastOutput["+channel+"] = output"+channel+";"}
toCompile+="this.tailExists = true;\
					break;\
				}\
			} while (actualPosition < bufferLength);\
			return this.bufferSlice(outputOffset);\
		}\
		else {\
			return (this.noReturn) ? 0 : [];\
		}\
	}\
	else {\
		throw(new Error(\"Buffer was of incorrect sample length.\"));\
	}";this.interpolate=Function("buffer",toCompile)}
Resampler.prototype.bypassResampler=function(buffer){if(this.noReturn){this.outputBuffer=buffer;return buffer.length}else{return buffer}}
Resampler.prototype.bufferSlice=function(sliceAmount){if(this.noReturn){return sliceAmount}else{try{return this.outputBuffer.subarray(0,sliceAmount)}catch(error){try{this.outputBuffer.length=sliceAmount;return this.outputBuffer}catch(error){return this.outputBuffer.slice(0,sliceAmount)}}}}
Resampler.prototype.initializeBuffers=function(generateTailCache){try{this.outputBuffer=new Float32Array(this.outputBufferSize);this.lastOutput=new Float32Array(this.channels)}catch(error){this.outputBuffer=[];this.lastOutput=[]}}
var recLength=0,recBuffers=[],sampleRate,resampler;this.onmessage=function(e){switch(e.data.command){case 'init':init(e.data.config);break;case 'record':record(e.data.buffer);break;case 'exportWAV':exportWAV(e.data.type);break;case 'exportRAW':exportRAW(e.data.type);break;case 'export16kMono':export16kMono(e.data.type);break;case 'getBuffer':getBuffer();break;case 'clear':clear();break}};function init(config){sampleRate=config.sampleRate;resampler=new Resampler(sampleRate,16000,1,50*1024)}
function record(inputBuffer){recBuffers.push(inputBuffer[0]);recLength+=inputBuffer[0].length}
function exportWAV(type){var interleaved=mergeBuffers(recBuffers,recLength);var dataview=encodeWAV(interleaved);var audioBlob=new Blob([dataview],{type:type});this.postMessage(audioBlob)}
function exportRAW(type){var buffer=mergeBuffers(recBuffers,recLength);var dataview=encodeRAW(buffer);var audioBlob=new Blob([dataview],{type:type});this.postMessage(audioBlob)}
function export16kMono(type){var buffer=mergeBuffers(recBuffers,recLength);var samples=resampler.resampler(buffer);var dataview=encodeRAW(samples);var audioBlob=new Blob([dataview],{type:type});this.postMessage(audioBlob)}
function exportSpeex(type){var buffer=mergeBuffers(recBuffers,recLength);var speexData=Speex.process(buffer);var audioBlob=new Blob([speexData],{type:type});this.postMessage(audioBlob)}
function getBuffer(){var buffers=[];buffers.push(mergeBuffers(recBuffers,recLength));this.postMessage(buffers)}
function clear(){recLength=0;recBuffers=[]}
function mergeBuffers(recBuffers,recLength){var result=new Float32Array(recLength);var offset=0;for(var i=0;i<recBuffers.length;i++){result.set(recBuffers[i],offset);offset+=recBuffers[i].length}
return result}
function interleave(inputL,inputR){var length=inputL.length+inputR.length;var result=new Float32Array(length);var index=0,inputIndex=0;while(index<length){result[index++]=inputL[inputIndex];result[index++]=inputR[inputIndex];inputIndex++}
return result}
function mix(inputL,inputR){var length=inputL.length;var result=new Float32Array(length);var index=0,inputIndex=0;while(index<length){result[index++]=inputL[inputIndex]+inputR[inputIndex];inputIndex++}
return result}
function floatTo16BitPCM(output,offset,input){for(var i=0;i<input.length;i++,offset+=2){var s=Math.max(-1,Math.min(1,input[i]));output.setInt16(offset,s<0?s*0x8000:s*0x7FFF,!0)}}
function writeString(view,offset,string){for(var i=0;i<string.length;i++){view.setUint8(offset+i,string.charCodeAt(i))}}
function encodeWAV(samples){var buffer=new ArrayBuffer(44+samples.length*2);var view=new DataView(buffer);writeString(view,0,'RIFF');view.setUint32(4,32+samples.length*2,!0);writeString(view,8,'WAVE');writeString(view,12,'fmt ');view.setUint32(16,16,!0);view.setUint16(20,1,!0);view.setUint16(22,2,!0);view.setUint32(24,sampleRate,!0);view.setUint32(28,sampleRate*4,!0);view.setUint16(32,4,!0);view.setUint16(34,16,!0);writeString(view,36,'data');view.setUint32(40,samples.length*2,!0);floatTo16BitPCM(view,44,samples);return view}
function encodeRAW(samples){var buffer=new ArrayBuffer(samples.length*2);var view=new DataView(buffer);floatTo16BitPCM(view,0,samples);return view}
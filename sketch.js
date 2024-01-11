let capture, graphics, p;
const codeReader = new ZXing.BrowserMultiFormatReader();
function setup() {
  noCanvas();
  graphics = createGraphics(1280, 720);
  capture = createCapture(VIDEO);
  capture.elt.id="video"
  capture.size(graphics.width, graphics.height);
  //capture.hide();
  p = createP("Scanning...")
  codeReader
  .listVideoInputDevices()
  .then(videoInputDevices => {
    const firstDeviceId = videoInputDevices[0].deviceId;
    codeReader.decodeFromVideoDevice(firstDeviceId, 'video', (result, err) => {
    if (result) {
      // properly decoded qr code
      console.log('Found QR code!', result)
      p.html(result.text)
      window.open(result.text);
    }
  })
  })
  .catch(err => console.error(err))
}

function draw() {
  noLoop()
  return
  background(0);
  //point(120,80)
  graphics.image(capture, 0, 0);
  noFill()
  stroke(220)
  strokeWeight(2)
  image(graphics,0,0)
  rect(0,0,graphics.width,graphics.height)
  //stroke(255,0,0)
  //line(20,height/2,width - 20,height/2)
  let img = createImage(graphics.width,graphics.height);
  img.copy(graphics, 0, 0, graphics.width, graphics.height, 0, 0, graphics.width, graphics.height)
  
  codeReader.decodeFromImage(img)
    .then(result => console.log(result.text))
    .catch(err => console.error(err))
  
  noLoop()
}

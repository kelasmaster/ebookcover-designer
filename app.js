const canvas = new fabric.Canvas('coverCanvas');

// Add Text
document.getElementById('addTextBtn').addEventListener('click', () => {
  const textValue = document.getElementById('textInput').value;
  const fontFamily = document.getElementById('fontFamily').value;
  const fontSize = parseInt(document.getElementById('fontSize').value);
  const textColor = document.getElementById('textColor').value;

  if (!textValue) return;

  const text = new fabric.Textbox(textValue, {
    left: 50,
    top: 50,
    fontFamily: fontFamily,
    fontSize: fontSize || 30,
    fill: textColor || '#000',
    hasControls: true,
    selectable: true,
    lockUniScaling: true,
    draggable: true
  });

  canvas.add(text);
});

// Upload Images
document.getElementById('imageUpload').addEventListener('change', function(e) {
  const files = e.target.files;
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function(event) {
      fabric.Image.fromURL(event.target.result, function(img) {
        img.set({ left: 100, top: 100, angle: 0, scaleX: 0.5, scaleY: 0.5 });
        canvas.add(img);
      });
    };
    reader.readAsDataURL(file);
  }
});

// Background Color
document.getElementById('bgColorPicker').addEventListener('input', function() {
  canvas.setBackgroundColor(this.value, canvas.renderAll.bind(canvas));
});

// Background Image
document.getElementById('bgImageUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    fabric.Image.fromURL(event.target.result, function(img) {
      img.set({ width: canvas.width, height: canvas.height, selectable: false });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  };
  reader.readAsDataURL(file);
});

// Download Cover
document.getElementById('downloadBtn').addEventListener('click', function() {
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1
  });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'ebook-cover.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

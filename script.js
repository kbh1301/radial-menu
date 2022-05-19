let rating = 1;

// settings
const wheelSize = 250; // wheel size in pixels
const btnCount = 7; // # of buttons
const innerCircleSize = 50// percentage of inner circle

const wheel = document.getElementById('wheel');
wheel.style.height = wheel.style.width = `${wheelSize}px`;

// angle in radians from hub of wheel
const angleRadian = 360/btnCount * (Math.PI/180);
// calculate length of opposite side from angle
const oppositeLength = (50 * Math.tan(angleRadian/2))*2;
// calculate ratio percentage and halve it
const halfRatio = (100 - oppositeLength)/2+.5;
// clip each side of pie shape according to ratio calculation
const clipPath = `polygon(${halfRatio}% 0, 50% 50%, ${100-halfRatio}% 0)`;

// label size
const labelSize = (wheelSize-innerCircleSize/100*wheelSize)/2;

for (let i=1; i <= btnCount; i++) {
  // button
  const btnRotation = `rotate(${angleRadian*(i-1)}rad)`
  const ratingBtn = document.createElement('div');
  ratingBtn.id = 'rating-button'+i;
  ratingBtn.className = 'rating-button';
  ratingBtn.value = i;
  ratingBtn.style.clipPath = clipPath;
  ratingBtn.style.transform = btnRotation + `scale(.90)`;
  ratingBtn.onmouseover = () => ratingBtn.style.transform = btnRotation + `scale(1)`;
  ratingBtn.onmouseout = () => ratingBtn.style.transform = btnRotation + `scale(.90)`;
  ratingBtn.onclick = () => {
    document.getElementById('rating-button'+rating).classList.remove('activeRating');
    rating = ratingBtn.value;
    ratingBtn.classList.add('activeRating');
  };

  wheel.appendChild(ratingBtn);
  
  // label
  const ratingLabel = document.createElement('div');
  ratingLabel.className = 'rating-label';
  ratingLabel.innerText = i;
  ratingLabel.style.height = `${labelSize}px`;
  
  ratingBtn.appendChild(ratingLabel);
};

document.getElementById('rating-button'+rating).classList.add('activeRating');
  
  
// inner circle
const radius = innerCircleSize/2;
const precision = 64;
const c = [...Array(precision)].map((_, i) => {
  let a = -i/(precision-1)*Math.PI*2;
  let x = Math.cos(a)*radius + 50;
  let y = Math.sin(a)*radius + 50;
  return `${x}% ${y}%`
});

document.getElementById('wheel').style.clipPath = 
  `polygon(100% 50%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 50%, ${c.join(',')})`;
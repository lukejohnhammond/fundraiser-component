function initFundraiser(componentId, totalValue) {
  const fundraiser = {};

  // get dom
  fundraiser.component = document.getElementById(componentId);
  fundraiser.buttons = fundraiser.component.querySelectorAll('button');
  fundraiser.progress = fundraiser.component.querySelectorAll('.slider .value')[0];
  fundraiser.progressText = fundraiser.component.querySelectorAll('.message span')[0];
  fundraiser.targetValue = fundraiser.component.querySelectorAll('.targetValue .value')[0];

  fundraiser.progressValue = 120;
  fundraiser.totalValue = totalValue;
  fundraiser.progressPercentage = 0;

  fundraiser.targetValue.innerHTML = '&pound' + fundraiser.totalValue;


  // work out new percentage and apply css
  fundraiser.animateValue = (currentVal) => {
    fundraiser.progressPercentage = (currentVal / fundraiser.totalValue) * 100;
    fundraiser.progress.style.width = fundraiser.progressPercentage + '%';
    fundraiser.progressText.innerHTML = fundraiser.totalValue - currentVal;
  };

  // delay initial load
  setTimeout(() => {
    fundraiser.animateValue(fundraiser.progressValue);
  }, 500);

  // init event listeners
  fundraiser.buttons.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      fundraiser.progressValue += parseInt(item.value);
      console.log(fundraiser.progressValue);
      fundraiser.animateValue(fundraiser.progressValue);
    });
  });
  console.log(fundraiser);
}


document.addEventListener('DOMContentLoaded', () => {
  initFundraiser('component_1', 500);
});

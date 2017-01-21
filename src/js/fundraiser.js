function initFundraiser(componentId, totalValue) {
  const fundraiser = {
    component: document.getElementById(componentId),
    progressValue: 50,
    totalValue: totalValue,
    progressPercentage: 0,
    setTargetValue: () => {
      this.targetValue.innerHTML = '&pound' + this.totalValue;
    },
    // work out new percentage and apply css
    calcProgress: (currentVal) => {
      fundraiser.progressPercentage = (currentVal / fundraiser.totalValue) * 100;
      fundraiser.progress.style.width = fundraiser.progressPercentage + '%';
      if(currentVal === fundraiser.totalValue){
        fundraiser.progressText.innerHTML = 'Congratulations!! You have reached your target!';
      } else if(currentVal > fundraiser.totalValue) {
        fundraiser.progressText.innerHTML = 'Congratulations!! You are &pound;' + (fundraiser.totalValue - currentVal)*-1 + ' over your target!';
      } else {
        fundraiser.progressText.innerHTML = 'You need &pound;' + (fundraiser.totalValue - currentVal) + ' to reach your target!';
      }
    }
  };

  // Populate additional DOM elems
  fundraiser.buttons = fundraiser.component.querySelectorAll('button');
  fundraiser.progress = fundraiser.component.querySelectorAll('.slider .value')[0];
  fundraiser.progressText = fundraiser.component.querySelectorAll('.message')[0];
  fundraiser.targetValue = fundraiser.component.querySelectorAll('.targetValue .value')[0];

  // delay initial load
  setTimeout(() => {
    fundraiser.calcProgress(fundraiser.progressValue);
  }, 500);

  // init event listeners
  fundraiser.buttons.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      fundraiser.progressValue += parseInt(item.value);
      fundraiser.calcProgress(fundraiser.progressValue);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFundraiser('component_1', 100);
});

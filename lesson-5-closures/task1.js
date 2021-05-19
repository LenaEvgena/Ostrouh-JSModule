var johnObj = {
  bills: [124, 48, 268, 180, 42],
  tips:[],
  finalBills:[],
  calcTips: function () {
    for (var i = 0; i < this.bills.length; i++) {
      var bill = this.bills[i];
      if (bill < 50) {
        percent = 0.2;
      } else if (bill >= 50 && bill <= 200) {
        percent = 0.15;
      } else if (bill > 200) {
        percent = 0.1;
      }
      this.tips.push(+(bill *= percent).toFixed(2));
      this.finalBills[i] = this.tips[i] + this.bills[i];
    }
    return (this.tips, this.finalBills);
  }
};

var markObj = {
  bills: [77, 375, 110, 45],
  tips:[],
  finalBills:[],
  calcTips: function () {
    for (var i = 0; i < this.bills.length; i++) {
      var bill = this.bills[i];
      if (bill < 100) {
        percent = 0.2;
      } else if (bill >= 100 && bill <= 300) {
        percent = 0.1;
      } else if (bill > 300) {
        percent = 0.25;
      }
      this.tips.push(+(bill *= percent).toFixed(2));
      this.finalBills[i] = this.tips[i] + this.bills[i];
    }
    return (this.tips, this.finalBills);
  }
};

johnObj.calcTips();
markObj.calcTips();

function averageTip(arr) {
	var sum = 0;
	for (var tip of arr) {
		sum += tip;
	}
	return +(sum/arr.length).toFixed(2);
}

if (averageTip(johnObj.tips) > averageTip(markObj.tips)) {
  console.log('John\'s family paid the highest tips on average: $' + averageTip(johnObj.tips));
} else {
  console.log('Mark\'s family paid the highest tips on average: $' + averageTip(markObj.tips));
}



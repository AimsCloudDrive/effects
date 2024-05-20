
const getResult = function (res: number): number {
  return  res % (Math.pow(10, 9) + 7);
}

const getHeroLists = function (nums: Array<number>, count: number) {
  
  if (count < 1 || count > nums.length) throw new Error("Error");
  
  const result: number[][] = [];
  
  
  let tmp: number[] = [];
  const combinations = function(key: number): void {
    if (tmp.length === count) {
      result.push([...tmp]);
      return;
    }
    for (let i = key; i <= nums.length - (count - tmp.length); i++) { // 第一个数
      
      tmp.push(nums[i]);
      combinations(i + 1);
      tmp.pop();
    }
  }
  
  combinations(0);
  
  
  return result;
}

const getHeroListPower = function (heroList: Array<number>): number {
  return Math.pow(Math.max(...heroList), 2) * Math.min(...heroList);
}



const sumOfPower = function (nums: number[]): number {
  if (nums === null) return getResult(0)
  const length = nums.length;
  if (length === 0) return getResult(0) ;
  if (length === 1) return getResult(nums[0]);
  let sum: number = 0;
  for (let count = 1; count <= length; count++) {
    for (let heroList of getHeroLists(nums, count)) {
      sum = getResult(sum + getHeroListPower(heroList));
    }
  }
  
  return sum;
}

export {sumOfPower, getHeroLists, getHeroListPower, getResult};


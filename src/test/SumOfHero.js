"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.getHeroListPower = exports.getHeroLists = exports.sumOfPower = void 0;
var getResult = function (res) {
    return res % (Math.pow(10, 9) + 7);
};
exports.getResult = getResult;
var getHeroLists = function (nums, count) {
    if (count < 1 || count > nums.length)
        throw new Error("Error");
    var result = [];
    var tmp = [];
    var combinations = function (key) {
        if (tmp.length === count) {
            result.push(__spreadArray([], tmp, true));
            return;
        }
        for (var i = key; i <= nums.length - (count - tmp.length); i++) { // 第一个数
            tmp.push(nums[i]);
            combinations(i + 1);
            tmp.pop();
        }
    };
    combinations(0);
    return result;
};
exports.getHeroLists = getHeroLists;
var getHeroListPower = function (heroList) {
    return Math.pow(Math.max.apply(Math, heroList), 2) * Math.min.apply(Math, heroList);
};
exports.getHeroListPower = getHeroListPower;
var sumOfPower = function (nums) {
    if (nums === null)
        return getResult(0);
    var length = nums.length;
    if (length === 0)
        return getResult(0);
    if (length === 1)
        return getResult(nums[0]);
    var sum = 0;
    for (var count = 1; count <= length; count++) {
        for (var _i = 0, _a = getHeroLists(nums, count); _i < _a.length; _i++) {
            var heroList = _a[_i];
            sum = getResult(sum + getHeroListPower(heroList));
        }
    }
    return sum;
};
exports.sumOfPower = sumOfPower;

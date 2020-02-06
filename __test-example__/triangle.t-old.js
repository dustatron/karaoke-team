import { Triangle } from '../../src/js/triangle.js';
import { exportAllDeclaration } from '@babel/types';

describe('Triangle', () => {
	test('should correctly determine if three length are an equilateral triangle', () => {
		var isEuilatTriangle = new Triangle(3, 3, 3);
		expect(isEuilatTriangle.checkType()).toEqual('equilateral triangle');
	});

	test('should correctly determine whether three lengths make an isosceles triange', () => {
		var isocTriangle = new Triangle(5, 5, 7);
		expect(isocTriangle.checkType()).toEqual('isosceles triangle');
	});

	test('should correctly determine whether there lengths make a scalene triangle', function() {
		var scalTriangle = new Triangle(4, 5, 7);
		expect(scalTriangle.checkType()).toEqual('scalene triangle');
	});

	test('should correctly determine whether three lengths are not a triangle', () => {
		var notTriangle = new Triangle(3, 9, 22);
		expect(notTriangle.checkType()).toEqual('not a triangle');
	});

	test('should correctly create a triangle object with three leng this', () => {
		var triangle = new Triangle(2, 4, 5);
		expect(triangle.side1).toEqual(2);
		expect(triangle.side2).toEqual(4);
		expect(triangle.side3).toEqual(5);
	});
});

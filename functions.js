"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.changePresentationTitle = changePresentationTitle;
exports.addSlide = addSlide;
exports.deleteSlide = deleteSlide;
exports.changeSlidePosition = changeSlidePosition;
exports.addSlideObject = addSlideObject;
exports.deleteSlideObject = deleteSlideObject;
exports.changeObjectPosition = changeObjectPosition;
exports.changeObjectSize = changeObjectSize;
exports.changeTextAreaValue = changeTextAreaValue;
exports.changeTextAreaTextSize = changeTextAreaTextSize;
exports.changeTextAreaFontFamily = changeTextAreaFontFamily;
exports.changeSlideBackground = changeSlideBackground;
// Изменение названия презентации
function changePresentationTitle(presentation, newTitle) {
    return __assign(__assign({}, presentation), { title: newTitle });
}
// Создание слайда
function addSlide(presentation, newSlide) {
    return __assign(__assign({}, presentation), { slideList: __spreadArray(__spreadArray([], presentation.slideList, true), [newSlide], false) });
}
// Удаление слайда
function deleteSlide(presentation, slideId) {
    return __assign(__assign({}, presentation), { slideList: presentation.slideList.filter(function (slide) { return slide.id !== slideId; }) });
}
// Изменение позиции слайда
function changeSlidePosition(presentation, slideId, newIndex) {
    var updatedSlideList = __spreadArray([], presentation.slideList, true);
    var oldIndex = updatedSlideList.findIndex(function (slide) { return slide.id === slideId; });
    if (oldIndex !== -1) {
        var slide = updatedSlideList.splice(oldIndex, 1)[0];
        updatedSlideList.splice(newIndex, 0, slide);
    }
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Добавление объекта 
function addSlideObject(presentation, slideId, newObject) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            return __assign(__assign({}, slide), { objects: __spreadArray(__spreadArray([], slide.objects, true), [newObject], false) });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Удаление объекта 
function deleteSlideObject(presentation, slideId, objectId) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            return __assign(__assign({}, slide), { objects: slide.objects.filter(function (object) { return object.id !== objectId; }) });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение позиции текста/картинки
function changeObjectPosition(presentation, slideId, objectId, newPosition) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            var updatedSlideObjects = slide.objects.map(function (object) {
                if (object.id === objectId) {
                    return __assign(__assign({}, object), { position: newPosition });
                }
                return object;
            });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение размера текста/картинки
function changeObjectSize(presentation, slideId, objectId, newSize) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            var updatedSlideObjects = slide.objects.map(function (object) {
                if (object.id === objectId) {
                    return __assign(__assign({}, object), { size: newSize });
                }
                return object;
            });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение текста
function changeTextAreaValue(presentation, slideId, objectId, newValue) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            var updatedSlideObjects = slide.objects.map(function (object) {
                if (object.id === objectId) {
                    return __assign(__assign({}, object), { value: newValue });
                }
                return object;
            });
            return __assign(__assign({}, slide), { objects: updatedSlideObjects });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение размера текста
function changeTextAreaTextSize(presentation, slideId, objectId, newTextSize) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            var updatedSlideObjects = slide.objects.map(function (object) {
                if (object.id === objectId) {
                    return __assign(__assign({}, object), { textSize: newTextSize });
                }
                return object;
            });
            return __assign(__assign({}, slide), { objects: updatedSlideObjects });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение шрифта текста
function changeTextAreaFontFamily(presentation, slideId, objectId, newFontFamily) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            var updatedSlideObjects = slide.objects.map(function (object) {
                if (object.id === objectId && object.type === 'text') {
                    return __assign(__assign({}, object), { fontFamily: newFontFamily });
                }
                return object;
            });
            return __assign(__assign({}, slide), { objects: updatedSlideObjects });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение фона слайда
function changeSlideBackground(presentation, slideId, newBackgroundType, newBackground) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            if (newBackgroundType === 'color') {
                return __assign(__assign({}, slide), { background: {
                        type: 'color',
                        value: newBackground
                    } });
            }
            else {
                return __assign(__assign({}, slide), { background: {
                        type: 'image',
                        src: newBackground
                    } });
            }
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
var minPresentation = {
    title: 'Презентация с минимальными данными',
    slideList: [{
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [],
            selectedObjects: []
        }],
    selectedSlides: ['1'],
};
var maxPresentation = {
    title: 'Презентация с максимальными данными',
    slideList: [
        {
            id: '1',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [
                {
                    id: 'obj1',
                    position: { x: 10, y: 20 },
                    size: { h: 100, w: 200 },
                    value: 'Заголовок',
                    fontFamily: 'Arial',
                    textSize: 24,
                    type: 'text',
                },
                {
                    id: 'obj2',
                    position: { x: 20, y: 20 },
                    size: { h: 150, w: 300 },
                    value: 'Текст',
                    fontFamily: 'Calibri',
                    textSize: 12,
                    type: 'text',
                },
            ],
            selectedObjects: [],
        },
        {
            id: '2',
            background: { type: 'image', src: '../../images/backgrounds/mountains.png' },
            objects: [
                {
                    id: 'obj3',
                    position: { x: 10, y: 20 },
                    size: { h: 500, w: 500 },
                    src: '../../images/image1.png',
                    type: 'image',
                },
                {
                    id: 'obj4',
                    position: { x: 20, y: 20 },
                    size: { h: 150, w: 300 },
                    value: 'Текст',
                    fontFamily: 'Calibri',
                    textSize: 12,
                    type: 'text',
                },
            ],
            selectedObjects: [],
        },
        {
            id: '3',
            background: { type: 'color', value: '#F7F7F7' },
            objects: [],
            selectedObjects: [],
        },
    ],
    selectedSlides: ['2', '3', '1'],
};
function testMinimum() {
    console.log('----------------------------------------TEST MINIMUM----------------------------------------');
    console.log('\n\nchangePresentationTitle() \nold title:', minPresentation.title);
    var tempPresentation = changePresentationTitle(minPresentation, 'new title!');
    console.log('\nnew title', tempPresentation.title);
    console.log('\n\addSlide() \nold slideList:', minPresentation.slideList);
    var tempPresentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] });
    console.log('\nnew slideList', tempPresentation.slideList);
    var tempPresentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] });
    console.log('\n\ndeleteslide() \nold slideList:', tempPresentation.slideList);
    tempPresentation = deleteSlide(tempPresentation, '1');
    console.log('\nnew slideList', tempPresentation.slideList);
    var tempPresentation = addSlide(minPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] });
    tempPresentation = addSlide(tempPresentation, { id: '3', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] });
    console.log('\n\nchangeSlidePosition() \nold slideList:', tempPresentation.slideList);
    tempPresentation = changeSlidePosition(tempPresentation, '2', 1);
    console.log('\nnew slideList', tempPresentation.slideList);
    console.log('\n\naddSlideObject() \nold objectList:', minPresentation.slideList[0]);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    console.log('new objectList:', tempPresentation.slideList[0]);
    console.log('\n\naddSlideObject() \nold objectList:', minPresentation.slideList[0]);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = deleteSlide(tempPresentation, '1');
    console.log('new objectList:', tempPresentation.slideList[0]);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    console.log('\n\nchangeObjectPosition() \nold object:', tempPresentation.slideList[0].objects[0].position);
    tempPresentation = changeObjectPosition(tempPresentation, '1', 'text1', { x: 120, y: 300 });
    console.log('new objectList:', tempPresentation.slideList[0].objects[0].position);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    console.log('\n\nchangeObjectSize() \nold object:', tempPresentation.slideList[0].objects[0].size);
    tempPresentation = changeObjectSize(tempPresentation, '1', 'text1', { h: 120, w: 300 });
    console.log('new object:', tempPresentation.slideList[0].objects[0].size);
    console.log('\n\nchangeTextAreaValue() \nold objectList:', minPresentation.slideList[0]);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = changeTextAreaValue(tempPresentation, '1', 'text1', 'Changed Value');
    console.log('new objectList:', tempPresentation.slideList[0].objects);
    console.log('\n\nchangeTextAreaTextSize() \nold objectList:', minPresentation.slideList[0]);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = changeTextAreaTextSize(tempPresentation, '1', 'text1', 24);
    console.log('new objectList:', tempPresentation.slideList[0].objects);
    console.log('\n\nchangeTextAreaFontFamily() \nold objectList:', minPresentation.slideList[0]);
    var tempPresentation = addSlideObject(minPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = changeTextAreaFontFamily(tempPresentation, '1', 'text1', 'Times NewRoman');
    console.log('new objectList:', tempPresentation.slideList[0].objects);
}
function testMaximum() {
    console.log('----------------------------------------TEST MAXIMUM----------------------------------------');
    console.log('\n\nchangePresentationTitle() \nold title:', maxPresentation.title);
    var tempPresentation = changePresentationTitle(maxPresentation, 'new title!');
    console.log('\nnew title', tempPresentation.title);
    console.log('\n\addSlide() \nold slideList:', maxPresentation.slideList);
    var tempPresentation = addSlide(maxPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] });
    console.log('\nnew slideList', tempPresentation.slideList);
    var tempPresentation = addSlide(maxPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] });
    console.log('\n\ndeleteslide() \nold slideList:', tempPresentation.slideList);
    tempPresentation = deleteSlide(tempPresentation, '1');
    console.log('\nnew slideList', tempPresentation.slideList);
    var tempPresentation = addSlide(maxPresentation, { id: '2', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] });
    tempPresentation = addSlide(tempPresentation, { id: '3', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] });
    console.log('\n\nchangeSlidePosition() \nold slideList:', tempPresentation.slideList);
    tempPresentation = changeSlidePosition(tempPresentation, '2', 1);
    console.log('\nnew slideList', tempPresentation.slideList);
    console.log('\n\naddSlideObject() \nold objectList:', maxPresentation.slideList[0]);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    console.log('new objectList:', tempPresentation.slideList[0]);
    console.log('\n\naddSlideObject() \nold objectList:', maxPresentation.slideList[0]);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = deleteSlide(tempPresentation, '1');
    console.log('new objectList:', tempPresentation.slideList[0]);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    console.log('\n\nchangeObjectPosition() \nold object:', tempPresentation.slideList[0].objects[0].position);
    tempPresentation = changeObjectPosition(tempPresentation, '1', 'text1', { x: 120, y: 300 });
    console.log('new objectList:', tempPresentation.slideList[0].objects[0].position);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    console.log('\n\nchangeObjectSize() \nold object:', tempPresentation.slideList[0].objects[0].size);
    tempPresentation = changeObjectSize(tempPresentation, '1', 'text1', { h: 120, w: 300 });
    console.log('new object:', tempPresentation.slideList[0].objects[0].size);
    console.log('\n\nchangeTextAreaValue() \nold objectList:', maxPresentation.slideList[0]);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = changeTextAreaValue(tempPresentation, '1', 'text1', 'Changed Value');
    console.log('new objectList:', tempPresentation.slideList[0].objects);
    console.log('\n\nchangeTextAreaTextSize() \nold objectList:', maxPresentation.slideList[0]);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = changeTextAreaTextSize(tempPresentation, '1', 'text1', 24);
    console.log('new objectList:', tempPresentation.slideList[0].objects);
    console.log('\n\nchangeTextAreaFontFamily() \nold objectList:', maxPresentation.slideList[0]);
    var tempPresentation = addSlideObject(maxPresentation, '1', {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    });
    tempPresentation = changeTextAreaFontFamily(tempPresentation, '1', 'text1', 'Times NewRoman');
    console.log('new objectList:', tempPresentation.slideList[0].objects);
}
testMinimum();
testMaximum();

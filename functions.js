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
function testMinimum() {
    var _a, _b, _c, _d, _e, _f;
    var presentation = {
        title: 'test minimum',
        slideList: [],
        selectedSlides: []
    };
    var slides = [
        { id: '1', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },
        { id: '2', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] },
        { id: '3', background: { type: 'image', src: '/icons/icon1.svg' }, objects: [], selectedObjects: [] }
    ];
    var textObject = {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    };
    console.log('\nchangePresentationTitle()');
    console.log('old title:', presentation.title);
    presentation = changePresentationTitle(presentation, 'changed title');
    console.log('new title:', presentation.title);
    console.log('\n\n\naddSlide()');
    console.log('old slideList:', presentation.slideList);
    slides.forEach(function (slide) {
        presentation = addSlide(presentation, slide);
    });
    console.log('new slideList:', presentation.slideList);
    console.log('\n\n\ndeleteSlide()');
    console.log('old slideList:', presentation.slideList);
    presentation = deleteSlide(presentation, '1');
    console.log('new slideList:', presentation.slideList);
    console.log('\n\n\nchangeSlidePosition()');
    console.log('old slideList:', presentation.slideList);
    presentation = changeSlidePosition(presentation, '3', 0);
    console.log('new slideList:', presentation.slideList);
    console.log('\n\n\naddSlideObject()');
    console.log('old slide objects:', presentation.slideList[1].objects);
    presentation = addSlideObject(presentation, '2', textObject);
    console.log('new slide objects:', presentation.slideList[1].objects);
    console.log('\n\n\naddSlideObject()');
    console.log('old slide objects:', presentation.slideList[1].objects);
    presentation = deleteSlideObject(presentation, '2', 'text1');
    console.log('new slide objects:', presentation.slideList[1].objects);
    presentation = addSlideObject(presentation, '2', textObject);
    console.log('\n\n\nchangeTextAreaValue()');
    var oldTextArea = (_a = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _a === void 0 ? void 0 : _a.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('old text area value:', oldTextArea.value);
    presentation = changeTextAreaValue(presentation, '2', 'text1', 'new text');
    var newTextArea = (_b = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _b === void 0 ? void 0 : _b.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('new text area value:', newTextArea.value);
    console.log('\n\n\nchangeObjectSize()');
    console.log('old object size:', (_c = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _c === void 0 ? void 0 : _c.objects.find(function (textarea) { return textarea.id === 'text1'; }));
    presentation = changeObjectSize(presentation, '2', 'text1', { h: 150, w: 150 });
    console.log('new object size:', (_d = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _d === void 0 ? void 0 : _d.objects.find(function (textarea) { return textarea.id === 'text1'; }));
    console.log('\nchangeTextAreaTextSize()');
    var oldTextSize = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text1'; });
    console.log('old textSize:', oldTextSize.textSize);
    presentation = changeTextAreaTextSize(presentation, '2', 'text1', 24);
    var newTextSize = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text1'; });
    console.log('new textSize:', newTextSize.textSize);
    console.log('\nchangeTextAreaFontFamily():');
    var oldFontFamily = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text1'; });
    console.log('old ff:', oldFontFamily.fontFamily);
    presentation = changeTextAreaFontFamily(presentation, '2', 'text1', 'Verdana');
    var newFontFamily = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text1'; });
    console.log('new ff:', newFontFamily.fontFamily);
    console.log('\nchangeSlideBackground()');
    var oldSlide = (_e = presentation.slideList.find(function (slide) { return slide.id === '3'; })) === null || _e === void 0 ? void 0 : _e.background;
    console.log('old slide bg:', oldSlide);
    presentation = changeSlideBackground(presentation, '3', 'image', '/images/image1.png');
    var newSlide = (_f = presentation.slideList.find(function (slide) { return slide.id === '3'; })) === null || _f === void 0 ? void 0 : _f.background;
    console.log('new slide bg:', newSlide);
    console.log();
}
function testMaximum() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var presentation = {
        title: 'test maximum',
        slideList: [
            {
                id: '1',
                background: { type: 'color', value: '#FFFFFF' },
                objects: [
                    {
                        id: '1',
                        position: { x: 100, y: 50 },
                        size: { h: 100, w: 100 },
                        value: 'Sample Text',
                        fontFamily: 'Arial',
                        textSize: 14,
                        type: 'text'
                    },
                ],
                selectedObjects: [],
            },
            {
                id: '2',
                background: { type: 'image', src: '/icons/icon1.svg' },
                objects: [],
                selectedObjects: []
            }
        ],
        selectedSlides: []
    };
    var slides = [
        { id: '3', background: { type: 'color', value: '#FFFFFF' }, objects: [], selectedObjects: [] },
        { id: '4', background: { type: 'color', value: '#000000' }, objects: [], selectedObjects: [] },
        { id: '5', background: { type: 'image', src: '/icons/icon1.svg' }, objects: [], selectedObjects: [] }
    ];
    var textObject = {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    };
    console.log('\nchangePresentationTitle()');
    console.log('old title:', presentation.title);
    presentation = changePresentationTitle(presentation, 'changed title');
    console.log('new title:', presentation.title);
    console.log('\n\n\naddSlide()');
    console.log('old slideList:', presentation.slideList);
    slides.forEach(function (slide) {
        presentation = addSlide(presentation, slide);
    });
    console.log('new slideList:', presentation.slideList);
    console.log('\n\n\ndeleteSlide()');
    console.log('old slideList:', presentation.slideList);
    presentation = deleteSlide(presentation, '1');
    console.log('new slideList:', presentation.slideList);
    console.log('\n\n\nchangeSlidePosition()');
    console.log('old slideList:', presentation.slideList);
    presentation = changeSlidePosition(presentation, '3', 0);
    console.log('new slideList:', presentation.slideList);
    console.log('\n\n\naddSlideObject()');
    console.log('old slide objects:', presentation.slideList[1].objects);
    presentation = addSlideObject(presentation, '2', textObject);
    console.log('new slide objects:', presentation.slideList[1].objects);
    console.log('\n\n\ndeleteSlideObject()');
    console.log('old slide objects:', presentation.slideList[1].objects);
    presentation = deleteSlideObject(presentation, '2', 'text1');
    console.log('new slide objects:', presentation.slideList[1].objects);
    presentation = addSlideObject(presentation, '2', textObject);
    console.log('\n\n\nchangeTextAreaValue()');
    var oldTextArea = (_a = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _a === void 0 ? void 0 : _a.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('old text area value:', oldTextArea.value);
    presentation = changeTextAreaValue(presentation, '2', 'text1', 'new text');
    var newTextArea = (_b = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _b === void 0 ? void 0 : _b.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('new text area value:', newTextArea.value);
    console.log('\n\n\nchangeObjectSize()');
    var oldSize = (_c = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _c === void 0 ? void 0 : _c.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('old object size:', oldSize.size);
    presentation = changeObjectSize(presentation, '2', 'text1', { h: 150, w: 200 });
    var newSize = (_d = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _d === void 0 ? void 0 : _d.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('new object size:', newSize.size);
    console.log('\nchangeTextAreaTextSize()');
    var oldTextSize = (_e = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _e === void 0 ? void 0 : _e.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('old textSize:', oldTextSize.textSize);
    presentation = changeTextAreaTextSize(presentation, '2', 'text1', 24);
    var newTextSize = (_f = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _f === void 0 ? void 0 : _f.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('new textSize:', newTextSize.textSize);
    console.log('\nchangeTextAreaFontFamily()');
    var oldFontFamily = (_g = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _g === void 0 ? void 0 : _g.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('old fontFamily:', oldFontFamily.fontFamily);
    presentation = changeTextAreaFontFamily(presentation, '2', 'text1', 'Verdana');
    var newFontFamily = (_h = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _h === void 0 ? void 0 : _h.objects.find(function (textarea) { return textarea.id === 'text1'; });
    console.log('new fontFamily:', newFontFamily.fontFamily);
    console.log('\nchangeSlideBackground()');
    var oldBackground = (_j = presentation.slideList.find(function (slide) { return slide.id === '3'; })) === null || _j === void 0 ? void 0 : _j.background;
    console.log('old slide bg:', oldBackground);
    presentation = changeSlideBackground(presentation, '3', 'image', '/images/image1.png');
    var newBackground = (_k = presentation.slideList.find(function (slide) { return slide.id === '3'; })) === null || _k === void 0 ? void 0 : _k.background;
    console.log('new slide bg:', newBackground);
    console.log();
}
testMaximum();
// testMinimum()

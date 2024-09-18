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
                    object.position.x = newPosition.x;
                    object.position.y = newPosition.y;
                }
                return object;
            });
        }
        return slide;
    });
    return __assign(__assign({}, presentation), { slideList: updatedSlideList });
}
// Изменение размера текста/картинки
function changeObjectSize(presentation, slideId, objectId, newHeight, newWidth) {
    var updatedSlideList = presentation.slideList.map(function (slide) {
        if (slide.id === slideId) {
            var updatedSlideObjects = slide.objects.map(function (object) {
                if (object.id === objectId) {
                    object.size.h = newHeight;
                    object.size.w = newWidth;
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
                if (object.id === objectId) {
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
// // Изменение фона слайда
// function changeSlideBackground(presentation: Presentation, slideId: string, newBacground: Background) {
//     const updatedSlideList = presentation.slideList.map(slide => {
//         if (slide.id === slideId) {
//         }
//     })
// }
function testMinimum() {
    var _a, _b, _c, _d;
    var presentation = {
        title: 'test title',
        slideList: [],
        selectedSlides: []
    };
    var slides = [
        { id: '1', background: { value: '#FFFFFF' }, objects: [] },
        { id: '2', background: { value: '#000000' }, objects: [] },
        { id: '3', background: { value: '#F0F0F0' }, objects: [] }
    ];
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
    var textObject = {
        id: 'text1',
        position: { x: 10, y: 20 },
        size: { h: 100, w: 200 },
        value: 'Hello, World!',
        fontFamily: 'Arial',
        textSize: 16,
        type: 'text'
    };
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
    presentation = changeObjectSize(presentation, '2', 'text1', 150, 300);
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
    console.log();
}
function testMaximum() {
    var _a, _b, _c, _d;
    var presentation = {
        title: 'Max Test Presentation',
        slideList: [],
        selectedSlides: []
    };
    // Создаем слайды с заполненными полями
    var slides = [
        {
            id: '1',
            background: { value: '#FFFFFF' },
            objects: [
                {
                    id: 'text1',
                    position: { x: 10, y: 20 },
                    size: { h: 100, w: 200 },
                    value: 'Hello, Max!',
                    fontFamily: 'Arial',
                    textSize: 16,
                    type: 'text'
                },
                {
                    id: 'img1',
                    position: { x: 30, y: 40 },
                    size: { h: 150, w: 150 },
                    src: 'image1.png',
                    type: 'image'
                }
            ]
        },
        {
            id: '2',
            background: { value: '#000000' },
            objects: [
                {
                    id: 'text2',
                    position: { x: 50, y: 60 },
                    size: { h: 120, w: 250 },
                    value: 'New Text Object',
                    fontFamily: 'Verdana',
                    textSize: 18,
                    type: 'text'
                }
            ]
        },
        {
            id: '3',
            background: { value: '#F0F0F0' },
            objects: []
        }
    ];
    console.log('\nchangePresentationTitle()');
    console.log('old title:', presentation.title);
    presentation = changePresentationTitle(presentation, 'Changed Max Title');
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
    var newTextObject = {
        id: 'text3',
        position: { x: 60, y: 70 },
        size: { h: 130, w: 240 },
        value: 'Another Text Object',
        fontFamily: 'Comic Sans MS',
        textSize: 20,
        type: 'text'
    };
    console.log('old slide objects:', presentation.slideList[1].objects);
    presentation = addSlideObject(presentation, '2', newTextObject);
    console.log('new slide objects:', presentation.slideList[1].objects);
    console.log('\n\n\ndeleteSlideObject()');
    console.log('old slide objects:', presentation.slideList[1].objects);
    presentation = deleteSlideObject(presentation, '2', 'text3');
    console.log('new slide objects:', presentation.slideList[1].objects);
    console.log('\n\n\nchangeTextAreaValue()');
    var oldTextArea = (_a = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _a === void 0 ? void 0 : _a.objects.find(function (textarea) { return textarea.id === 'text2'; });
    console.log('old text area value:', oldTextArea.value);
    presentation = changeTextAreaValue(presentation, '2', 'text2', 'Updated Text Value');
    var newTextArea = (_b = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _b === void 0 ? void 0 : _b.objects.find(function (textarea) { return textarea.id === 'text2'; });
    console.log('new text area value:', newTextArea.value);
    console.log('\n\n\nchangeObjectSize()');
    console.log('old object size:', (_c = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _c === void 0 ? void 0 : _c.objects.find(function (textarea) { return textarea.id === 'text2'; }));
    presentation = changeObjectSize(presentation, '2', 'text2', 150, 300);
    console.log('new object size:', (_d = presentation.slideList.find(function (slide) { return slide.id === '2'; })) === null || _d === void 0 ? void 0 : _d.objects.find(function (textarea) { return textarea.id === 'text2'; }));
    console.log('\nchangeTextAreaTextSize()');
    var oldTextSize = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text2'; });
    console.log('old textSize:', oldTextSize.textSize);
    presentation = changeTextAreaTextSize(presentation, '2', 'text2', 24);
    var newTextSize = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text2'; });
    console.log('new textSize:', newTextSize.textSize);
    console.log('\nchangeTextAreaFontFamily():');
    var oldFontFamily = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text2'; });
    console.log('old ff:', oldFontFamily.fontFamily);
    presentation = changeTextAreaFontFamily(presentation, '2', 'text2', 'Comic Sans MS');
    var newFontFamily = presentation.slideList[1].objects.find(function (obj) { return obj.id === 'text2'; });
    console.log('new ff:', newFontFamily.fontFamily);
    console.log();
}
testMaximum();
// testMinimum()

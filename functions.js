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

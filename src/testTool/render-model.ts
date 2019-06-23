
export class RenderModel {

    private _tag: string;
    private _attributes = {};

    constructor(tagParam: string, attributes: {}) {
        this._tag = tagParam;
        this._attributes = attributes;
    }

    get tag(): string {
        return this._tag;
    }

    set tag(value: string) {
        this._tag = value;
    }

    get attributes(): {} {
        return this._attributes;
    }

    set attributes(value: {}) {
        this._attributes = value;
    }
}

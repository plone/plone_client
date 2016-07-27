export namespace FieldRegistry {
    'use strict';
    let _fields: {} = {};

    export function registerField(fieldtype: string, field: any) {
        _fields[fieldtype] = field;
    }

    export function getField(fieldtype: string) {
        return _fields[fieldtype];
    }

    export function getFields() {
        let fields = [];
        for (let c in this._fields) {
          if (this._fields.hasOwnProperty(c)) {
            fields.push(c);
          }
        }
        return fields;
    }
}

export { FieldRegistry as fieldregistry };

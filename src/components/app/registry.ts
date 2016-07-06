export namespace Registry {
    'use strict';
    let _components: {} = {};
    let _views: {} = {};

    export function registerView(name: string, view: any) {
        _views[name] = view;
    }

    export function getView(name: string) {
        return _views[name];
    }

    export function registerComponent(name: string, component: any) {
        _components[name] = component;
    }

    export function getComponent(name: string) {
        return _components[name];
    }

    export function getComponents() {
        let components = [];
        for (let c in this._components) {
          if (this._components.hasOwnProperty(c)) {
            components.push(c);
          }
        }
        return components;
    }
}

export { Registry as registry };

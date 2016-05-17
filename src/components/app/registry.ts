export namespace Registry {
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
        var components = [];
        for(var c in this._components) {
            components.push(c);
        }
        return components;
    }
}

export { Registry as registry };
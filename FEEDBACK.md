# Feedback about Angular 2

We use Angular 2.0.0-rc.1

## Router

We had to patch the router that way:

    diff -Naur node_modules/@angular/router/src/segments.js ../@angular-RC/router/src/segments.js
    --- node_modules/@angular/router/src/segments.js    2016-05-03 23:24:33.000000000 +0200
    +++ ../@angular-RC/router/src/segments.js   2016-05-16 17:02:20.520496172 +0200
    @@ -171,6 +171,7 @@
             return false;
         if (a.outlet != b.outlet)
             return false;
    +    if(!a.parameters || !b.parameters) return false;
         return collection_1.StringMapWrapper.equals(a.parameters, b.parameters);
     }
     exports.equalSegments = equalSegments;

So we do not have errors in different situations (for instance after loading the starting page)
Visiblity segments.js is very different in master at the moment, so no way to PR.

## DynamicComponentLoader

Could you provide a working example with loadAsRoot? (we succeed in using loadNextToLocation but no way to use loadAsRoot)

## How to use a Github checkout of Angular 2 in our project

See http://stackoverflow.com/questions/37270280/how-to-use-an-angular-2-github-checkout-in-my-project
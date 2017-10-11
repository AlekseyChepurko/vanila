# Documentation

## Build

Project builds using [Webpack](https://webpack.js.org/)

Has 3 configuration files
* Common config [config/common.config.js](./config/common.config.js)
* Production build config [config/production.config.js](./config/production.config.js)
* Development build config [config/dev.config.js](./config/dev.config.js)

### JS

Project is written with VanilaJS and [RxJS](https://github.com/Reactive-Extensions/RxJS)

File [source/env.js](./source/env.js) description:
* serviceURLs contains all endpoints for data fetching. Services may have parametric URLs like http://service.com/endpoint/%parameter%/
*       getData(serviceName: string, parameters: object): promise
    in case of parametric service url parameters object passes


Main js file is [source/js/app.js](./source/js/app.js)

#### JS Services
* dataService

        getter data(): Observable created based on getData('JSON')
    
* itemsService 
    
        getter data(): interface {
        
            items: Observable,
            
            activeItems: Observable,
        
            }
    
        getNextActiveItems (count = 4 : number) : void
        
        addItems (items <object>): void
    
        removeActiveItem (id: string) : void
    
#### Renderer

[source/js/lib/renderElements.js](./source/js/lib/rednerElements.js)

    renderElements(elements <object>, dist: HTMLElement): void

### Styles

All styles arte processed via PostCSS loader with the only plugin - autoprefixer 

[Config file](./source/postcss.config.js)
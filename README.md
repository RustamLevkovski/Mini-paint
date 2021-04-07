# MiniPaint

#Demo 
<p><a href="https://rustamlevkovski.github.io/Innowise-lab-internship-Level-2-Mini-paint/">MiniPaint Demo</a> </p>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Folders Structure 

+ src 
+ app 
  +  enums
     +  shape-type.enum.ts 
  +  interfaces
     + coordinate.interface.ts
     + dimension.interface.ts
     + fbCreateResponse.interface.ts
     + savedImg.interface.ts
     + user.interface.ts
  +  modules
     + gallery
     + login
     + registration
     + services
         +  authentification.guard.ts
         +  authentification.service.ts
         +  gallery.service.ts
         +  white-board.services.ts
     + white-board
         + brush-size
         + color-picker
         + draw-area
         + panel
         + templates
     + white-board component

## Database structure: 
  + Authentication snapshot:
  + User  
      + Email: 'string'
      + Password: 'string'
      + User UID: 'string'
   
  + Realtime database snapshot: 
  + Post Id: 'string'
      + authorId: 'string'
      + base64: 'string', 
      + id: 'string'
      

## Application Stack
1. Angular
2. TypeScript
3. Firebase
4. RxJS
5. Prettier




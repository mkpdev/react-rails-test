## Technologies
* React/Redux for frontend
* Rails for backend

### Backend :
* Create api only rails app to reduce overload of gems and files, also it adds required api support. 
* Use devise auth token to manage authentication between frontend and backend.
* Create CRUD apis to manange CRUD operation on user.
* Handle CRUD should be perform by admin only.

### Frontend :
#### Create react app which has following structure:
```bash
├── src
│   ├── index.js
│   ├── App.js
│   ├── PrivateRoutes.js
│   ├── store.js
│   ├── types.js
│   ├── containers
│   │   ├── *.js
│   ├── components
│   │   ├── *.js
│   ├── actions
│   │   ├── *.js
│   ├── sagas
│   │   ├── *.js
│   ├── apis
│   │   ├── *.js
│   ├── reducers
│   │   ├── *.js
├── package.json
├── public
```

* Containers used to handle business logic.
* Components used to manage presentational logic.
* As Redux is used so actions and reducers are part of it.
* I used redux-saga as middleware to manage api calls.
* For authentication I used localStorage.
* I created PrivateRoutes so that private routes can be accessed by only authenticate user.

## Why React and Rails
As mentioned in task I can use React / Redux + any server language or Ruby + Erb / Slim or mix of both. So here I choose mix of both. I am expertized in React and Rails both so it was nice opportunity for me to showcase my fullstatck development skills. Therefore I choose React + Rails.

It will be helpful for me to targeting both frontend and backend jobs.   


## How to setup and run Application
* git clone https://github.com/mkpdev/react-rails-test.git

#### To run frontend application :
* cd `react-front`
* run `yarn install`
* run `yarn start`

#### To run backend application :
* cd `rails-api`
* run `bundle install`
* run `rake db:create && rake db:migrate`
* run `rails s`
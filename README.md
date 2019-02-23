# Studwork test task

Галактической республике необходима твоя помощь. Нужно создать интерфейс для взаимодействия с галактической базой.

Всего необходимо реализовать 2 страницы: список космических кораблей и страницу корабля.

Страница со списком кораблей:

* На странице будет список всех кораблей
* Добавить текстовое поле для поиска по названию корабля. Учесть возможность передачи результатов поиска по ссылке.
* Реализовать пагинацию в формате next - prev
* При клике по элементу списка, пользователь переходит на страницу с информацией по конкретному кораблю.

Страница корабля:

* Необходимо вывести всю информацию о корабле


API https://swapi.co/documentation

Endpoints

* `/starships/` -- get all the starship resources
* `/starships/:id/` -- get a specific starship resource
* `/starships/schema/` -- view the JSON schema for this resource

Итоговая работа должна быть в формате ссылки на репозиторий.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
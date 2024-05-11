-- CREATE REQUEST --

```curl
curl --request POST \
  --url https://svg-assignment-game-crud.onrender.com/api/v1/games \
  --data '{
  "name": "Name",
  "url": "test@test.com",
  "author": "Punit Sureka",
  "published_date": "2024-05-12"
}
'
```

-- UPDATE REQUEST --

```curl
curl --request PUT \
  --url https://svg-assignment-game-crud.onrender.com/api/v1/games/5 \
  --data '{
  "name": "New Name",
  "url": "test@test.com",
  "author": "Punit Sureka",
  "published_date": "2024-05-12"
}
'
```

-- DELETE REQUEST --

```curl
curl --request DELETE \
  --url https://svg-assignment-game-crud.onrender.com/api/v1/games/1
```

-- GET ONE REQUEST --

```curl
curl --request GET \
  --url https://svg-assignment-game-crud.onrender.com/api/v1/games/1
```

-- GET ALL REQUEST --

```curl
curl --request GET \
  --url https://svg-assignment-game-crud.onrender.com/api/v1/games/
```
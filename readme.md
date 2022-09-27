# SalesManago API Microservice

## Launch App
	npm i
	tsc
	npm run serve

#### Cart usage
POST https://example.com/v1/cart
- Header: authorization jwt_hash

- email: "example.com",
- locale: "en",
- type: "CART",
- action: "CART ADD_TO_CART",
- products: "1111,2222"


#### Newsletter usage
POST https://example.com/v1/newsletter

- email: "example.com",
- locale: "en",
- tags: ["TAG1", "TAG2"]
- first_name: "John",
- last_name: "Doe",
- country: "US",
- ip: "127.0.0.1"
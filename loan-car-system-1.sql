{
	"info": {
		"_postman_id": "d22d2e30-1f28-4257-ab9d-5ea7e07e5e1e",
		"name": "Loan Car System Simulation",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "users",
			"item": [
				{
					"name": "Login User",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "username",
									"value": "Rijal",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "http://localhost:3000/users/login",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"users",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "Logout User",
					"request": {
						"method": "PATCH",
						"header": [
							{
								"key": "user_id",
								"value": "2",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:3000/users/logout",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"users",
								"logout"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create A Balance Deposit",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "user_id",
								"value": "2",
								"type": "text"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "balance",
									"value": "100000000",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "http://localhost:3000/users/deposite",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"users",
								"deposite"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "instalments",
			"item": [
				{
					"name": "Create Installment ",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "user_id",
								"value": "2",
								"type": "text"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "name",
									"value": "installment-12",
									"type": "text"
								},
								{
									"key": "leasing_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "car_id",
									"value": "1",
									"type": "text"
								},
								{
									"key": "offer_terms",
									"value": "3",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "http://localhost:3000/installments",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"installments"
							]
						}
					},
					"response": []
				},
				{
					"name": "Get All Installments By User",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "user_id",
								"value": "2",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:3000/installments",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"installments"
							]
						}
					},
					"response": []
				},
				{
					"name": "Get My installments for user that authenthicated and authorization with headers that fill user_id",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "user_id",
								"value": "6",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:3000/installments/6",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"installments",
								"6"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Payments",
			"item": [
				{
					"name": "created payments with authenthication user_id fill in the headers also invoice authorization",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "user_id",
								"value": "2",
								"type": "text"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "transfer",
									"value": "30000000",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "http://localhost:3000/payments/27",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"payments",
								"27"
							]
						}
					},
					"response": []
				},
				{
					"name": "get invoices by user that authenthicated by user_id that must be fill",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "user_id",
								"value": "2",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:3000/invoices",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"invoices"
							]
						}
					},
					"response": []
				},
				{
					"name": "get invoice by user that authenthicated by user_id that must fill in the headers",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "user_id",
								"value": "4",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:3000/invoices/27",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"invoices",
								"27"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
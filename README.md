# Promo Playstore API

This API is providing you with the latest promo in Google PlayStore for Indonesian🇮🇩 region.


## How?
Before accessing the API, you need to register and retrieve your API key. Please register [here](https://forms.gle/1xRVsgnSEkUTyJfU6).


## API Endpoints

### Get Deals
- **Endpoint:** `/api/v1/deals`
- **Method:** `GET`
- **Header:** `X-API-Key: your_api_key_here`
- **Description:** Retrieves a list of available deals.
### Parameters

| Parameter | Description | Type | Default | Required |
| --- | --- | --- | --- | --- |
| `type` | Filter deals by type (*APP* or *GAME*) | string | - | Optional |
| `pageSize` | Number of deals to return per page | integer | 10 | Optional |
| `page` | Page number for pagination | integer | 1 | Optional |
| `order` | Order of the deals (*asc* or *desc*) | string | asc | Optional |
| `orderBy` | Field to order the deals by (*createdAt*, *priceFrom*, or *priceTo*) | string | createdAt | Optional |
| `isFree` | Filter deals by free or paid | boolean | true | Optional |

- **Sample Request:**
```bash
curl -X GET \
  http://https://promo-playstore-api.vercel.app/api/v1/deals \
  -H 'X-API-Key: your_api_key_here'
```
- **Sample Response:**
```json
{
    "message": "Successfully fetched deals",
    "data": [
        {
            "id": 1,
            "title": "Hero of the Kingdom: Tales 2",
            "imageUrl": "https://b.thumbs.redditmedia.com/gjjSWVKrcpR-gehV8Gz8sW3XTqXJw18pdFiVMlofy5c.jpg",
            "url": "https://play.google.com/store/apps/details?id=com.LonelyTroops.HerooftheKingdomTales2",
            "type": "GAME",
            "priceFrom": "109000",
            "priceTo": "0"
        },
        {
            "id": 3,
            "title": "ColorMeter camera color picker",
            "imageUrl": "https://b.thumbs.redditmedia.com/K9uSEF096MgZunp1M_tJ2S0m3JSwmF6CJ5DjAiQnarE.jpg",
            "url": "https://play.google.com/store/apps/details?id=com.vistechprojects.colormeter",
            "type": "APP",
            "priceFrom": "32000",
            "priceTo": "0"
        },
        {
            "id": 4,
            "title": "Minesweeper Pro",
            "imageUrl": "https://b.thumbs.redditmedia.com/Qvd5vU-k9TPWK5EiTBFj3BHsGO8gLMaWoMhX-Plws5Y.jpg",
            "url": "https://play.google.com/store/apps/details?id=mindware.minegamespro",
            "type": "GAME",
            "priceFrom": "23000",
            "priceTo": "0"
        }
    ],
    "totalPages": 1,
    "totalDeals": 3
}
```

### Get Deal by ID
- **Endpoint:** `/api/v1/deals/{id}`
- **Method:** `GET`
- **Header:** `X-API-Key: your_api_key_here`
- **Description:** Retrieves details of a specific deal by its ID.
- **Sample Request:**

```bash
curl -X GET \
  http://https://promo-playstore-api.vercel.app/api/v1/deals/1 \
  -H 'X-API-Key: your_api_key_here'
```
- **Sample Response:**
```json
{
    "message": "Successfully fetched deal",
    "data": {
        "id": 1,
        "title": "Hero of the Kingdom: Tales 2",
        "description": "You are having a small adventure outside the city walls. You are the princess, in the guise of a rogue. However, returning home is no longer possible. The city is on fire and the streets have been plundered by hordes of unknown monsters. People are leaving their homes in panic and seek refuge from certain doom. But this is your city and your people. You can’t lie idle. You have to protect your city and get allies to fight by your side against great evil. Gain courage and become a heroic princess.",
        "imageUrl": "https://b.thumbs.redditmedia.com/gjjSWVKrcpR-gehV8Gz8sW3XTqXJw18pdFiVMlofy5c.jpg",
        "url": "https://play.google.com/store/apps/details?id=com.LonelyTroops.HerooftheKingdomTales2",
        "priceFrom": "109000",
        "priceTo": "0",
        "type": "GAME",
        "createdAt": "2024-08-13T14:48:00.586Z",
        "updatedAt": "2024-08-13T14:48:00.586Z"
    }
}
```